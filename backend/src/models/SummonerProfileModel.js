/*
    @brief Purpose of this file is to supply a schema for Mongoose.
    The schema will be a blueprint for how the DB will take in the documents
    for the playerProfile document. 
*/

import mongoose from "mongoose";

// Schema for individual champion stats within a role or overall
const championStatsSchema = new mongoose.Schema({
    losses: {
        type: Number,
        required: true
    },
    encounters: {
        type: Number,
        required: true
    },
    lossRatio: {
        type: Number,
        required: true
    }
}, { _id: false });

// Embedding championStatsSchema in a Map structure for each role and overall stats
const roleStatsSchema = {
    type: Map,
    of: championStatsSchema
};

// Updated summonerSchema to reflect role-based statistics and possibly game type differentiation
const summonerSchema = new mongoose.Schema({
    summonerName: {
        type: String,
        required: true
    },
    PUUID: {
        type: String,
        required: true
    },
    overallStats: roleStatsSchema,
    topStats: roleStatsSchema,
    jungleStats: roleStatsSchema,
    midStats: roleStatsSchema,
    botStats: roleStatsSchema,
    supportStats: roleStatsSchema,
    lastGameTimestamp: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const SummonerProfile = mongoose.model('SummonerProfile', summonerSchema); // SummonerProfile is the name of the collection
