/*
    @brief Purpose of this file is to supply a schema for Mongoose.
    The schema will be a blueprint for how the DB will take in the documents
    for the playerProfile document. 
*/
import mongoose from "mongoose";

const championStatsSchema = new mongoose.Schema({
    losses: Number,
    totalGames: Number,
    lossPercent: Number
}, { _id: false });

const summonerSchema = new mongoose.Schema({
    summonerName: {
        type: String,
        required: true
    },
    PUUID: {
        type: String,
        required: true
    },
    lossRateMap: {
        type: Map,
        of: championStatsSchema,
        required: true
    },
    totalLossMap: {
        type: Map,
        of: championStatsSchema,
        required: true
    },
    lastGameTimestamp: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

export const SummonerProfile = mongoose.model('SummonerProfile', summonerSchema);