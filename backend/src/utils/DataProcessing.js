/**
 * @brief This is a catch-all class that provides methods for data processing. Majority of data
 * proccessing comes in the form of creating or updating maps. There are also methods for calculating
 * the League Nemesis.
 */

import { getClient } from '../services/ClientManager.js'
const client = await getClient(); // TODO: Change this into a function call so that we can select different regions

/**
 * Takes in a user's match list and produce an 'enemy' and 'user' object
 * which holds data on an enemy/user based on gametype + lane
 * @param {Array} matchList 
 * @param {String} summonerName 
 * @returns returnObject holds enemy and user data
 */
async function createReturnObjects(matchList, summonerName) {
    const enemy = {
        normals_overall: [],
        normals_top: [],
        normals_jng: [],
        normals_mid: [],
        normals_bot: [],
        normals_sup: [],
        ranked_overall: [],
        ranked_top: [],
        ranked_jng: [],
        ranked_mid: [],
        ranked_bot: [],
        ranked_sup: [],
        aram_overall: [],
        aram_top: [],
        aram_jng: [],
        aram_mid: [],
        aram_bot: [],
        aram_sup: []
    };

    const user = {
        normals_overall: [],
        normals_top: [],
        normals_jng: [],
        normals_mid: [],
        normals_bot: [],
        normals_sup: [],
        ranked_overall: [],
        ranked_top: [],
        ranked_jng: [],
        ranked_mid: [],
        ranked_bot: [],
        ranked_sup: [],
        aram_overall: [],
        aram_top: [],
        aram_jng: [],
        aram_mid: [],
        aram_bot: [],
        aram_sup: []
    };

    await getLosingMatchups(summonerName, matchList, enemy, user);

    return { enemy, user }
}

/**
 * Increments the encounter variable for the champion passed in. If the user lost this game as well, then
 * increment the losses variable for this champion. Recalculate the lossRatio. Update the map entry for this champ
 * 
 * @param {Map} map Either overall or lane specific map that maps champion names to [losses, encounters, lossRatio]
 * @param {String} champName The name for a champion on the opposing side
 * @param {Boolean} userTeamWon Bool indicating if the user won that game. Used to determine if function needs to increment 'losses' var
 */
const updateMatchupStatistics = (map, champName, userTeamWon) => {
    let matchup = map.get(champName) || { losses: 0, encounters: 0, lossRatio: 0 };

    // Increment encounters for every game played
    matchup.encounters += 1;

    // Only increment losses if the user's team lost
    if (!userTeamWon) {
        matchup.losses += 1;
    }

    // Update the loss ratio
    matchup.lossRatio = matchup.losses / matchup.encounters;

    // Update the map
    map.set(champName, matchup);
};

async function getLosingMatchups(summonerName, matchList, enemy, user) {
    try {
        // Async fetch all match data from the match list
        const matchDetails = await Promise.all(matchList.map(matchId =>
            client.matches.fetch(matchId).catch(error => {
                console.error(`Failed to fetch match ${matchId}:`, error);
                return null; // Return null if there's an error fetching a match
            })
        ));

        matchDetails.forEach(match => {
            if (!match) return; // Skip if match details couldn't be fetched

            let isRemake = match.teams.get('blue').participants[0].remake;
            if (isRemake) return; // Skip if it's a remake

            // Check which side the user is on
            let userTeam = match.teams.get('blue').participants.some(participant => participant.summoner.name === summonerName) ? 'blue' : 'red';

            // The opposing team is naturally the other side
            let opposingTeam = userTeam === 'blue' ? 'red' : 'blue';

            // Check to see if user won this game
            let userTeamWon = match.teams.get(userTeam).win;

            // Grab data from all enemy players
            match.teams.get(opposingTeam).participants.forEach(participant => {
                // Id is the raw value not the prettified version. Eg. Kha'Zix = Khazix, Dr. Mundo = DrMundo
                let champName = participant.champion.champ.id;

                // Update the overall losingMatchups map
                updateMatchupStatistics(losingMatchups, champName, userTeamWon);

                // TODO: Consider skipping this part if the game is NOT summoner's rift
                // Determine the participant's role and update the corresponding role-specific map
                switch (participant.position.team) {
                    case 'TOP':
                        updateMatchupStatistics(TOP, champName, userTeamWon);
                        break;
                    case 'JUNGLE':
                        updateMatchupStatistics(JNG, champName, userTeamWon);
                        break;
                    case 'MIDDLE':
                        updateMatchupStatistics(MID, champName, userTeamWon);
                        break;
                    case 'BOTTOM':
                        updateMatchupStatistics(BOT, champName, userTeamWon);
                        break;
                    case 'UTILITY':
                        updateMatchupStatistics(SUP, champName, userTeamWon);
                        break;
                }
            });
        });
    } catch (error) {
        console.error("Error in getLosingMatchups", error);
    }
}

