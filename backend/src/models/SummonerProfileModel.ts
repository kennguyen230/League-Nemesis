/**
 * @brief The purpose of this file is to provide a schema for Mongoose. The schema will
 * be a blueprint for how the data should be saved to the database. This schema is specifically
 * for the playerprofiles collection.
 */

import mongoose from "mongoose";

// Schema for individual champion enemy stats
const championEnemyStatsSchema = new mongoose.Schema({
    champName: {
        type: String,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    encounters: {
        type: Number,
        required: true
    },
    lossRate: {
        type: Number,
        required: true
    }
}, { _id: false });

// Schema for individual champion user stats
const championUserStatsSchema = new mongoose.Schema({
    champName: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    picks: {
        type: Number,
        required: true
    },
    winRate: {
        type: Number,
        required: true
    }
}, { _id: false });

// Schema for role-based enemy statistics
const roleEnemyStatsSchema = new mongoose.Schema({
    overall: {
        type: [championEnemyStatsSchema],
        default: []
    },
    top: {
        type: [championEnemyStatsSchema],
        default: []
    },
    jng: {
        type: [championEnemyStatsSchema],
        default: []
    },
    mid: {
        type: [championEnemyStatsSchema],
        default: []
    },
    bot: {
        type: [championEnemyStatsSchema],
        default: []
    },
    sup: {
        type: [championEnemyStatsSchema],
        default: []
    }
}, { _id: false });

// Schema for role-based user statistics
const roleUserStatsSchema = new mongoose.Schema({
    overall: {
        type: [championUserStatsSchema],
        default: []
    },
    top: {
        type: [championUserStatsSchema],
        default: []
    },
    jng: {
        type: [championUserStatsSchema],
        default: []
    },
    mid: {
        type: [championUserStatsSchema],
        default: []
    },
    bot: {
        type: [championUserStatsSchema],
        default: []
    },
    sup: {
        type: [championUserStatsSchema],
        default: []
    }
}, { _id: false });

// Schema for game mode enemy statistics
const gameModeEnemySchema = new mongoose.Schema({
    normals: roleEnemyStatsSchema,
    ranked: roleEnemyStatsSchema,
    flex: roleEnemyStatsSchema,
    all: roleEnemyStatsSchema,
    aram: {
        type: [championEnemyStatsSchema],
        default: []
    }
}, { _id: false });

// Schema for game mode user statistics
const gameModeUserSchema = new mongoose.Schema({
    normals: roleUserStatsSchema,
    ranked: roleUserStatsSchema,
    flex: roleUserStatsSchema,
    all: roleUserStatsSchema,
    aram: {
        type: [championUserStatsSchema],
        default: []
    }
}, { _id: false });

// Schema for counting the number of overall games and losses
const numberOfGames = new mongoose.Schema({
    totalGames: {
        type: Number,
        required: true
    },
    normals: {
        type: Number,
        required: true
    },
    aram: {
        type: Number,
        required: true
    },
    flex: {
        type: Number,
        required: true
    },
    ranked: {
        type: Number,
        required: true
    },
    totalLosses: {
        type: Number,
        required: true
    },
}, { _id: false });

// Top level object that holds all user data to be saved to DB
const summonerSchema = new mongoose.Schema({
    summonerName: {
        type: String,
        required: true
    },
    PUUID: {
        type: String,
        required: true
    },
    lastGameTimestamp: {
        type: Number,
        required: true
    },
    numberOfGames: numberOfGames,
    enemyStats: gameModeEnemySchema,
    userStats: gameModeUserSchema,
}, {
    timestamps: true
});

// summonerprofiles is the name of the collection in the database
// as collections are the lowercased plural form of what we call it
export const SummonerProfile = mongoose.model('Summonered', summonerSchema);