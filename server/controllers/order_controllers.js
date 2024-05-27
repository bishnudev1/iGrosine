// const { Order } = require("../models/Order");
// const { razorpayInstance } = require("../server.js");
const Razorpay = require('razorpay');
const crypto =require('crypto')

const Order = require('../models/Order');
const User = require('../models/User');

exports.getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const orders = user.orders;
        console.log(`orders`,orders);
        res.status(200).json({
            success: true,
            data:orders
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}


exports.orderItem = async (req, res) => {
    try {
        const { price, itemName, buyerName, buyerEmail,itemId,number,city,state } = req.body;

        const razorpayInstance = new Razorpay({
            key_id: 'rzp_test_NH7DutCORAH6gm',
            key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs'
        });

        const order = await razorpayInstance.orders.create({
            amount: Number((price) * 100),
            currency: "INR"
        });

        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: price,
            itemName,
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,state
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save()

        console.log(`req.user._id${req.user._id}`);

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};


exports.verifyPayment = async(req,res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', "ON7sNQcvMc1YaNXdBFjd4wTs")
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        // await Order.create({
        //     buyerName: user.name, buyerEmail: user.email, razorpay_order_id, razorpay_payment_id, razorpay_signature
        // });
        res.redirect(`http://localhost:3000/order-success?reference=${razorpay_payment_id}`);
    }
    else{
        return res.status(404).json({
            success: false,
            message: "We couldn't verify your order."
        });
    }
}