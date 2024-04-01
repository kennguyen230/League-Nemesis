/**
 * @brief Purpose of this file is to bring together all the services/hooks we've created so far
 * that grab and process our data. This includes RiotGamesServices, DatabaseServices, and DataProcessing.
 * All these services combined will generate the appropriate map to return to the client.
 */
import { getPUUID, getRecentGames, getLastGameTimestamp, createMapsWithML } from '../services/RiotGamesService.js'
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID } from '../services/DatabaseService.js'
import { mergeMatchlistAndDB } from '../utils/DataProcessing.js';

/**
 * 1. Uses Riot API to get puuid
 * 2. Attempts to grab the user from DB with the puuid
 * 3. If a player was retrieved successfully from DB then it's an existing user, 
 * thus set lastGameTimeStamp appropriately
 * 4. Grab the user's matchlist using lastGameTimestamp as a parameter. (Can be -1 if new user)
 * 5. If there is data from DB then merge with matchlist
 * 6. Returns to routes page
 * 
 * @param {String} summonerName A user's summoner name
 * @returns An object that contains the merged maps
 */
// async function queryForMaps(summonerName) {
//     try {
//         const puuid = await getPUUID(summonerName);
//         let db = await getSummonerByPUUID(puuid);
//         let lastGameTimestamp = -1; // Default for new users
//         let returnObject;
//         let mlMaps;

//         if (db) {
//             console.log("Player present in database, updating LGTS");
//             lastGameTimestamp = db.lastGameTimestamp;
//             console.log("Updated LGTS from db: ", lastGameTimestamp);
//         }

//         const matchlist = await getRecentGames(summonerName, lastGameTimestamp);
//         console.log(matchlist);
//         if (matchlist) {
//             lastGameTimestamp = await getLastGameTimestamp(matchlist); // Grab the newest LGTS so we can update db
//             console.log("Updated LGTS from ML: ", lastGameTimestamp);
//             mlMaps = await createMapsWithML(summonerName, matchlist);
//         } else {
//             const dbMaps = {
//                 overall: db.overallStats,
//                 top: db.topStats,
//                 jng: db.jungleStats,
//                 mid: db.midStats,
//                 bot: db.botStats,
//                 sup: db.supportStats
//             }
//             return dbMaps;
//         }

//         if (db) {
//             const dbMaps = {
//                 overall: db.overallStats,
//                 top: db.topStats,
//                 jng: db.jungleStats,
//                 mid: db.midStats,
//                 bot: db.botStats,
//                 sup: db.supportStats
//             }

//             returnObject = mergeEachMap(mlMaps, dbMaps); // Merge the two maps

//             await updateSummonerByPUUID(summonerName, puuid, lastGameTimestamp, returnObject);
//         } else {
//             returnObject = mlMaps;
//             await saveNewSummoner(summonerName, puuid, lastGameTimestamp, returnObject);
//         }

//         return returnObject;
//     } catch (error) {
//         console.error('Error in queryForMaps:', error);
//         return null;
//     }
// }

async function queryForMaps(summonerName) {
    try {
        const puuid = await getPUUID(summonerName);
        let db = await getSummonerByPUUID(puuid);
        let lastGameTimestamp = db ? db.lastGameTimestamp : -1;
        let returnObject;

        console.log(db ? "Player present in database, updating LGTS" : "New player, default LGTS");
        if (db) console.log("Updated LGTS from db: ", lastGameTimestamp);

        const matchlist = await getRecentGames(summonerName, lastGameTimestamp);

        if (matchlist && matchlist.length) {
            lastGameTimestamp = await getLastGameTimestamp(matchlist);
            console.log("Updated LGTS from ML: ", lastGameTimestamp);

            const mlMaps = await createMapsWithML(summonerName, matchlist);
            returnObject = db ? mergeEachMap(mlMaps, extractStatsFromDB(db)) : mlMaps;

            await (db ? updateSummonerByPUUID : saveNewSummoner)(summonerName, puuid, lastGameTimestamp, returnObject);
        } else {
            if (!db) throw new Error("No matchlist found and summoner not in database");
            returnObject = extractStatsFromDB(db);
        }

        console.log(matchlist);
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