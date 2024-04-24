/**
 * @brief Purpose of this file is to bring together all the services/hooks we've created so far
 * that grab and process our data. This includes RiotGamesServices, DatabaseServices, and DataProcessing.
 * All these services combined will generate the appropriate map to return to the client.
 */
import { getPUUID, getRecentGames, getLastGameTimestamp } from '../services/RiotGamesService.js'
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID } from '../services/DatabaseService.js'
import { mergeMatchlistAndDB, createMaps } from '../utils/DataProcessing.js';

async function queryForMaps(summonerName) {
    try {
        const puuid = await getPUUID(summonerName);
        let db = await getSummonerByPUUID(puuid);
        let lastGameTimestamp = db ? db.lastGameTimestamp : -1;
        let returnObject;

        if (db) {
            console.log("Player present in database");
            console.log("Updated LGTS from DB: ", lastGameTimestamp);
        }

        const matchlist = await getRecentGames(summonerName, lastGameTimestamp);
        if (matchlist) {
            lastGameTimestamp = await getLastGameTimestamp(matchlist);
            console.log("Updated LGTS from ML: ", lastGameTimestamp);

            const mlMaps = await createMaps(matchlist, summonerName);
            returnObject = db ? mergeEachMap(mlMaps, extractStatsFromDB(db)) : mlMaps;

            await (db ? updateSummonerByPUUID : saveNewSummoner)(summonerName, puuid, lastGameTimestamp, returnObject);
        } else {
            // TODO: Edge case if they are a new account with 1 game then we dont return anything
            if (!db) throw new Error("No matchlist found and summoner not in database");
            returnObject = extractStatsFromDB(db);
        }

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

export { queryForMaps }