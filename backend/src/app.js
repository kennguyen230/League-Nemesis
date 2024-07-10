/**
 * @brief Middleware file for setting up express, cors, as well as /summoner endpoint.
 */

import express from 'express';
import cors from 'cors';
import summonerRoutes from './routes/summonerRoutes.js';
// import summonerRoutes from './routes/SummonerRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to League Nemesis');
})

app.use('/summoner', summonerRoutes);

export default app;