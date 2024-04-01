/**
 * @brief This file is the starting point for the backend server. When npm start is called, the database gets
 * connected to from here.
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