/**
 * @brief Routes to be called by the frontend to retrieve info for the client. This file can be thought of as 
 * the entry way into the server. 
 */
import express from 'express';
import { saveNewSummoner, getSummonerByPUUID, updateSummonerByPUUID, deleteSummonerByPUUID } from '../services/DatabaseService.js';
import { fetchUserData, parseSummonerInput } from '../controllers/SummonerController.js';
import { getPUUID, getPlayerIcon, getPlayerLevel } from '../services/RiotGamesService.js';

const router = express.Router();

router.get('/querySummonerEnemyData', async (req, res) => {
    try {
        console.log("Inside querySummonerEnemyData!!!");

        const summonerName = req.query.summoner;
        const tag = req.query.tag;

        const puuid = getPUUID(summonerName, tag);

        const [returnObject, numberOfGames] = await fetchUserData(summonerName, tag);
        if (returnObject) {
            console.log("Querying for enemy data in /querySummonerEnemyData successful");

            const returnData = {
                name: summonerName,
                tag: tag,
                level: await getPlayerLevel(puuid),
                icon: await getPlayerIcon(puuid),
                games: numberOfGames,
                data: returnObject,
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

// router.get('/querySummoner', async (req, res) => {
//     try {
//         console.log("Inside query summoner");

//         // Decouple client input into summoner name and tag
//         const { summonerName, tag } = parseSummonerInput(req.query.summoner);
//         // Then get puuid
//         const puuid = await getPUUID(summonerName, tag);

//         // Call backend data processing to retrieve maps to send to client
//         const [allMatchups, numberOfGames] = await queryForMaps(summonerName, tag);
//         if (allMatchups) {
//             // Convert map to object for sending to client
//             // TODO: Convert all maps not just overall one to the object
//             let overallStats = [];
//             allMatchups.overall.forEach((value, key) => {
//                 overallStats[key] = value;
//             });

//             // Construct the returning summoner object
//             let returnSummoner = {
//                 name: summonerName,
//                 tag: tag,
//                 maps: overallStats,
//                 level: await getPlayerLevel(puuid),
//                 icon: await getPlayerIcon(puuid),
//                 games: numberOfGames
//             }

//             // console.log(returnSummoner);
//             console.log("Querying for summoner in /querySummoner successful")
//             res.status(200).send(returnSummoner);
//         } else {
//             console.log("Querying for summoner in /querySummoner unsuccessful")
//             res.status(404).send("Unsuccessful querying summoner");
//         }
//     } catch (error) {
//         console.error("Error querying for summoner: ", error);
//         res.status(500).send("Error with fetching summoner");
//     }
// })

// router.get('/queryMaps', async (req, res) => {
//     try {
//         const summonerName = req.query.summoner;
//         const tag = req.query.tag;
//         console.log(tag);
//         const allMatchups = await queryForMaps(summonerName, tag);

//         if (allMatchups) {
//             // Convert map to object for sending to client
//             let overallStats = {};
//             allMatchups.overall.forEach((value, key) => {
//                 overallStats[key] = value;
//             });

//             console.log("Querying for maps successful")
//             res.status(200).send(overallStats);
//         } else {
//             console.log("Querying for maps unsuccessful")
//             res.status(404).send("Unsuccessful querying maps");
//         }
//     } catch (error) {
//         console.error("Error querying for maps: ", error);
//         res.status(500).send("Error with fetching maps");
//     }
// })

/******************************************************
 * The following routes are for testing purposes only *
 * and should be deleted before production            *
 ******************************************************/

// Route for saving a new summoner to the db
// router.post('/', async (req, res) => {
//     if (!req.body.summonerName ||
//         !req.body.PUUID ||
//         !req.body.top ||
//         !req.body.jng ||
//         !req.body.mid ||
//         !req.body.ad ||
//         !req.body.sup ||
//         !req.body.overall ||
//         !req.body.lastGameTimestamp) {
//         return res.status(400).json({
//             message: 'Send all required fields: summonerName, PUUID, top, jng, mid, ad, sup, overall, lastGameTimestamp'
//         });
//     }

//     // Check to see if this summoner is already in the DB
//     if (await getSummonerByPUUID(req.body.PUUID) !== null) {
//         return res.status(400).json({ message: 'Summoner already in DB' });
//     }

//     const allMatchups = {
//         overall: req.body.overall,
//         top: req.body.top,
//         jng: req.body.jng,
//         mid: req.body.mid,
//         bot: req.body.ad,
//         sup: req.body.sup,
//     }

//     try {
//         if (await saveNewSummoner(req.body.summonerName, req.body.PUUID, req.body.lastGameTimestamp, allMatchups)) {
//             return res.status(200).json({ message: 'Summoner successfully added to db' });
//         }
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// })

// Route for updating an existing summoner in db
// router.put('/update/:PUUID', async (req, res) => {
//     if (!req.body.summonerName ||
//         !req.body.PUUID ||
//         !req.body.top ||
//         !req.body.jng ||
//         !req.body.mid ||
//         !req.body.ad ||
//         !req.body.sup ||
//         !req.body.overall ||
//         !req.body.lastGameTimestamp) {
//         return res.status(400).json({
//             message: 'Send all required fields: summonerName, PUUID, top, jng, mid, ad, sup, overall, lastGameTimestamp'
//         });
//     }

//     const allMatchups = {
//         overall: req.body.overall,
//         top: req.body.top,
//         jng: req.body.jng,
//         mid: req.body.mid,
//         bot: req.body.ad,
//         sup: req.body.sup,
//     }

//     const result = await updateSummonerByPUUID(req.body.summonerName, req.body.PUUID, req.body.lastGameTimestamp, allMatchups);
//     if (!result) {
//         return res.status(404).json({ message: 'Summoner not found' });
//     }
//     return res.status(200).json({ message: 'Summoner info updated successfully' });
// })

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