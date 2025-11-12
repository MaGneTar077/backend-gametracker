import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";        

const router = express.Router();    

router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

        user.isCorrectPassword(password, (err, same) => {
            if (err) return res.status(500).json({ message: "Error del servidor" });
            if (!same) return res.status(401).json({ message: "Credenciales inválidas" });

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET || "secretKeyLiz",
                { expiresIn: "2h" }
            );

            return res.status(200).json({
                message: "Inicio de sesión exitoso",
                token,
                user: { id: user._id, email: user.email }
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;