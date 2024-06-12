"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
router.get('/google', (0, cors_1.default)(), passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: 'http://localhost:3000/' }), (req, res) => {
    res.redirect('http://localhost:3000/profile');
});
router.get('/logout', (0, cors_1.default)(), (req, res) => {
    req.logout((err) => {
        if (err) {
            // Handle any errors that may occur during the logout process
            console.error(err);
        }
        res.redirect('http://localhost:3000/');
    });
});
exports.default = router;
