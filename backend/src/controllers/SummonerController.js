/**
 * @brief Purpose of this file is to bring together all the services/hooks we've created so far
 * that grab and process our data. This includes RiotGamesServices, DatabaseServices, and DataProcessing.
 * All these services combined will generate the appropriate map to return to the client.
 */
import { getPUUID, getRecentGames, getLastGameTimestamp } from '../services/RiotGamesService.js'
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID } from '../services/DatabaseService.js'
import { mergeMatchlistAndDB, createMaps, calculateNemesis, sortMaps } from '../utils/DataProcessing.js';

async function queryForMaps(summonerName, tag) {
    try {
        // Grab base info from user
        const puuid = await getPUUID(summonerName, tag);
        let db = await getSummonerByPUUID(puuid);

        // Variables to be saved to DB
        let lastGameTimestamp = db ? db.lastGameTimestamp : -1;
        let numberOfGames = 0;
        let returnObject;

        // Check to see if the user was in the database
        if (db) {
            console.log("Player present in database");
            console.log("Updated LGTS from DB: ", lastGameTimestamp);
            numberOfGames = db.totalGames;
        }

        // Fetch new data from Riot and determine which object to send to client
        const matchlist = await getRecentGames(puuid, lastGameTimestamp);
        if (matchlist) {
            // Update the total number of games held in the DB for a player
            numberOfGames += matchlist.length;

            // Update LGTS for the database for future use
            lastGameTimestamp = await getLastGameTimestamp(matchlist);
            console.log("Updated LGTS from ML: ", lastGameTimestamp);

            // Take fetched matchlist and turn into maps
            const mlMaps = await createMaps(matchlist, summonerName);

            // returnObject can either be just the fetch matchlist or the fetched matchlist
            // concatenated with what is in the database
            returnObject = db ? mergeEachMap(mlMaps, extractStatsFromDB(db)) : mlMaps;

            // Save to database or update existing user data
            await (db ? updateSummonerByPUUID : saveNewSummoner)(summonerName, puuid, lastGameTimestamp, returnObject, numberOfGames);
        } else {
            // In the case where the user is a new account with no games played yet
            if (!db) {
                throw new Error("No matchlist found and summoner not in database");
            }
            // Otherwise, the database maps exist so return that
            returnObject = extractStatsFromDB(db);
        }

        // Calculate and log the League Nemesis
        // calculateNemesis(returnObject.overall);

        // Sort the maps before returning
        Object.keys(returnObject).forEach(lane => {
            returnObject[lane] = sortMaps(returnObject[lane]);
        });

        // Log maps and total # of games
        // console.log(returnObject);
        // console.log("Total number of games: ", numberOfGames);

        return returnObject;
    } catch (error) {
        console.error('Error in queryForMaps:', error);
        return null;
    }
}

function extractStatsFromDB(db) {
    return {
        overall: db.overallStats,
        top: db.topStats,
        jng: db.jungleStats,
        mid: db.midStats,
        bot: db.botStats,
        sup: db.supportStats
    };
}

/**
 * This function takes in ml and db which are an object that only 6 other maps: overall, top, jng, mid, ad, sup.
 * It attempts to merge each individual map before wrapping it up into an object again and returning.
 * 
 * @param {Object} ml Holds 6 maps with data from matchlist only
 * @param {Object} db Holds 6 maps with data from db only
 * @returns An object that contains the merged maps
 */
function mergeEachMap(ml, db) {
    let mergedMap = {}; // Object to hold all merged maps

    Object.keys(ml).forEach(role => {
        const mlRole = ml[role];
        const dbRole = db[role];
        const merged = mergeMatchlistAndDB(mlRole, dbRole);
        mergedMap[role] = merged; // Add the merged map to the corresponding role in the new object
    });

    return mergedMap; // Return the object containing all merged maps
}

/**
 * The user enters a summoner name and tag in the format 'Summoner Name#Tag'.
 * This function decouples those two things using '#' as the delimiter and
 * returns them separated
 * 
 * @param {String} input Summoner Name#Tag
 * @returns Decoupled summoner name & tag
 */
function parseSummonerInput(input) {
    const [summonerName, tag] = input.split('#');
    return {
        summonerName,
        tag
    };
}

export { queryForMaps, parseSummonerInput }