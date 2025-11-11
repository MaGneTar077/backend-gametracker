import express from "express";
import Game from "../models/gameModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
});

router.post("/", async (req, res) => {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
});

router.put("/:id", async (req, res) => {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(game);
});

router.delete("/:id", async (req, res) => {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Juego eliminado" });
});


export default router;