/**
 * @brief Routes to be called by the frontend to retrieve info for the client. This file can be thought of as 
 * the entry way into the server. 
 */
import express from 'express';
import { checkForNewUserByPUUID, findUserBySummonerName } from '../services/DatabaseService.js';
import { fetchUserData, parseSummonerInput } from '../controllers/SummonerController.js';
import { getPUUID, getPlayerIcon, getPlayerLevel, getPlayerInfo } from '../services/RiotGamesService.js';
import { getClient } from '../services/ClientManager.js'

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

router.head('/checkNewUser', async (req, res) => {
    try {
        console.log("(summonerRoutes.ts) Inside checkNewUser!!!");
        const { summonerName, tag } = parseSummonerInput(req.query.summoner);
        const region = req.query.region;

        // Validate input for proper summoner name and tag lengths
        const summonerNameRegex = /^[a-zA-Z0-9 ]{3,16}$/;
        const tagRegex = /^[a-zA-Z0-9]{2,5}$/;
        if (!summonerName || !tag || !summonerNameRegex.test(summonerName) || !tagRegex.test(tag)) {
            console.log("(summonerRoutes.ts) Invalid summoner name or tag");
            return res.status(400).json({ error: "Invalid summoner name or tag." });
        }
        if (typeof region !== 'string') {
            return res.status(400).send('Invalid region');
        }

        // Get an instance of the client
        const client = await getClient(region.toLowerCase());

        console.log("(summonerRoutes.ts) Summoner name:", summonerName);
        console.log("(summonerRoutes.ts) Region:", region.toLowerCase());

        // Attempt to get puuid from the summoner name and tag passed in
        // If no puuid is found then no such player exists in League
        let puuid;
        try {
            puuid = await getPUUID(summonerName, tag, client);
        } catch (error) {
            return res.status(404).json({ error: "No PUUID associated with this summoner name and tag." });
        }

        const newUser = await checkForNewUserByPUUID(puuid);
        if (newUser) {
            return res.status(200).send();
        } else if (newUser == null) {
            return res.status(201).send();
        }
    } catch (error) {
        console.error("(summonerRoutes.ts) Unexpected error:", error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
})

router.get('/querySummoner', async (req, res) => {
    try {
        console.log("(summonerRoutes.ts) Inside querySummoner!!!");

        // Grab params from client
        const { summonerName, tag } = parseSummonerInput(req.query.summoner);
        let region = req.query.region;

        // Validate input for proper summoner name and tag lengths
        const summonerNameRegex = /^[a-zA-Z0-9 ]{3,16}$/;
        const tagRegex = /^[a-zA-Z0-9]{2,5}$/;
        if (!summonerName || !tag || !summonerNameRegex.test(summonerName) || !tagRegex.test(tag)) {
            console.log("(summonerRoutes.ts) Invalid summoner name or tag");
            return res.status(400).json({ error: "Invalid summoner name or tag." });
        }
        if (typeof region !== 'string') {
            return res.status(400).send('Invalid region input');
        }
        region = region.toLowerCase();

        // Get an instance of the client
        const client = await getClient(region);

        // Get player info from Riot, including the summoner name and tag
        // that way the capitalization is correct
        let puuid;
        let summoner;
        let summonerTag;
        try {
            const playerInfo = await getPlayerInfo(summonerName, tag, client);
            summoner = playerInfo.username;
            summonerTag = playerInfo.userTag;
            puuid = playerInfo.playerId;
        } catch (error) {
            return res.status(404).json({ error: "No PUUID associated with this summoner name and tag." });
        }

        console.log("(summonerRoutes.ts) Summoner name:", summoner);
        console.log("(summonerRoutes.ts) Summoner tag:", summonerTag);
        console.log("(summonerRoutes.ts) Region:", region);

        // Attempt to fetch games
        const [returnObject, numberOfGames] = await fetchUserData(summoner, summonerTag, region, client, puuid);
        if (returnObject) {
            console.log("(summonerRoutes.ts) Successfully fetched user data in /querySummonerEnemyData");

            const returnData = {
                name: summoner,
                tag: summonerTag,
                level: await getPlayerLevel(puuid, client),
                icon: await getPlayerIcon(puuid, client),
                games: numberOfGames,
                userdata: returnObject,
            }

            return res.status(200).json(returnData);
        } else {
            console.log("(summonerRoutes.ts) Unsuccessfully fetched user data in /querySummonerEnemyData.");
            return res.status(404).json({ error: "Querying enemy data unsuccessful" });
        }
    } catch (error) {
        console.error("(summonerRoutes.ts) Unexpected error:", error);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
})

export default router;