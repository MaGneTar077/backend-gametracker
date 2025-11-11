import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    author: { type: String, default: "Anónimo" },
    text: { type: String, required: true },
    stars: { type: Number, min: 0, max: 5, default: 0 },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Review", reviewSchema);