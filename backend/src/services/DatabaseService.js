/*
    @brief This file provides methods to accessing database
*/

import { SummonerProfile } from '../models/SummonerProfileModel.js';

async function saveNewSummoner(summonerName, PUUID, lastGameTimestamp, allMatchups) {
    try {
        if (!summonerName || !PUUID || !lastGameTimestamp || !allMatchups) {
            throw new Error('All required fields must be provided')
        }
        // TODO: Add type validation for each parameter
        const newSummoner = {
            summonerName,
            PUUID,
            overallStats: allMatchups.overall,
            topStats: allMatchups.top,
            jungleStats: allMatchups.jng,
            midStats: allMatchups.mid,
            botStats: allMatchups.bot,
            supportStats: allMatchups.sup,
            lastGameTimestamp
        }

        await SummonerProfile.create(newSummoner);
        return true;
    } catch (error) {
        console.error('Error saving new summoner: ', error.message);
        return null;
    }
}

async function getSummonerByPUUID(PUUID) {
    try {
        const player = await SummonerProfile.findOne({ PUUID });
        if (!player) {
            throw new Error('Player not found in database');
        }
        return player;
    } catch (error) {
        console.error('Error fetching player from databaes: ', error.message);
        return null;
    }
}

async function updateSummonerByPUUID(PUUID, updatedMaps) {
    try {
        const update = {
            $set: {
                overallStats: Object.fromEntries(updatedMaps.overall),
                topStats: Object.fromEntries(updatedMaps.top),
                jungleStats: Object.fromEntries(updatedMaps.jng),
                midStats: Object.fromEntries(updatedMaps.mid),
                botStats: Object.fromEntries(updatedMaps.bot),
                supportStats: Object.fromEntries(updatedMaps.sup),
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


async function deleteSummonerByPUUID(PUUID) {
    try {
        const result = await SummonerProfile.findOneAndDelete({ PUUID });

        // TODO: Return something instead of console logging
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

export { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID }