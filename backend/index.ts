/**
 * @brief This file is the starting point for the backend server. When npm start is called, the database gets
 * connected to from here.
 */

import express from 'express';
import cors from 'cors';
import summonerRoutes from './src/routes/summonerRoutes.js';
import { connectToDatabase } from './src/db.js'

import { serve } from "inngest/express"
import { inngest, functions } from "./src/inngest/inngest.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to League Nemesis');
})

app.use('/summoner', summonerRoutes);

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

connectToDatabase().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});

export default app;
