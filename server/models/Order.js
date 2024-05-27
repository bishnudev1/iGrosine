const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    buyerName: {
        type: String,
        required: true
    },

    buyerEmail: {
        type: String,
        required: true
    },

    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    }
});

module.export = Order = new mongoose.model('Orders', orderSchema);