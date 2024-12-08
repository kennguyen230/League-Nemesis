/**
 * @brief This file provides methods for accessing the MongoDB database.
 */
// TODO: Create better way to handle errors. Potentially want to throw the errors to SummonerRoutes page so we can send a res msg
import { SummonerProfile } from '../models/SummonerProfileModel.js';

async function saveNewSummoner(summonerName, tag, region, PUUID, lastGameTimestamp = -1,
    numberOfGames = {}, enemyStats = {}, userStats = {}, state = 'processing') {
    try {
        // Validate required fields
        if (!summonerName || !tag || !region || !PUUID) {
            throw new Error('All required fields must be provided');
        }

        // Create the new summoner object with default values for optional fields
        const newSummoner = {
            summonerName,
            tag,
            region,
            PUUID,
            lastGameTimestamp,
            numberOfGames,
            enemyStats,
            userStats,
            state
        };

        // Save the summoner to the database
        const result = await SummonerProfile.create(newSummoner);
        console.log('New summoner saved:', result);

        return true;
    } catch (error) {
        console.error('(DatabaseService.ts) Error saving new summoner: ', error.message);
        return null;
    }
}


async function updateSummonerByPUUID(
    summonerName,
    tag,
    region,
    PUUID,
    lastGameTimestamp,
    numberOfGames,
    enemyStats,
    userStats
) {
    try {
        // Validate required fields
        if (!summonerName || !tag || !region || !PUUID || !lastGameTimestamp || !numberOfGames || !enemyStats || !userStats) {
            throw new Error('All required fields must be provided');
        }

        // Build the update object
        const update = {
            $set: {
                summonerName,
                tag,
                region,
                lastGameTimestamp,
                numberOfGames,
                enemyStats,
                userStats,
                state: 'ready' // Transition state to 'ready'
            }
        };

        const options = { new: true }; // Return the updated document

        // Update the summoner by PUUID
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

async function getSummonerByPUUID(PUUID, region) {
    try {
        if (!PUUID) throw new Error('(DatabaseService.ts) PUUID not defined');

        const player = await SummonerProfile.findOne({
            PUUID,
            region
        })

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

        const result = await SummonerProfile.exists({ PUUID });

        if (result) {
            console.log('(DatabaseService.ts::checkForNewUserByPUUID) Found user', PUUID);
            return false;
        } else {
            console.log('(DatabaseService.ts::checkForNewUserByPUUID) User not found in database with PUUID: ', PUUID);
            return true;
        }
    } catch (error) {
        console.error('(DatabaseService.ts) Error searching for new summoner from database: ', error.message);
        return false;
    }
}

async function findUserBySummonerName(summonerName, region) {
    try {
        const users = await SummonerProfile.find({
            summonerName: { $regex: new RegExp(summonerName, "i") }, // Case-insensitive partial match
            region: region,
        }).limit(5); // Limit the results for performance
        return users;
    } catch (error) {
        console.error('(DatabaseService.ts) Error finding user by summoner name and region: ', error.message);
        return null;
    }
}

async function updateStateByPUUID(puuid, newState) {
    try {
        // Validate newState against allowed values
        const allowedStates = ['processing', 'ready'];
        if (!allowedStates.includes(newState)) {
            throw new Error(`Invalid state: ${newState}. Allowed states are: ${allowedStates.join(', ')}`);
        }

        // Update the state field in the document
        const result = await SummonerProfile.updateOne(
            { PUUID: puuid }, // Find document by PUUID
            { $set: { state: newState } } // Update the state
        );

        if (result.matchedCount === 0) {
            console.log(`No document found with PUUID: ${puuid}`);
            return null;
        }

        console.log(`State successfully updated to '${newState}' for PUUID: ${puuid}`);
        return true;
    } catch (error) {
        console.error(`Error updating state for PUUID ${puuid}:`, error.message);
        throw error;
    }
}



export { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID, checkForNewUserByPUUID, findUserBySummonerName, updateStateByPUUID };
