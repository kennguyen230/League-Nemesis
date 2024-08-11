/**
 * @brief Routes to be called by the frontend to retrieve info for the client. This file can be thought of as 
 * the entry way into the server. 
 */
import express from 'express';
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID } from '../services/DatabaseService.js';
import { fetchUserData, parseSummonerInput } from '../controllers/SummonerController.js';
import { getPUUID, getPlayerIcon, getPlayerLevel } from '../services/RiotGamesService.js';

const router = express.Router();

router.get('/querySummoner', async (req, res) => {
    try {
        console.log("Inside querySummoner!!!");

        const { summonerName, tag } = parseSummonerInput(req.query.summoner);

        const summonerNameRegex = /^[a-zA-Z0-9 ]{3,16}$/;
        const tagRegex = /^[a-zA-Z0-9]{2,5}$/;

        if (!summonerName || !tag || !summonerNameRegex.test(summonerName) || !tagRegex.test(tag)) {
            return res.status(400).send("Invalid summoner name or tag.");
        }

        const puuid = await getPUUID(summonerName, tag, res);
        if (!puuid) {
            // Early return if PUUID is not found or an error occurred
            return;
        }

        const [returnObject, numberOfGames] = await fetchUserData(summonerName, tag);
        if (returnObject) {
            console.log("Querying for enemy data in /querySummonerEnemyData successful");

            const returnData = {
                name: summonerName,
                tag: tag,
                level: await getPlayerLevel(puuid),
                icon: await getPlayerIcon(puuid),
                games: numberOfGames,
                userdata: returnObject,
            }

            res.status(200).send(returnData);
        } else {
            console.log("Querying for enemy data in /querySummonerEnemyData unsuccessful." +
                "This may be because of an incorrect summoner name input resulting in fetching " +
                "of a non-existent account or an erroneous tag input.");
            res.status(404).send("Querying enemy data unsuccessful");
        }
    } catch (error) {
        console.error("Error querying for enemy data. Error: ", error);
        res.status(500).send("Error querying enemy data")
    }
})

/******************************************************
 * The following routes are for testing purposes only *
 * and should be deleted before production            *
 ******************************************************/

// Route for deleting an existing summoner in db
router.delete('/delete/:PUUID', async (req, res) => {
    const { PUUID } = req.params;
    // Alternatively, you can set it as a variable instead of destructoring:
    // const puuid = req.params.PUUID;

    if (await deleteSummonerByPUUID(PUUID)) {
        return res.status(200).json({ message: 'Summoner deleted successfully' });
    } else {
        return res.status(404).json({ message: 'User not found in database' });
    }
})

// Route for getting a user's PUUID
router.get('/getPUUID', async (req, res) => {
    console.log("IN PUUID ROUTE");
    const summonerName = req.query.summoner;
    const tag = req.query.tag;
    try {
        const puuid = await getPUUID(summonerName, tag);
        res.status(200).json(puuid);
    } catch (error) {
        console.error("Error with fetching PUUID", error);
        res.status(500).send("Error with fetching PUUID");
    }
})

// Route for testing frontend by returning basic info about summoner
router.get('/getBasicInfo', async (req, res) => {
    try {
        console.log("Inside getBasicInfo with summoner:", req.query.summoner);
        const input = req.query.summoner;

        const { summonerName, tag } = parseSummonerInput(input);
        const basicInfo = {
            summonerName: summonerName,
            summonerTag: tag,
            summonerLevel: 112,
        }

        res.status(200).json(basicInfo);
    } catch (error) {
        console.error("Error in getBasicInfo: ", error);
        res.status(500).send("Error with getting basic info")
    }
})

export default router;