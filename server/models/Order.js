const mongoose = require('mongoose');

const today = new Date();
const deliveryDate = new Date(today);
const randomDeliveryDays = Math.floor(Math.random() * 3) + 3; // Generates a random number between 3 and 5
deliveryDate.setDate(deliveryDate.getDate() + randomDeliveryDays);

const orderSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    buyerEmail: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Your item will be shipped soon."
    },
    orderedDate: {
        type: Date,
        default: Date.now()
    },
    deliveredDate: {
        type: String,
        default: `Will be delivered by ${deliveryDate.toDateString()}`
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
