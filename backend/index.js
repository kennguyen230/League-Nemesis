// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import summoner from './src/routes/summonerRoutes.js' // The router object that contains all our HTTP routes
import app from './app.js'
import config from './config.js'
import mongoose from 'mongoose';

mongoose
    .connect(config.mongoURI)
    .then(() => {
        console.log("App connected to database");
        app.listen(port, () => {
            console.log(`App is listening to port: ${config.port}`);
        })
    }).catch((error) => {
        console.log(error);
    })