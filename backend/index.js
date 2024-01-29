import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import summoner from './routes/summonerRoutes.js'

// Middleware for parsing requests 
const app = express();
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

// Using dotenv file to hide MongoDB URI and port number
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

// Default response
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to League Nemesis");
});

// If there is ever a route in the frontend that starts the url with /summoner/.. then
// these are the routes we're going to use in the backend
app.use('/summoner', summoner);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("App connected to database");
        app.listen(port, () => {
            console.log(`App is listening to port: ${port}`);
        })
    }).catch((error) => {
        console.log(error);
    })