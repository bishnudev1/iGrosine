"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
router.get('/', auth_1.ensureGuest, (req, res) => {
    res.status(404).json({
        message: "You're not signed in..."
    });
});
router.get('/log', auth_1.ensureAuth, (req, res) => {
    res.status(201).json({
        message: "Welcome Back",
        data: req.user
    });
});
exports.default = router;
