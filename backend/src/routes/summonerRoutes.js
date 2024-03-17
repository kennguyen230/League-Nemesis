/*
    @brief Purpose of this file is to create HTTP routes for CRUD operations
*/
import express from 'express';
import { SummonerProfile } from '../models/SummonerProfileModel.js';
import { getPUUID, getRecentGames, getLastGameTimestamp } from '../services/RiotGamesService.js'

const router = express.Router();

// Route for saving a new summoner to the db
router.post('/', async (req, res) => {
    try {
        if (!req.body.summonerName || !req.body.PUUID ||
            !req.body.lossRateMap || !req.body.totalLossMap ||
            !req.body.lastGameTimestamp) {
            return res.status(400).json({
                message: 'Send all required fields: summonerName, PUUID, lossRateMap, totalLossMap, lastGameTimestamp'
            });
        }

        const newSummoner = {
            summonerName: req.body.summonerName,
            PUUID: req.body.PUUID,
            lossRateMap: req.body.lossRateMap,
            totalLossMap: req.body.totalLossMap,
            lastGameTimestamp: req.body.lastGameTimestamp,
        };

        await SummonerProfile.create(newSummoner);

        return res.status(201).json({ message: 'Summoner successfully added to db' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

})

// Route for getting a summoner's maps in db
// router.get('/:puuid', async (req, res) => {
//     try {
//         const { puuid } = req.params;

//         // NOTE: If the player has not been added to the DB yet then findOne() will return
//         // null. Make sure we check if(null) in middleware after we return from this
//         // call so that we don't try to access or append empty info. 
//         const player = await SummonerProfile.findOne({ PUUID: puuid });
//         if (!player) {
//             return res.status(404).json({ message: 'Summoner not found' });
//         }
//         return res.status(200).json(player);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// Route for updating summoner data in db after we append new matches
router.put('/updateByPUUID/:puuid', async (req, res) => {
    try {
        const { puuid } = req.params;

        // new: true returns the updated document. This would matter in instances where we want to return
        // the summoner info back to the frontend to repopulate. We wont be needing that so it's not as
        // relevant in our case. 
        //
        // Also note that result is the actual document. But if we couldnt find a doc by this puuid then
        // result would be null. Thus if(!result) would evaluate to true
        const result = await SummonerProfile.findOneAndUpdate({ PUUID: puuid }, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Summoner not found' })
        }

        return res.status(200).json({ message: 'Summoner info updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route for deleting a summoner from db
router.delete('/deleteByPUUID/:puuid', async (req, res) => {
    try {
        const { puuid } = req.params;
        const result = await SummonerProfile.findOneAndDelete({ PUUID: puuid });

        if (result) {
            res.status(200).json({ message: 'Summoner deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.get('/getMatchlist', async (req, res) => {
    console.log("IN MATCHLIST ROUTE!");
    const summonerName = req.query.summoner;
    try {
        const matchList = await getRecentGames(summonerName, -1);
        res.status(200).json(matchList);
    } catch (error) {
        console.error("Error with matchlist route:", error);
        res.status(500).send("Error with matchlist route");
    }
})

router.get('/getPUUID', async (req, res) => {
    console.log("IN PUUID ROUTE");
    const summonerName = req.query.summoner;
    try {
        const puuid = await getPUUID(summonerName);
        res.status(200).json(puuid);
    } catch (error) {
        console.error("Error with fetching PUUID", error);
        res.status(500).send("Error with fetching PUUID");
    }
})

export default router;