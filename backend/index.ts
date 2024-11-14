/**
 * @brief This file is the starting point for the backend server. When npm start is called, the database gets
 * connected to from here.
 */

import express from 'express';
import cors from 'cors';
import summonerRoutes from './src/routes/summonerRoutes.js';
import { connectToDatabase } from './src/db.js'

const app = express();

app.use(cors({
    origin: 'https://league-nemesis-client.vercel.app', // Replace with your actual client URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to League Nemesis');
})

// app.listen(5000, "localhost", () => {
//     console.log(`Server is running on localhost:5000`);
// })

app.use('/summoner', summonerRoutes);

connectToDatabase().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});

export default app;
