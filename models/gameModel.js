import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    platform: { type: String },
    coverUrl: { type: String },
    completed: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    hoursPlayed: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Game", gameSchema);