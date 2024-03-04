/*
    @brief Purpose of this file is to make api calls to Riot Games via ShieldBow wrapper 
*/

import { getClient } from './ClientManager'

async function getPUUID(summonerName, region) {
    const client = await getClient(region);
    const summoner = await client.summoners.fetchBySummonerName(summonerName);
    return summoner.playerId;
}

async function getRecentGames(summonerName, lastGameTimestamp) {
    let matchList
    if (lastGameTimestamp === -1) {
        matchList = getNewUserMatchlist(summonerName);
    } else {
        matchMedia = getExistingUserMatchlist(summonerName);
    }

    // Pass matchlist onto DataProcessing.js to get the maps
}

/**
 * Captures all recent games. Starts at the last game in the database until most recent.
 * @param {string} summonerName The user's summoner name
 * @param {number} lastGameTimestamp The timestamp of the most recent game present in the database for this user in seconds.
 * @returns The freshest match list
 */
async function getExistingUserMatchlist(summonerName, lastGameTimestamp) {
    // const client = await getClient(region);
    const summoner = await client.summoners.fetchBySummonerName(summonerName);

    let matchList = await summoner.fetchMatchList({ count: 20, startTime: lastGameTimestamp });
    let lastMatchInList = await client.matches.fetch(matchList[matchList.length - 1]);
    let currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);

    // Loop until matchList has appended all games starting from the most recent until we hit the
    // last match fetched in our DB.
    // If the user has played less games than 'count' in fetch options, then this loop will not be entered
    while (currLastGameTimestamp != lastGameTimestamp) {
        const appendingMatchList = await summoner.fetchMatchList({ startTime: lastGameTimestamp, endTime: currLastGameTimestamp });
        matchList.push(...appendingMatchList);
        lastMatchInList = await client.matches.fetch(matchList[matchList.length - 1]);
        currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);
    }

    return matchList.slice(0, -1) // Returns every element except the last one because it will be the same game as lastGameTimestamp
}

// If it's a new user, fetch 100 games at a time until we cant fetch no more
async function getNewUserMatchlist(summonerName) {
    // const client = await getClient(region);
    const summoner = await client.summoners.fetchBySummonerName(summonerName);
    let matchList = await summoner.fetchMatchList({ count: 100 });
    let length = matchList.length;
    let lastMatchInList = await client.matches.fetch(matchList[length - 1]);
    let currLastGameTimestamp = Math.trunc(lastMatchInList.endTimestamp / 1000);

    while (matchList.length < 800) {
        const appendingMatchList = await summoner.fetchMatchList({ endTime: currLastGameTimestamp, count: 100 });
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

async function getLastGameTimestamp(matchList) {
    const match = await client.matches.fetch(matchList[0]);
    return match.endTimestamp;
}

async function getData() {

}



