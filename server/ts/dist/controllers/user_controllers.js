"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMyProfile = exports.deleteUsers = void 0;
const User_1 = __importDefault(require("../models/User")); // Import the User model
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.deleteMany();
        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User profiles deleted successfully"
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.deleteUsers = deleteUsers;
const deleteMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user ID from request parameters or authentication token
        const userId = req.user._id; // Adjust this based on your authentication logic
        // Delete the user from the database
        const deletedUser = yield User_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }
        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User profile deleted successfully",
            data: deletedUser // You can omit this if you don't want to send the deleted user data back
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.deleteMyProfile = deleteMyProfile;
