/**
 * @brief Routes to be called by the frontend to retrieve info for the client. This file can be thought of as 
 * the entry way into the server. 
 */
import express from 'express';
import { checkForNewUserByPUUID, findUserBySummonerName } from '../services/DatabaseService.js';
import { parseSummonerInput, createDefaultSummoner, getExistingSummoner } from '../controllers/SummonerController.js';
import { getPUUID, getPlayerInfo } from '../services/RiotGamesService.js';
import { getClient } from '../services/ClientManager.js'
import { inngest } from '../inngest/inngest.js';

const router = express.Router();

router.get('/autoSuggestUsers', async (req, res) => {
    const { summonerName, region } = req.query;

    try {
        if (!summonerName || !region) {
            return res.status(400).json({ error: "Summoner name and region are required" });
        }

        const suggestions = await findUserBySummonerName(summonerName, region);
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

router.get("/querySummoner", async (req, res) => {
    try {
        console.log("(summonerRoutes.ts::querySummoner) Inside querySummoner route!!!");

        // Grab params from client
        const { summonerName, tag } = parseSummonerInput(req.query.summonerNameAndTag);
        let region = req.query.region;

        // Validate input for proper summoner name and tag lengths
        const summonerNameRegex = /^[a-zA-Z0-9 ]{3,16}$/;
        const tagRegex = /^[a-zA-Z0-9]{2,5}$/;
        if (!summonerName || !tag || !summonerNameRegex.test(summonerName) || !tagRegex.test(tag)) {
            console.log("(summonerRoutes.ts::querySummoner) Invalid summoner name or tag");
            return res.status(400).json({ error: "Invalid summoner name or tag." });
        }
        if (typeof region !== 'string') {
            return res.status(400).send('Invalid region input');
        }
        region = region.toLowerCase(); // Shieldbow only works with lowercase region names

        // Get an instance of the client
        const client = await getClient(region);

        // Get player info from Riot, including the summoner name and tag
        // that way the capitalization is correct
        let puuid;
        let summoner_name;
        let summoner_tag;
        try {
            const playerInfo = await getPlayerInfo(summonerName, tag, client);
            summoner_name = playerInfo.username;
            summoner_tag = playerInfo.userTag;
            puuid = playerInfo.playerId;
        } catch (error) {
            return res.status(404).json({ error: "No PUUID associated with this summoner name and tag." });
        }

        // Check to see if this user exists in the database, if they do then send 
        // back the data that currently exists in the database while the new matches 
        // get processed. If they don't exist, send back a default summoner object.
        const isNew = await checkForNewUserByPUUID(puuid);
        if (isNew) {
            console.log("NEW USER!!!!!!!!!!!!!!!!")
            const newUserObject = await createDefaultSummoner(summoner_name, summoner_tag, region, puuid, client);

            console.log("(summonerRoutes.ts::querySummoner) New summoner detected. Queuing data fetch.");
            await inngest.send({
                name: "fetchdata",
                data: {
                    summoner_name,
                    summoner_tag,
                    region,
                    puuid,
                },
            });

            return res.status(200).json(newUserObject);
        } else {
            console.log("EXISTING USER!!!!!!!!!!")
            const existingUserObject = await getExistingSummoner(puuid, region, client);

            console.log("(summonerRoutes.ts::querySummoner) Existing summoner detected. Queuing data fetch.");
            await inngest.send({
                name: "fetchdata",
                data: {
                    summoner_name,
                    summoner_tag,
                    region,
                    puuid,
                },
            });

            return res.status(200).json(existingUserObject);
        }
    } catch (error) {
        console.error("(summonerRoutes.ts::querySummoner) Unexpected error:", error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
})

router.get("/pollSummonerStatus", async function (req, res) {
    try {
        // Grab params from client
        const { summonerName, tag } = parseSummonerInput(req.query.summonerNameAndTag);
        let region = req.query.region;

        if (typeof region !== "string") {
            return res.status(400).send("Invalid region input");
        }
        region = region.toLowerCase(); // Shieldbow only works with lowercase region names

        // Get an instance of the client
        const client = await getClient(region);

        // Get player info from Riot, including the summoner name and tag
        let puuid;
        let summoner_name;
        let summoner_tag;
        try {
            const playerInfo = await getPlayerInfo(summonerName, tag, client);
            summoner_name = playerInfo.username;
            summoner_tag = playerInfo.userTag;
            puuid = playerInfo.playerId;
        } catch (error) {
            return res
                .status(404)
                .json({ error: "No PUUID associated with this summoner name and tag." });
        }

        const result = await getExistingSummoner(puuid, region, client);
        return res.status(200).json(result);
    } catch (error) {
        console.error("(summonerRoutes.ts::pollSummonerStatus) Unexpected error:", error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

export default router;