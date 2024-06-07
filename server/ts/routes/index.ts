import express from 'express';
const router = express.Router();
import { ensureAuth, ensureGuest } from '../middleware/auth';

router.get('/', ensureGuest, (req, res) => {
    res.status(404).json({
        message: "You're not signed in..."
    });
});

router.get('/log', ensureAuth, (req, res) => {
    res.status(201).json({
        message: "Welcome Back",
        data: req.user
    });
});

export default router;
