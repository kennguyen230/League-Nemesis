/**
 * @brief This file provides methods for accessing the MongoDB database.
 */
// TODO: Create better way to handle errors. Potentially want to throw the errors to SummonerRoutes page so we can send a res msg
import { SummonerProfile } from '../models/SummonerProfileModel.js';

async function saveNewSummoner(summonerName, PUUID, lastGameTimestamp, numberOfGames, enemyStats, userStats) {
    try {
        if (!summonerName || !PUUID || !lastGameTimestamp || !enemyStats || !userStats) {
            throw new Error('All required fields must be provided');
        }

        const newSummoner = {
            summonerName,
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
        console.error('Error saving new summoner: ', error.message);
        return null;
    }
}

async function updateSummonerByPUUID(summonerName, PUUID, lastGameTimestamp, numberOfGames, enemyStats, userStats) {
    try {
        if (!summonerName || !PUUID || !lastGameTimestamp || !enemyStats || !userStats) {
            throw new Error('All required fields must be provided');
        }

        const update = {
            $set: {
                summonerName: summonerName,
                lastGameTimestamp: lastGameTimestamp,
                numberOfGames: numberOfGames,
                enemyStats: enemyStats,
                userStats: userStats
            }
        };

        const options = { new: true }; // Returns the updated document instead of old doc

        const result = await SummonerProfile.findOneAndUpdate({ PUUID }, update, options);
        if (result) {
            console.log('Successfully updated summoner:', result);
            return result;
        } else {
            console.log('Summoner not found in database with the given PUUID:', PUUID);
            return null;
        }

    } catch (error) {
        console.error('Error updating summoner in database:', error.message);
        throw error;
    }
}

async function getSummonerByPUUID(PUUID) {
    try {
        if (!PUUID) throw new Error('PUUID not defined');

        const player = await SummonerProfile.findOne({ PUUID });

        if (!player) {
            console.log('No player found in database');
            return null;
        } else {
            console.log('Player found in database');
        }

        return player;
    } catch (error) {
        console.error('Error fetching player from database: ', error.message);
        return null;
    }
}

async function deleteSummonerByPUUID(PUUID) {
    try {
        if (!PUUID) throw new Error('PUUID not defined');

        const result = await SummonerProfile.findOneAndDelete({ PUUID });

        if (result) {
            console.log('Successfully deleted summoner');
            return true;
        } else {
            console.log('User not found in database');
            return false;
        }

    } catch (error) {
        console.error('Error deleting summoner from database: ', error.message);
        return false;
    }
}

export { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID };
