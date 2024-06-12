"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user_controllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/delete-my-profile').delete(auth_1.ensureAuth, user_controllers_1.deleteMyProfile);
router.route('/delete-users').delete(user_controllers_1.deleteUsers);
exports.default = router;
