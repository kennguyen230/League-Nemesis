import mongoose from "mongoose";

const matchyHistorySchema = mongoose.Schema(
    {

    }
)

export const MatchHistory = mongoose.model('MatchHistory', matchyHistorySchema);