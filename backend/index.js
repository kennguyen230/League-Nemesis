/*
    @brief Purpose of this file is to be the starting point of the backend
    & database.
*/
import app from './src/app.js'
import config from './src/config.js'
import mongoose from 'mongoose';

mongoose
    .connect(config.mongoURI)
    .then(() => {
        console.log("App connected to database");
        app.listen(config.port, () => {
            console.log(`App is listening to port: ${config.port}`);
        })
    }).catch((error) => {
        console.log(error);
    })