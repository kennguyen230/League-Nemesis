/**
 * @brief Purpose of this file is to bring together all the services/hooks we've created so far
 * that grab and process our data. This includes RiotGamesServices, DatabaseServices, and DataProcessing.
 * All these services combined will generate the appropriate object to return to the client.
 */
import { getPUUID, getRecentGames, getLastGameTimestamp } from '../services/RiotGamesService.js'
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID } from '../services/DatabaseService.js'
import { mergeUserEnemyData, createReturnObjects, sortUserEnemyData } from '../utils/DataProcessing.js';
import { UserEnemyData, Enemy, User, GameModeEnemyData, GameModeUserData, ChampionEnemyData, ChampionUserData } from "../utils/Interfaces.js"

async function fetchUserData(summonerName, tag) {
    try {
        // Grab PUUID from user and attempt to find user in DB
        const puuid = await getPUUID(summonerName, tag);
        const db_returnObject = await getSummonerByPUUID(puuid);

        let lastGameTimestamp: Number = -1;
        let numberOfGames = { totalGames: 0, losses: 0 };
        let returnObject;

        // If the db object exists then set LGTS to the one from the db,
        // that way no gaps exists between the matches fetched
        if (db_returnObject) {
            lastGameTimestamp = db_returnObject.lastGameTimestamp;
            console.log("LGTS from DB: ", lastGameTimestamp);
            numberOfGames = db_returnObject.numberOfGames;
        }

        // Fetch new data from Riot then determine which object to send to client
        const matchlist = await getRecentGames(puuid, lastGameTimestamp);

        // The bulk of processing for the backend happens in this if/else
        // Inside, if there is a new match list, create a UserEnemy object
        // from the match list. Then if it's an existing user, merge with
        // the database UserEnemy object. After merging, sort the data
        // then save or update the user in the database depending of if it's
        // a new user or existing user.
        // If there is no new match list to process, grab the data from the 
        // database instead.
        // In a rare instance where there is no match list games to fetch &
        // there's no database entry, throw an error for now.
        if (matchlist) {
            console.log(matchlist);

            lastGameTimestamp = await getLastGameTimestamp(matchlist);
            console.log("Updated LGTS from ML: ", lastGameTimestamp);

            numberOfGames.totalGames += matchlist.length;

            // Process match list and produce enemy and user objects and update numberOfGames.losses
            const ml_returnObject = await createReturnObjects(matchlist, summonerName, numberOfGames);

            // If there is data from the database, merge with data from ML. Otherwise, returnObject is set to ML
            returnObject = db_returnObject ? mergeObjects(extractStatsFromDB(db_returnObject), ml_returnObject) : ml_returnObject;

            // After merging occurs, sort the data before saving to the database
            // Sorting is done inside the matchlist block because it will only be necessary
            // to sort when there are new games
            sortUserEnemyData(returnObject.user, returnObject.enemy);

            // Save a new user to database or update an existing user
            await (db_returnObject ? updateSummonerByPUUID : saveNewSummoner)(summonerName, puuid, lastGameTimestamp, numberOfGames, returnObject.enemy, returnObject.user);
        }
        else {
            // In the case where the user is a new account with no games played yet
            if (!db_returnObject) {
                throw new Error("No matchlist found and summoner not in database");
            }

            // Otherwise, the database object exists so return that
            returnObject = extractStatsFromDB(db_returnObject);
            console.log("returnObject set to database data")
        }

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
function mergeObjects(db: { enemy: Enemy, user: User; }, ml: { enemy: Enemy; user: User; }) {
    console.log("Inside mergeObjects()")
    mergeUserEnemyData(db.user, ml.user, true);
    mergeUserEnemyData(db.enemy, ml.enemy, false);
    return db;
}

/**
 * Helper function to extract the enemy and user data from the 
 * database object. Need to convert from a Mongoose object to
 * a plain javascript object to avoid extra properties that make
 * it difficult to work with later.
 * 
 * @param {Object} db The DB object that stores all user data,
 * including user & enemy stats along with LGTS, summoner name,
 * puuid, etc.
 * @returns Returns only the enemy and user objects
 */
function extractStatsFromDB(db) {
    const dbObject = db.toObject();

    return {
        enemy: dbObject.enemyStats,
        user: dbObject.userStats
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