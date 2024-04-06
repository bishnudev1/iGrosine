const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: {
      type: String,
      required: true,
    },
    productName: {
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
    productImage: {
      type: String,
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
  })

const Order =  mongoose.model('Order', OrderSchema);

module.exports = Order;