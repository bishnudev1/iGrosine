// const { Order } = require("../models/Order");
// const { razorpayInstance } = require("../server.js");
const Razorpay = require('razorpay');
const crypto =require('crypto')

const Order = require('../models/Order');
// const User = require('../models/User');

exports.getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const orders = user.orders;
        // console.log(`orders`,orders);
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

exports.makeEmptyOrders = async (req, res) => {
    try {
        const user = await User.findById("653fcba5adb8838ece0d6cea");
        user.orders = [];
        await user.save();
        res.status(200).json({
            success: true,
            data:user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

exports.makeEmptyCarts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.carts = [];
        await user.save();
        res.status(200).json({
            success: true,
            data:user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { orderId } = req.body; // Assuming orderId is passed in the request parameters

        // Find the order by its ID in the user's orders array
        const orderIndex = user.orders.findIndex(order => order._id.toString() === orderId);
        if (orderIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Update the status of the order to "Cancelled by you"
        const currentDate = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        user.orders[orderIndex].status = `Cancelled by you on ${currentDate}`;
        user.orders[orderIndex].deliveredDate = "You'll get 50% money within 5-7 days.";

        // Mark the 'orders' array as modified
        user.markModified('orders');

        // Save the updated user document
        await user.save();

        console.log(`user order ${user}`);

        sendEmail('Order Cancellation Confirmation - iGrosine',`
        <p>Dear ${user.displayName},</p>
        <img src="${user.orders[orderIndex].itemImage}" alt="Shopping Image" style="height: 300px;" />
        <p>Your order for ${user.orders[orderIndex].itemName} has been cancelled successfully by you at ${currentDate}.</p>
        <p>You'll get 50% money within 5-7 days.</p>
        <p>Thank you for considering us!</p>
    `,user.email)

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            // data: user // You can send the updated user data if needed
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

exports.orderItemByCarts = async (req, res) => {
    try {
        const { price, itemName,itemImage, buyerName, buyerEmail,itemId,number,city,state } = req.body;

        console.log(buyerName);

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
            itemImage,
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,state,
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save()

        console.log(`req.user._id$`,order);

        sendEmail('Order Confirmation - iGrosine',`
        <p>Dear ${buyerName},</p>
        <img src="${itemImage}" alt="Shopping Image" style="height: 300px;" />
        <p>Your order for ${itemName} has been placed successfully.</p>
        <p>Thank you for shopping with us!</p>
        <p>You can cancel the order within 24 hours, but only 50% of the amount will be refunded.</p>
    `,buyerEmail );

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
    }finally{
        const user = await User.findById(req.user._id);
        user.carts = [];
        await user.save();
    }
};




exports.orderItem = async (req, res) => {
    try {
        const { price, itemName,itemImage, buyerName, buyerEmail,itemId,number,city,state } = req.body;

        console.log(buyerName);

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
            itemImage,
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,state,
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save()

        // console.log(`req.user._id$`,order);

        sendEmail('Order Confirmation - iGrosine',`
        <p>Dear ${buyerName},</p>
        <img src="${itemImage}" alt="Shopping Image" style="height: 300px;" />
        <p>Your order for ${itemName} has been placed successfully.</p>
        <p>Thank you for shopping with us!</p>
        <p>You can cancel the order within 24 hours, but only 50% of the amount will be refunded.</p>
    `, buyerEmail);

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


exports.addToCart = async(req,res) => {
    try {
        const {item} = req.body;

        const user = await User.findById(req.user._id);
        user.carts.push(item);

        const carts = user.carts;
    
        await user.save()
    
        res.status(201).json({
            success:true,
            data: carts
        })
    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

exports.getMyCarts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const carts = user.carts;
        // console.log(`orders`,orders);
        res.status(200).json({
            success: true,
            data:carts
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

const User = require('../models/User'); // Import the User model if it's not already imported
const { sendEmail } = require('../utils/sendEmail');

exports.removeFromCart = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.user._id);

        // Extract the id of the item to be removed from the request body
        const { id } = req.body;

        // Filter out the item with the specified ID from the user's carts
        user.carts = user.carts.filter(cartItem => cartItem.id !== id);

        // Save the updated user object
        await user.save();

        const carts = user.carts;

        // Respond with success status and updated cart data
        res.status(200).json({
            success: true,
            data: carts // Assuming you want to return the updated cart items
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}
