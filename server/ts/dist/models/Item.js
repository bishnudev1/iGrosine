"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    realPrice: {
        type: String,
        required: true,
    },
    off: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
            default: [],
        },
    ],
});
const Item = (0, mongoose_1.model)('Item', itemSchema);
exports.default = Item;