/**
 * Merge recent games matchlist into existing database matchlist and updating lossRatio accordingly
 * 
 * @param {Map} matchList Matchlist map with user's most recent games with champion names mapped to losses, encounters, lossRatio 
 * @param {Map} databaseList Matchlist map for a user from the database with champion names mapped to losses, encounters, lossRatio
 */
function mergeMatchlistAndDB(matchList, databaseList) {
    matchList.forEach((MLmatchup, champName) => {
        let DBmatchup = databaseList.get(champName);
        if (DBmatchup) {
            DBmatchup.losses += MLmatchup.losses;
            DBmatchup.encounters += MLmatchup.encounters;
            DBmatchup.lossRatio = DBmatchup.losses / DBmatchup.encounters;
        } else {
            databaseList.set(champName, MLmatchup);
        }
    });
    return databaseList;
}

/**
 * Takes one of the losingMatchups and calculates a weighted League Nemesis
 * prioritizing lossRatio then encounters. Weights are added to prevent
 * low encounter champions from becoming the League Nemesis.
 * 
 * @param {Map} losingMatchups A map representing the losing matchups for a lane
 */
function calculateNemesis(losingMatchups) {
    let nemesis = null;
    let highestWeightedLossRatio = 0;
    let highestLosses = 0;
    let encounter = 0;
    let numberOfGames = 0;

    losingMatchups.forEach((value, key) => {
        numberOfGames += 1;
        const { losses, encounters, lossRatio } = value;
        const weightedLossRatio = lossRatio * Math.log(encounters + 1);

        // Check if the current champion's weighted loss ratio is higher than the highest recorded,
        // or if the weighted loss ratio is the same but the total losses are higher
        if (weightedLossRatio > highestWeightedLossRatio ||
            (weightedLossRatio === highestWeightedLossRatio && losses > highestLosses)) {
            highestWeightedLossRatio = weightedLossRatio;
            highestLosses = losses;
            encounter = encounters;
            nemesis = key;
        }
    });

    console.log(`Nemesis: ${nemesis}, Weighted Loss Ratio: ${highestWeightedLossRatio}, Encounters: ${encounter}, Total Losses: ${highestLosses}, Number of games queried: ${numberOfGames}`);
}

/**
 * Takes one of the losingMatchups and sorts based on lossRatio and breaks ties
 * with encounters. There is also weighting involved to prevent matchups with
 * low encounters to top the list. Eg. 1 loss, 1 encounter, 1 loss ratio
 * 
 * @param {Map} losingMatchups A map representing the losing matchups for a lane
 * @returns losingMatchups sorted
 */
function sortMaps(map) {
    const matchupsArray = Array.from(map.entries()).map(([key, value]) => ({
        champion: key,
        losses: value.losses,
        encounters: value.encounters,
        lossRatio: value.lossRatio,
    }));

    const sortedMatchupsArray = matchupsArray.sort((a, b) => {
        const weightA = a.lossRatio * Math.log(a.encounters + 1);
        const weightB = b.lossRatio * Math.log(b.encounters + 1);

        if (weightB !== weightA) {
            return weightB - weightA;
        }
        return b.losses - a.losses;
    });

    console.log("SORTED!");
    return sortedMatchupsArray;
}

function cleanData(arr) {
    arr.forEach((entry) => {
        entry.lossRatio
    })
}

export { createReturnObjects, mergeMatchlistAndDB, calculateNemesis, sortMaps }