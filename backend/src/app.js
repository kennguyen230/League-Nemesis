/* 
    @brief Purpose of this file is be the base for accessing the endpoints and routes
    in the backend. 
*/

import express from 'express';
import cors from 'cors';
import summonerRoutes from './routes/summonerRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to League Nemesis');
})

app.use('/summoner', summonerRoutes);

export default app;