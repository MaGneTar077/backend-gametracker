import express from "express";
import Review from "../models/reviewModel.js";


const router = express.Router();

router.get("/game/:gameId", async (req, res) => {
    const reviews = await Review.find({ gameId: req.params.gameId }).sort({ createdAt: -1 });
    res.json(reviews);
});


router.post("/", async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
});


router.delete("/:id", async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Reseña eliminada" });
});


export default router;