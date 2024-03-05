/*
    @brief Purpose of this file is to make api calls to Riot Games via ShieldBow wrapper 
*/

import { getClient } from './ClientManager'

/* CONSTANTS */
const COUNT = 100; // How many game we fetch per call
const NEW_USER_ML_SIZE = 800; // How many games we hope to fetch for a new user's match list array


/* FUNCTIONS */
async function getPUUID(summonerName, region) {
    const client = await getClient(region);
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
    let matchList
    if (lastGameTimestamp === -1) {
        matchList = getNewUserMatchlist(summonerName);
    } else {
        matchList = getExistingUserMatchlist(summonerName);
    }

    // TODO: Pass matchlist onto DataProcessing.js to get the maps
}

/**
 * Captures all recent games. Starts at the most recent game found in the database until most recent game the user has played.
 * 
 * @param {string} summonerName The user's summoner name
 * @param {number} lastGameTimestamp The timestamp of the most recent game present in the database for this user in seconds.
 * @returns The most recent matches from the lastGameTimestamp onwards
 */
async function getExistingUserMatchlist(summonerName, lastGameTimestamp) {
    // const client = await getClient(region);
    const summoner = await client.summoners.fetchBySummonerName(summonerName);

    let matchList = await summoner.fetchMatchList({ count: COUNT, startTime: lastGameTimestamp });
    let lastMatchInList = await client.matches.fetch(matchList[matchList.length - 1]);
    let currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);

    // Loop until matchList has appended all games starting from the most recent game the user has played
    // until lastGameTimestamp is hit
    // If the user has played less games than 'count' in fetch options, then this loop will not be entered
    while (currLastGameTimestamp != lastGameTimestamp) {
        const appendingMatchList = await summoner.fetchMatchList({ startTime: lastGameTimestamp, endTime: currLastGameTimestamp });
        matchList.push(...appendingMatchList);
        lastMatchInList = await client.matches.fetch(matchList[matchList.length - 1]);
        currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);
    }

    return matchList.slice(0, -1) // Returns every element except the last one because it will be the same game as lastGameTimestamp
}

/**
 * Fetches up to a max of 892 matches for a new user due to the fact that we loop until
 * matchList.length < 800. Each iteration of the loop appends more matches to matchList,
 * however we omit the first element of the appendingArray because it would be a duplicate
 * of the last element in matchList. That leaves us with the peculiar number of 892.
 * 
 * @param {string} summonerName The user's summoner name
 * @returns matchList with 0 to 892 matches
 */
async function getNewUserMatchlist(summonerName) {
    // const client = await getClient(region);
    const summoner = await client.summoners.fetchBySummonerName(summonerName);
    let matchList = await summoner.fetchMatchList({ count: COUNT });
    let length = matchList.length;
    let lastMatchInList = await client.matches.fetch(matchList[length - 1]);
    let currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);

    // NEW_USER_ML_SIZE is 800* (may change) so the loop can run a max of 8 times to produce a
    // matchList of size 892. If the user has a new account then this loop will break on first cycle
    while (matchList.length < NEW_USER_ML_SIZE) {
        const appendingMatchList = await summoner.fetchMatchList({ endTime: currLastGameTimestamp, count: COUNT });
        matchList.push(...appendingMatchList.slice(1)); // Append everything except first element because it would be a duplicate

        if (matchList.length === length) { // If there was no change after appending then we've fetched as many games as we could
            break;
        }

        length = matchList.length;
        lastMatchInList = await client.matches.fetch(matchList[length - 1]);
        currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);
    }

    return matchList;
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
    return match.endTimestamp;
}




