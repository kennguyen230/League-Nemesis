/**
 * @brief This file provides a config object that lets other files access data from the config.env file
 */

import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

const config = {
    port: 5000,
    host: process.env.HOST || 'localhost',
    mongoURI: process.env.MONGO_URI,
    apiKey: process.env.API_KEY,
}

export default config;