import config from './config.js'
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        mongoose
            .connect(config.mongoURI)
            .then(() => {
                console.log('App connected to database');
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
