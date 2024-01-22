import express from 'express';
import { MatchHistory } from '../models/matchHistoryModel.js';

const router = express.Router();

// Route for adding new summoner
router.post('/', async (req, res) => {
    //     try {
    //         if (!req.body.summonerName) { // Consider the need for a game tag (eg. #NA1)
    //             return res.status(400).send({
    //                 message: 'Send all required fields: summoner name'
    //             })
    //         }

    //         /*
    //             Problem:
    //             We are only receiving summoner name from user but we need to calculate maps and grab PUUID
    //             before we add document to database.
    //         */
    //     } catch (error) {
    //         console.log(error.message);
    //         res.status(500).send({ message: error.message });
    //     }
    // }
})

export default router;