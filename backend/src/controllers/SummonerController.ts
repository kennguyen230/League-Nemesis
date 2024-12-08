/**
 * @brief Purpose of this file is to bring together all the services/hooks we've created so far
 * that grab and process our data. This includes RiotGamesServices, DatabaseServices, and DataProcessing.
 * All these services combined will generate the appropriate object to return to the client.
 */
import { getRecentGames, getLastGameTimestamp, getPlayerIcon, getPlayerLevel } from '../services/RiotGamesService.js'
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, updateStateByPUUID } from '../services/DatabaseService.js'
import { mergeUserEnemyData, createReturnObjects, sortUserEnemyData } from '../utils/DataProcessing.js';
import { Enemy, User } from "../utils/Interfaces.js"

async function fetchUserData(summonerName, tag, region, client, puuid) {
    try {
        // Grab PUUID from user and attempt to find user in DB
        const db_returnObject = await getSummonerByPUUID(puuid, region);

        let lastGameTimestamp;
        let numberOfGames;
        let returnObject;

        if (db_returnObject) {
            // Will default to -1 for new users
            lastGameTimestamp = db_returnObject.lastGameTimestamp;
            console.log("(SummonerController.ts) LGTS from DB: ", lastGameTimestamp);

            numberOfGames = db_returnObject.numberOfGames;
        }

        // Fetch new data from Riot then determine which object to send to client
        const matchlist = await getRecentGames(puuid, lastGameTimestamp, client);

        // Process the data
        if (matchlist) {
            console.log("(SummonerController.ts)", matchlist);

            lastGameTimestamp = await getLastGameTimestamp(matchlist, client);
            console.log("(SummonerController.ts) Updated LGTS from ML: ", lastGameTimestamp);

            numberOfGames.totalGames += matchlist.length;

            // Process match list and produce enemy and user objects and update numberOfGames.losses
            const ml_returnObject = await createReturnObjects(matchlist, puuid, numberOfGames, client);

            // If there is data from the database, merge with data from ML. Otherwise, returnObject is set to ML
            returnObject = db_returnObject ? mergeObjects(extractStatsFromDB(db_returnObject), ml_returnObject) : ml_returnObject;

            // After merging w/ db occurs, sort the data before saving to the database
            // Sorting is done inside the matchlist block because it will only be necessary
            // to sort when there are new games
            sortUserEnemyData(returnObject.user, returnObject.enemy);

            // Update the document. Will also set the state of the document to 'ready' from 'processing'
            await updateSummonerByPUUID(summonerName, tag, region, puuid, lastGameTimestamp, numberOfGames, returnObject.enemy, returnObject.user)

            return true;
        }
        else {
            // In the case where the user is a new account with no games played yet
            if (!db_returnObject) {
                throw new Error("(SummonerController.ts) No matchlist found and summoner not in database");
            }

            // No new matches to process or sort, just update the state to 'ready' so polling stops
            await updateStateByPUUID(puuid, 'ready');
            console.log("(SummonerController.ts) returnObject set to database data")
            return true;
        }
    } catch (error) {
        console.error("(SummonerController.ts) Error in fetchUserData:", error);
        return false;
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
    console.log("(SummonerController.ts) Inside mergeObjects()")
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
    console.log("PARSING SUMMONER INPUT IN POLL:", input);
    let [summonerName, tag] = input.split('#');
    summonerName = summonerName.trim();
    return { summonerName, tag };
}

/**
 * This function returns default values to be display for a new user
 * client side
 * 
 * @param summonerName The Riot verified name of the summoner
 * @param summonerTag The Riot verified tag of the summoner
 * @returns A default object for the client
 */
async function createDefaultSummoner(summonerName, summonerTag, region, puuid, client) {
    // Create a default return object
    const defaultSummoner = {
        name: summonerName,
        tag: summonerTag,
        region: region,
        level: await getPlayerLevel(puuid, client),
        icon: await getPlayerIcon(puuid, client),
        games: {},
        userdata: {},
        state: 'processing'
    };

    // And save the new summoner to the db before continuing;
    // by default, the state of this document will be 'processing'
    saveNewSummoner(
        summonerName,
        summonerTag,
        region,
        puuid,
        -1
    );

    return defaultSummoner;
}

/**
 * This function returns the current data that exists on a user immediately
 * so that it can be quickly loaded to the client
 * 
 * @param puuid The puuid of the summoner being searched for
 * @param region The region the account is in
 * @param client Shieldbow client for fetching icon & level
 * @returns A return object based off existing user data in the database
 */
async function getExistingSummoner(puuid, region, client) {
    const db_returnObject = await getSummonerByPUUID(puuid, region);

    return {
        name: db_returnObject.summonerName,
        tag: db_returnObject.tag,
        region: db_returnObject.region,
        level: await getPlayerLevel(puuid, client),
        icon: await getPlayerIcon(puuid, client),
        games: db_returnObject.numberOfGames,
        userdata: extractStatsFromDB(db_returnObject),
        state: db_returnObject.state,
    }
}


export { fetchUserData, parseSummonerInput, createDefaultSummoner, getExistingSummoner }