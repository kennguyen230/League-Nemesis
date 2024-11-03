/**
 * @brief This file provides methods for accessing the MongoDB database.
 */
// TODO: Create better way to handle errors. Potentially want to throw the errors to SummonerRoutes page so we can send a res msg
import { SummonerProfile } from '../models/SummonerProfileModel.js';

async function saveNewSummoner(summonerName, tag, region, PUUID, lastGameTimestamp, numberOfGames, enemyStats, userStats) {
    try {
        if (!summonerName || !tag || !region || !PUUID || !lastGameTimestamp || !enemyStats || !userStats) {
            throw new Error('All required fields must be provided');
        }

        const newSummoner = {
            summonerName,
            tag,
            region,
            PUUID,
            lastGameTimestamp,
            numberOfGames,
            enemyStats,
            userStats
        };

        await SummonerProfile.create(newSummoner).then(result => {
            console.log(result);
        })

        return true;
    } catch (error) {
        console.error('(DatabaseService.ts) Error saving new summoner: ', error.message);
        return null;
    }
}

async function updateSummonerByPUUID(summonerName, tag, region, PUUID, lastGameTimestamp, numberOfGames, enemyStats, userStats) {
    try {
        if (!summonerName || !tag || !region || !PUUID || !lastGameTimestamp || !enemyStats || !userStats) {
            throw new Error('All required fields must be provided');
        }

        const update = {
            $set: {
                summonerName: summonerName,
                tag: tag,
                region: region,
                lastGameTimestamp: lastGameTimestamp,
                numberOfGames: numberOfGames,
                enemyStats: enemyStats,
                userStats: userStats
            }
        };

        const options = { new: true }; // Returns the updated document instead of old doc

        const result = await SummonerProfile.findOneAndUpdate({ PUUID }, update, options);
        if (result) {
            console.log('(DatabaseService.ts) Successfully updated summoner:', result);
            return result;
        } else {
            console.log('(DatabaseService.ts) Summoner not found in database with the given PUUID:', PUUID);
            return null;
        }

    } catch (error) {
        console.error('(DatabaseService.ts) Error updating summoner in database:', error.message);
        throw error;
    }
}

async function getSummonerByPUUID(PUUID) {
    try {
        if (!PUUID) throw new Error('(DatabaseService.ts) PUUID not defined');

        const player = await SummonerProfile.findOne({ PUUID });

        if (!player) {
            console.log('(DatabaseService.ts) No player found in database');
            return null;
        } else {
            console.log('(DatabaseService.ts) Player found in database');
        }

        return player;
    } catch (error) {
        console.error('(DatabaseService.ts) Error fetching player from database: ', error.message);
        return null;
    }
}

async function deleteSummonerByPUUID(PUUID) {
    try {
        if (!PUUID) throw new Error('PUUID not defined');

        const result = await SummonerProfile.findOneAndDelete({ PUUID });

        if (result) {
            console.log('(DatabaseService.ts) Successfully deleted summoner');
            return true;
        } else {
            console.log('(DatabaseService.ts) User not found in database');
            return false;
        }

    } catch (error) {
        console.error('(DatabaseService.ts) Error deleting summoner from database: ', error.message);
        return false;
    }
}


async function checkForNewUserByPUUID(PUUID) {
    try {
        if (!PUUID) throw new Error('PUUID not defined');
        return await SummonerProfile.exists({ PUUID });
    } catch (error) {
        console.error('(DatabaseService.ts) Error searching for new summoner from database: ', error.message);
        return false;
    }
}

export { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID, checkForNewUserByPUUID };
