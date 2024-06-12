"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    itemId: {
        type: String,
        required: true,
    },
    itemName: {
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
    // reviews: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Review',
    //         default: [],
    //     },
    // ],
    seller: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    buyerName: {
        type: String,
        required: true,
    },
    buyerEmail: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Your item will be shipped soon.',
    },
    orderedType: {
        type: String,
        required: true,
    },
    reviews: [
        {
            rating: { type: Number, required: true },
            feedback: { type: String, required: true },
        },
    ],
    orderedDate: {
        type: Date,
        default: Date.now,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
    deliveredDate: {
        type: String,
        default: `Will be delivered by ${new Date().toDateString()}`,
    },
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
