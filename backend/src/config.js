/* 
    @brief Purpose of this file is to hold all variables held in config.env in an export
    called config. config is used in index.js to connect to MongoDB, start the server with 
    the port, and connect to Riot with the API key. 
*/

import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

const config = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    apiKey: process.env.API_KEY,
}

export default config;