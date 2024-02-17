/*
    @brief Purpose of this file is to make api calls to Riot Games via ShieldBow wrapper 
*/

import config from './src/config.js'

import { Client } from 'shieldbow';

const client = new Client(config.API_KEY);

client
.initialize({
region: 'na', // TODO: Change to accept any region
})

async function getPUUID(summonerName) {
    const summoner = await client.summoners.fetchBySummonerName(summonerName);
    return summoner.playerId;
}

async function getRecentGames(summonerName) {
    const summoner = await client.summoners.fetchBySummonerName(summonerName);

}

// export default client;
 
// client
//   .initialize({
//     region: 'na', // defaults to 'na' anyways.
//   })
//   .then(async () => {
//     // After initialization, you can use the client to make requests
//     // For example, lets fetch the following details of a summoner
//     // - Summoner name, summoner level
//     // - SoloQ ranking and LP
//     // - The highest champion mastery

//     const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
//     const leagueEntry = await summoner.fetchLeagueEntries();
//     const championMastery = summoner.championMastery;

//     const soloQ = leagueEntry.get('RANKED_SOLO_5x5');
//     const highest = await championMastery.highest();

//     console.log(`Summoner name: ${summoner.name} (level: ${summoner.level}).`);
//     console.log(`SoloQ: ${soloQ.tier} ${soloQ.division} (${soloQ.lp} LP).`);
//     console.log(`Highest champion mastery: ${highest.champion.name} (M${highest.level} ${highest.points} points).`);
//   });



