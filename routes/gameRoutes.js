import express from "express";
import Game from "../models/gameModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Trae solo los juegos del usuario autenticado
router.get("/", auth, async (req, res) => {
    const games = await Game.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(games);
});

// ✅ Crea un juego para ese usuario
router.post("/", auth, async (req, res) => {
    const game = new Game({
        ...req.body,
        userId: req.user.id,
    });
    await game.save();
    res.status(201).json(game);
});

// ✅ Actualiza solo juegos del usuario autenticado
router.put("/:id", auth, async (req, res) => {
    const game = await Game.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
    );
    res.json(game);
});

// ✅ Elimina solo juegos del usuario autenticado
router.delete("/:id", auth, async (req, res) => {
    await Game.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Juego eliminado" });
});

export default router;
