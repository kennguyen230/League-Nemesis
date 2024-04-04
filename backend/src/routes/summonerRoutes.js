/**
 * @brief Routes to be called by the frontend to retrieve info for the client. This file can be thought of as 
 * the entry way into the server. 
 */
import express from 'express';
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID } from '../services/DatabaseService.js';
import { queryForMaps } from '../controllers/SummonerController.js';

const router = express.Router();

// router.get('/getMatchlist', async (req, res) => {
//     console.log("IN MATCHLIST ROUTE!");
//     const summonerName = req.query.summoner;
//     try {
//         const matchList = await getRecentGames(summonerName, -1);
//         res.status(200).json(matchList);
//     } catch (error) {
//         console.error("Error with matchlist route:", error);
//         res.status(500).send("Error with matchlist route");
//     }
// })

// router.get('/getPUUID', async (req, res) => {
//     console.log("IN PUUID ROUTE");
//     const summonerName = req.query.summoner;
//     try {
//         const puuid = await getPUUID(summonerName);
//         res.status(200).json(puuid);
//     } catch (error) {
//         console.error("Error with fetching PUUID", error);
//         res.status(500).send("Error with fetching PUUID");
//     }
// })

// router.get('/getMaps', async (req, res) => {
//     console.log("IN GET MAPS ROUTE!");
//     const summonerName = req.query.summoner;
//     try {
//         const matchList = await getRecentGames(summonerName, -1);
//         const allMatchups = await createMapsWithML(summonerName, matchList);

//         // Convert Map to an object
//         let overallStats = {};
//         allMatchups.overall.forEach((value, key) => {
//             overallStats[key] = value;
//         });

//         res.status(200).json(overallStats); // Send object, not Map
//     } catch (error) {
//         console.error("Error with fetching maps: ", error);
//         res.status(500).send("Error with fetching maps");
//     }
// });

router.get('/queryMaps', async (req, res) => {
    try {
        const summonerName = req.query.summoner;
        const allMatchups = await queryForMaps(summonerName);

        if (allMatchups) {
            // Convert map to object for sending to client
            let overallStats = {};
            allMatchups.overall.forEach((value, key) => {
                overallStats[key] = value;
            });

            console.log("Querying for maps successful")
            res.status(200).send(overallStats);
        } else {
            console.log("Querying for maps unsuccessful")
            res.status(404).send("Unsuccessful querying maps");
        }
    } catch (error) {
        console.error("Error querying for maps: ", error);
        res.status(500).send("Error with fetching maps");
    }
})

/******************************************************
 * The following routes are for testing purposes only *
 ******************************************************/

// Route for saving a new summoner to the db
router.post('/', async (req, res) => {
    if (!req.body.summonerName ||
        !req.body.PUUID ||
        !req.body.top ||
        !req.body.jng ||
        !req.body.mid ||
        !req.body.ad ||
        !req.body.sup ||
        !req.body.overall ||
        !req.body.lastGameTimestamp) {
        return res.status(400).json({
            message: 'Send all required fields: summonerName, PUUID, top, jng, mid, ad, sup, overall, lastGameTimestamp'
        });
    }

    // Check to see if this summoner is already in the DB
    if (await getSummonerByPUUID(req.body.PUUID) !== null) {
        return res.status(400).json({ message: 'Summoner already in DB' });
    }

    const allMatchups = {
        overall: req.body.overall,
        top: req.body.top,
        jng: req.body.jng,
        mid: req.body.mid,
        bot: req.body.ad,
        sup: req.body.sup,
    }

    try {
        if (await saveNewSummoner(req.body.summonerName, req.body.PUUID, req.body.lastGameTimestamp, allMatchups)) {
            return res.status(200).json({ message: 'Summoner successfully added to db' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route for updating an existing summoner in db
router.put('/update/:PUUID', async (req, res) => {
    if (!req.body.summonerName ||
        !req.body.PUUID ||
        !req.body.top ||
        !req.body.jng ||
        !req.body.mid ||
        !req.body.ad ||
        !req.body.sup ||
        !req.body.overall ||
        !req.body.lastGameTimestamp) {
        return res.status(400).json({
            message: 'Send all required fields: summonerName, PUUID, top, jng, mid, ad, sup, overall, lastGameTimestamp'
        });
    }

    const allMatchups = {
        overall: req.body.overall,
        top: req.body.top,
        jng: req.body.jng,
        mid: req.body.mid,
        bot: req.body.ad,
        sup: req.body.sup,
    }

    const result = await updateSummonerByPUUID(req.body.summonerName, req.body.PUUID, req.body.lastGameTimestamp, allMatchups);
    if (!result) {
        return res.status(404).json({ message: 'Summoner not found' });
    }
    return res.status(200).json({ message: 'Summoner info updated successfully' });
})

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

export default router;