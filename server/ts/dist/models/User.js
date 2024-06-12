"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    // _id: {
    //     type: String,
    //     required: true,
    // },
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    carts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Cart',
        },
    ],
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
