/**
 * @brief This file holds all methods that make API calls to Riot Games via Shieldbow.
 */

import { getClient } from './ClientManager.js'
import { createMaps } from '../utils/DataProcessing.js'

/* CONSTANTS */
const COUNT = 20; // How many game we fetch per call
const NEW_USER_ML_SIZE = 20; // How many games we hope to fetch for a new user's match list array
const client = await getClient(); // TODO: Change this into a function call so that we can select different regions

/**
 * 
 * @param {string} summonerName A user's summoner name
 * @param {string} region The user's region. Defaults to NA
 * @returns A user's PUUID
 */
async function getPUUID(summonerName) {
    const summoner = await client.summoners.fetchBySummonerName(summonerName);
    return summoner.playerId;
}

/**
 * This function differentiates users by 'New' and 'Existing'. 
 * If they are 'New' then there is no lastGameTimestamp and we try to fetch as many games as possible.
 * If they are 'Existing' then we grab all the games between their most recent one and the most recent
 * one in our database.
 * 
 * @param {string} summonerName A user's summoner name
 * @param {number} lastGameTimestamp The endTimestamp of the last game we fetched for existing users
 */
async function getRecentGames(summonerName, lastGameTimestamp) {
    console.log("Inside getRecentGames");
    let matchList;

    if (lastGameTimestamp === -1) {
        matchList = await getNewUserMatchlist(summonerName);
        // return await getNewUserMatchlist(summonerName);
    } else {
        matchList = await getExistingUserMatchlist(summonerName, lastGameTimestamp);
        // return await getExistingUserMatchlist(summonerName, lastGameTimestamp);
    }

    return matchList;
}

async function createMapsWithML(summonerName, matchList) {
    const allMatchups = await createMaps(matchList, summonerName);
    return allMatchups;
}

/**
 * Captures all recent games. Starts at the most recent game found in the database until most recent game the user has played.
 * 
 * @param {string} summonerName The user's summoner name
 * @param {number} lastGameTimestamp The timestamp of the most recent game present in the database for this user in seconds.
 * @returns The most recent matches from the lastGameTimestamp onwards
 */
async function getExistingUserMatchlist(summonerName, lastGameTimestamp) {
    try {
        console.log("Inside getExistingUserML");
        const summoner = await client.summoners.fetchBySummonerName(summonerName);
        let matchList = await summoner.fetchMatchList({ count: COUNT, startTime: lastGameTimestamp });
        console.log(matchList);

        // Existing user but they have not played any new games since the last time we fetched data
        if (matchList.length < 2) {
            console.log("No new games from existing user");
            return null;
        }

        let lastMatchInList = await client.matches.fetch(matchList[matchList.length - 1]);
        console.log("1")
        let currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);
        console.log("2")

        // Loop until matchList has appended all games starting from the most recent game the user has played
        // until lastGameTimestamp is hit
        // If the user has played less games than 'count' in fetch options, then this loop will not be entered
        while (currLastGameTimestamp > lastGameTimestamp) {
            console.log("INside loop");
            try {
                const appendingMatchList = await summoner.fetchMatchList({ startTime: lastGameTimestamp, endTime: currLastGameTimestamp });
                matchList.push(...appendingMatchList);
                lastMatchInList = await client.matches.fetch(matchList[matchList.length - 1]);
                currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);
            } catch (innerError) {
                if (innerError.response && innerError.response.status === 404) {
                    console.error("Fetched an invalid match. Exiting with remaining match list.", innerError)
                    break;
                } else {
                    throw innerError; // Rethrows error we encountered an erorr that wasnt 404
                }
            }
        }

        return matchList.slice(0, -1) // Returns every element except the last one because it will be the same game as lastGameTimestamp
    } catch (error) {
        console.error("Error in getExistingUserMatchlist:", error)
    }

}

/**
 * Fetches up to a max of NEW_USER_ML_SIZE matches for a new user due to the fact that we loop until
 * matchList.length < NEW_USER_ML_SIZE. Each iteration of the loop appends more matches to matchList,
 * however we omit the first element of the appendingArray because it would be a duplicate
 * of the last element in matchList. 
 * 
 * @param {string} summonerName The user's summoner name
 * @returns matchList 
 */
async function getNewUserMatchlist(summonerName) {
    try {
        console.log("In getNewUserMatchlist");
        const summoner = await client.summoners.fetchBySummonerName(summonerName);

        // TODO: Make a matchHistoryOption object
        let matchList = await summoner.fetchMatchList({ count: COUNT, type: 'normal' });
        let length = matchList.length;
        let lastMatchInList = await client.matches.fetch(matchList[length - 1]);
        let currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);

        // This loop iterates until we've fetched NEW_USER_ML_SIZE number of games for a new user
        while (matchList.length < NEW_USER_ML_SIZE) {
            try {
                const appendingMatchList = await summoner.fetchMatchList({ endTime: currLastGameTimestamp, count: COUNT });
                matchList.push(...appendingMatchList.slice(1)); // Append everything except first element because it would be a duplicate

                if (matchList.length === length) { // If there was no change after appending then we've fetched as many games as we could
                    break;
                }

                length = matchList.length;
                lastMatchInList = await client.matches.fetch(matchList[length - 1]);
                currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);
            }
            catch (innerError) {
                if (innerError.response && innerError.response.status === 404) {
                    console.error("Fetched an invalid match. Exiting with remaining match list.", innerError)
                    break;
                } else {
                    throw innerError; // Rethrows error we encountered an erorr that wasnt 404
                }
            }
        }

        console.log("Returning with matchlist successfully!");
        console.log("Matchlist size:", matchList.length)
        return matchList;
    } catch (error) {
        console.error("Error in getNewUserMatchlist:", error)
    }
}

/**
 * This function serves to grab the most recent game's endTimestamp which will be saved
 * in the database as lastGameTimestamp. lastGameTimestamp will be used in the future
 * when fetching games for an existing user. It's a delimeter for when to stop fetching
 * for recent games
 * 
 * @param {Array} matchList A user's matchlist
 * @returns The endTimestamp of the most recent game a user played
 */
async function getLastGameTimestamp(matchList) {
    const match = await client.matches.fetch(matchList[0]);
    return Math.trunc(match.endTimestamp / 1000);
}

export { getPUUID, getRecentGames, getLastGameTimestamp, createMapsWithML }


