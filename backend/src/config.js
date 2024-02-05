import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

const config = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URO,
    apiKey: process.env.API_KEY,
}

export default config;