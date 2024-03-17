/*
    @brief Purpose of this file is to perform all calculations necessary
    for creating maps that get passed to the frontend
*/
import { getClient } from './ClientManager'
const client = await getClient(); // TODO: Change this into a function call so that we can select different regions

function createMaps(matchList, summonerName) {
    let losingMatchups = new Map();
    let losingMatchupsTOP = new Map();
    let losingMatchupsJNG = new Map();
    let losingMatchupsMID = new Map();
    let losingMatchupsBOT = new Map();
    let losingMatchupsSUP = new Map();

    getLosingMatchups(summonerName, matchList, losingMatchups, losingMatchupsTOP,
        losingMatchupsJNG, losingMatchupsMID, losingMatchupsBOT, losingMatchupsSUP);

}

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

async function getLosingMatchups(summonerName, matchList, losingMatchups, TOP, JNG, MID, BOT, SUP) {
    try {
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
 * @param {Map} matchList Matchlist map with user's most recent games with champion names mapped to losses, encounters, lossRatio 
 * @param {*} databaseList Matchlist map for a user from the database with champion names mapped to losses, encounters, lossRatio
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
}

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