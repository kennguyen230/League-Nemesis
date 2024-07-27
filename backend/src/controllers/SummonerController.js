/**
 * @brief Purpose of this file is to bring together all the services/hooks we've created so far
 * that grab and process our data. This includes RiotGamesServices, DatabaseServices, and DataProcessing.
 * All these services combined will generate the appropriate object to return to the client.
 */
import { getPUUID, getRecentGames, getLastGameTimestamp } from '../services/RiotGamesService.js'
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID } from '../services/DatabaseService.js'
import { mergeEnemyUserData, createReturnObjects } from '../utils/DataProcessing.ts';

async function fetchUserData(summonerName, tag) {
    try {
        // Grab PUUID from user and attempt to find in DB
        const puuid = await getPUUID(summonerName, tag);
        const db_returnObject = await getSummonerByPUUID(puuid);

        // Variables to be populated in the following functions by either DB or ML
        let lastGameTimestamp = -1;
        let numberOfGames = { totalGames: 0, losses: 0 };
        let returnObject;

        // If the user exists in the DB grab the LGTS to use for fetching match list
        // data. As well, fetch the numberOfGames tally to update 
        if (db_returnObject) {
            console.log("LGTS from DB: ", lastGameTimestamp);
            lastGameTimestamp = db_returnObject.lastGameTimestamp;
            numberOfGames = db_returnObject.numberOfGames;
        }

        // Fetch new data from Riot then determine which object to send to client
        const matchlist = await getRecentGames(puuid, lastGameTimestamp);
        if (matchlist) {
            // After the match list data has been fetched, can update LGTS for next time's use
            lastGameTimestamp = await getLastGameTimestamp(matchlist);
            console.log("Updated LGTS from ML: ", lastGameTimestamp);
            numberOfGames.totalGames += matchlist.length;

            // Process match list and produce enemy and user objects as well as updating numberOfGames.losses
            const ml_returnObject = await createReturnObjects(matchlist, summonerName, numberOfGames);

            // If there is data from the database, merge with data from ML. Otherwise, returnObject is set to ML
            returnObject = db_returnObject ? mergeObjects(extractStatsFromDB(db_returnObject), ml_returnObject) : ml_returnObject;

            // Save a new user to database or update an existing user
            // await (db_returnObject ? updateSummonerByPUUID : saveNewSummoner)(summonerName, puuid, lastGameTimestamp, returnObject, numberOfGames);
        }
        else {
            // In the case where the user is a new account with no games played yet
            if (!db_returnObject) {
                throw new Error("No matchlist found and summoner not in database");
            }
            // Otherwise, the database object exists so return that
            returnObject = extractStatsFromDB(db_returnObject);
        }

        // Object.keys(returnObject).forEach(lane => {
        //     returnObject[lane] = sortMaps(returnObject[lane]);
        // });

        // Log returnObject and total # of games
        console.log(returnObject);
        console.log("Total number of games: ", numberOfGames.totalGames);
        console.log("Total number of losses: ", numberOfGames.losses);

        return [returnObject, numberOfGames];
    } catch (error) {
        console.error('Error in fetchUserData:', error);
        return null;
    }
}

/**
 * This function's purpose is to take a db & ml return object and
 * concatenate the user and enemy data within. They are merged into
 * the db object, which is the one that should be sent to the client
 * and saved to the database.
 * 
 * @param {Object} db The returnObject holding database data
 * @param {Object} ml The returnObject holding match list data
 */
function mergeObjects(db, ml) {
    mergeEnemyUserData(db.user, ml.user, true);
    mergeEnemyUserData(db.enemy, ml.enemy, false);
    return db;
}

/**
 * The purpose of this function is to extract the enemy and user object
 * to be able to merge with the ML enemy and user object
 * 
 * @param {Object} db The DB object that stores all user data 
 * (enemy/user stats, puuid, summonerName, etc)
 * @returns Returns only the enemy and user objects
 */
function extractStatsFromDB(db) {
    return {
        enemy: db.enemyStats,
        user: db.userStats
    };
}

/**
 * The user enters a summoner name and tag in the format 'Summoner Name#Tag'.
 * This function decouples those two things using '#' as the delimiter and
 * returns them separated
 * 
 * @param {String} input 'Summoner Name#Tag'
 * @returns Decoupled summoner name & tag
 */
function parseSummonerInput(input) {
    const [summonerName, tag] = input.split('#');
    return { summonerName, tag };
}

export { fetchUserData, parseSummonerInput }