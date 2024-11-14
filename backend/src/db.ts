import config from './config.js';
import mongoose from 'mongoose';

let isConnected = false; // Track connection status

export const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(config.mongoURI);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
