/**
 * @brief This is a catch-all class that provides methods for data processing. Majority of data
 * proccessing comes in the form of creating or updating maps. There are also methods for calculating
 * the League Nemesis.
 */

import { getClient } from '../services/ClientManager.js'
const client = await getClient(); // TODO: Change this into a function call so that we can select different regions

/**
 * Takes in a user's recent games and creates 6 maps. One overall map that maps champion names
 * to [losses, encounters, loss ratio] tuple. Then 5 maps that separate the info by lane.
 * 
 * @param {Array} matchList A user's matchlist
 * @param {String} summonerName A user's summoner name
 */
async function createMaps(matchList, summonerName) {
    console.log("Inside createMaps");
    // TODO: Consider creating a map for ranked vs normal games vs ARAM games
    let losingMatchups = new Map();
    let losingMatchupsTOP = new Map();
    let losingMatchupsJNG = new Map();
    let losingMatchupsMID = new Map();
    let losingMatchupsBOT = new Map();
    let losingMatchupsSUP = new Map();

    await getLosingMatchups(summonerName, matchList, losingMatchups, losingMatchupsTOP,
        losingMatchupsJNG, losingMatchupsMID, losingMatchupsBOT, losingMatchupsSUP);

    console.log(losingMatchups);
    console.log(Object.fromEntries(losingMatchupsTOP));
    console.log(Object.fromEntries(losingMatchupsJNG));
    console.log(Object.fromEntries(losingMatchupsMID));
    console.log(Object.fromEntries(losingMatchupsBOT));
    console.log(Object.fromEntries(losingMatchupsSUP));

    calculateNemesis(losingMatchups);

    let allMatchups = {
        overall: losingMatchups,
        top: losingMatchupsTOP,
        jng: losingMatchupsJNG,
        mid: losingMatchupsMID,
        bot: losingMatchupsBOT,
        sup: losingMatchupsSUP
    }

    return allMatchups;
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

/**
 * Fetches match details for every match in the match list. For each match:
 * 1. If undefined, return
 * 2. If remake, dont consider and return
 * 3. Find which side the user/opponents are on, then which side won
 * 4. For each champion on the opponent's side:
 *      a. Update the overall map
 *      b. Update the lane specific map
 * 
 * @param {String} summonerName A user's summoner name
 * @param {Array} matchList A user's match list
 * @param {Map} losingMatchups Maps champion name to [losses, encounters, lossRatio]
 * @param {Map} TOP Maps champion name to [losses, encounters, lossRatio], specifically only for top lane encounters
 * @param {Map} JNG Maps champion name to [losses, encounters, lossRatio], specifically only for jng lane encounters
 * @param {Map} MID Maps champion name to [losses, encounters, lossRatio], specifically only for mid lane encounters
 * @param {Map} BOT Maps champion name to [losses, encounters, lossRatio], specifically only for AD carry lane encounters
 * @param {Map} SUP Maps champion name to [losses, encounters, lossRatio], specifically only for sup lane encounters
 */
async function getLosingMatchups(summonerName, matchList, losingMatchups, TOP, JNG, MID, BOT, SUP) {
    console.log("Inside getLosingMatchups");
    try {
        // TODO: Skip if Arenas match OR alternatively, skip if not a ranked, norms, aram game
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
            // The opposingTeam is naturally the other side
            let opposingTeam = userTeam === 'blue' ? 'red' : 'blue';
            // Check which team won
            let userTeamWon = match.teams.get(userTeam).win;

            // Grab data from all enemy players
            match.teams.get(opposingTeam).participants.forEach(participant => {
                const champName = participant.champion.champ.name;

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

// TODO: Add more complexity to this function
function calculateNemesis(losingMatchups) {
    let nemesis = null;
    let highestLossRatio = 0;
    let highestLosses = 0;

    losingMatchups.forEach((value, key) => {
        const { losses, encounters, lossRatio } = value;

        // Check if the current champion's loss ratio is higher than the highest recorded,
        // or if the loss ratio is the same but the total losses are higher
        if (lossRatio > highestLossRatio || (lossRatio === highestLossRatio && losses > highestLosses)) {
            highestLossRatio = lossRatio;
            highestLosses = losses;
            nemesis = key;
        }
    });

    console.log(`Nemesis: ${nemesis}, Loss Ratio: ${highestLossRatio}, Total Losses: ${highestLosses}`);
}

export { createMaps, mergeMatchlistAndDB, calculateNemesis }