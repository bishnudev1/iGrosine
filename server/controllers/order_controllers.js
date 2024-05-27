const { Order } = require("../models/Order");
// const { razorpayInstance } = require("../server.js");
const Razorpay = require('razorpay');
const crypto =require('crypto')


exports.orderItem = async (req,res) => {
    try {
        const {price} = req.body;

        const razorpayInstance = new Razorpay({
            key_id: 'rzp_test_NH7DutCORAH6gm',
            key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs'
        });

        const order = await razorpayInstance.orders.create({
            amount: Number((price) * 80 * 100),
            currency: "INR"
        });

        res.status(200).json({
            success: true,
            order: order
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            messsage: error.message
        });
    }
}

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