import mongoose from "mongoose";

const summonerSchema = mongoose.Schema(
    {
        summonerName: {
            type: String,
            required: true
        },
        PUUID: {
            type: Number,
            required: true
        },
        lossRateMap: {
            type: Map,
            of: new mongoose.Schema({
                losses: String,
                totalGames: Number,
                lossPercent: Number
            }),
            required: true
        },
        totalLossMap: {
            type: Map,
            of: new mongoose.Schema({
                losses: String,
                totalGames: Number,
                lossPercent: Number
            }),
            required: true
        },
        lastGameTimestamp: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const SummonerProfile = mongoose.model('SummonerProfile', summonerSchema);