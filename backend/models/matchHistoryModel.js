import mongoose from "mongoose";

const matchyHistorySchema = mongoose.Schema(
    {
        summoner: {
            type: String,
            required: true
        },
        summonerPUUID: {
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

export const MatchHistory = mongoose.model('MatchHistory', matchyHistorySchema);