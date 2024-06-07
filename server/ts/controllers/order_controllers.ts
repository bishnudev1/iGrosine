import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User';
import Order from '../models/Order';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import Item from '../models/Item';
import { sendEmail } from '../utils/sendEmail';

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { buyerId, status, item } = req.body;

        console.log(buyerId);
        console.log("Calling updateOrderStatus");
        console.log("item", item);

        // Validate input fields
        if (!buyerId || !status || !item) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const orders = await Order.find({ buyerId });

        const order = orders[0];

        console.log("order", order);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const currentDate = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Update order status based on the provided status
        switch (status) {
            case "Shipped":
                order.status = `Your item is shipped at ${currentDate}`;
                break;
            case "Out of Delivery":
                order.status = `Your item is out for delivery at ${currentDate}`;
                break;
            case "Delivered":
                order.status = `Your item is delivered successfully at ${currentDate}`;
                order.isDelivered = true;
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid status" });
        }

        await order.save();

        console.log(item.buyerEmail);

        const user = await User.findOne({ email: item.buyerEmail });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userOrder = user.orders.find(order => order.buyerId.toString() === buyerId.toString());
        if (userOrder) {
            console.log("userOrder", userOrder);
            userOrder.status = order.status;
            userOrder.isDelivered = status === "Delivered" ? true : false;
            user.markModified('orders');
            await user.save();
        }

        // Send email notification
        sendEmail(`Delivery update - iGrosine`,
            `<p>Dear ${item.buyerName},</p>
            <img src="${item.itemImage}" alt="Shopping Image" style="height: 300px;" />
            <p>Your order for ${item.itemName} has been ${status} successfully by our team at ${currentDate}.</p>`,
            item.buyerEmail
        );

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const removeOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.deleteMany();

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id);
        const orders = user.orders;
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const makeEmptyOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById("665b408d8d3bb344da20cbc2");
        user.orders = [];
        await user.save();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const makeEmptyCarts = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id);
        user.carts = [];
        await user.save();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id);
        const { orderId } = req.body;

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
        user.orders[orderIndex].isCancelled = true;
        user.orders[orderIndex].deliveredDate = user.orders[orderIndex].orderedType === "online" ? "You'll get 50% money within 5-7 days." : "Thanks for choosing us.";

        // Mark the 'orders' array as modified
        user.markModified('orders');

        // Save the updated user document
        await user.save();

        sendEmail('Order Cancellation Confirmation - iGrosine', `
        <p>Dear ${user.displayName},</p>
        <img src="${user.orders[orderIndex].itemImage}" alt="Shopping Image" style="height: 300px;" />
        <p>Your order for ${user.orders[orderIndex].itemName} has been cancelled successfully by you at ${currentDate}.</p>
        <p>You'll get 50% money within 5-7 days.</p>
        <p>Thank you for considering us!</p>
    `, user.email);

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const orderItemByCarts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;

        const razorpayInstance = new Razorpay({
            key_id: 'rzp_test_NH7DutCORAH6gm',
            key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs'
        });

        const order = await razorpayInstance.orders.create({
            amount: Number(price) * 100,
            currency: "INR"
        });

        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: price,
            itemName,
            itemImage,
            buyerId,
            orderedType: "online",
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,
            state,
            realPrice,
            off,
            reviews,
            seller,
            desc
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save();

        sendEmail('Order Confirmation - iGrosine', `
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
    } finally {
        const user = await User.findById(req.user._id);
        user.carts = [];
        await user.save();
    }
};

export const orderItemByCartsCOD = async (req: Request, res: Response): Promise<void> => {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;

        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: Number(price) + 99,
            itemName,
            itemImage,
            buyerId,
            orderedType: "cod",
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,
            state,
            realPrice,
            off,
            reviews,
            seller,
            desc
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save();

        sendEmail('Order Confirmation - iGrosine', `
        <p>Dear ${buyerName},</p>
        <img src="${itemImage}" alt="Shopping Image" style="height: 300px;" />
        <p>Your order for ${itemName} has been placed successfully.</p>
        <p>Thank you for shopping with us!</p>
        <p>You can cancel the order within 24 hours, but only 50% of the amount will be refunded.</p>
    `, buyerEmail);

        res.status(200).json({
            success: true,
            myOrder
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    } finally {
        const user = await User.findById(req.user._id);
        user.carts = [];
        await user.save();
    }
};

export const orderItemCOD = async (req: Request, res: Response): Promise<void> => {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;

        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: Number(price) + 99,
            itemName,
            itemImage,
            buyerId,
            orderedType: "cod",
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,
            state,
            realPrice,
            off,
            reviews,
            seller,
            desc
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save();

        sendEmail('Order Confirmation - iGrosine', `
        <p>Dear ${buyerName},</p>
        <img src="${itemImage}" alt="Shopping Image" style="height: 300px;" />
        <p>Your order for ${itemName} has been placed successfully.</p>
        <p>Thank you for shopping with us!</p>
        <p>You can cancel the order within 24 hours, but only 50% of the amount will be refunded.</p>
    `, buyerEmail);

        res.status(200).json({
            success: true,
            myOrder
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const orderItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;

        const razorpayInstance = new Razorpay({
            key_id: 'rzp_test_NH7DutCORAH6gm',
            key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs'
        });

        const order = await razorpayInstance.orders.create({
            amount: Number(price) * 100,
            currency: "INR"
        });

        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: price,
            itemName,
            itemImage,
            buyerId,
            orderedType: "online",
            buyerName,
            buyerEmail,
            itemId,
            number,
            realPrice,
            off,
            reviews,
            seller,
            city,
            state,
            desc
        });

        // Retrieve the user based on the authenticated user's ID
        const user = await User.findById(req.user._id);

        user.orders.push(myOrder);

        await user.save();

        sendEmail('Order Confirmation - iGrosine', `
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

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', "ON7sNQcvMc1YaNXdBFjd4wTs")
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        res.redirect(`http://localhost:3000/order-success?reference=${razorpay_payment_id}`);
    } else {
        return res.status(404).json({
            success: false,
            message: "We couldn't verify your order."
        });
    }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { item } = req.body;

        const user = await User.findById(req.user._id);
        user.carts.push(item);

        const carts = user.carts;

        await user.save();

        res.status(201).json({
            success: true,
            data: carts
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const getMyCarts = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id);
        const carts = user.carts;
        res.status(200).json({
            success: true,
            data: carts
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id);
        const { id } = req.body;

        user.carts = user.carts.filter(cartItem => cartItem.id !== id);

        await user.save();

        const carts = user.carts;

        res.status(200).json({
            success: true,
            data: carts
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export const reviewOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId, rating, feedback } = req.body;

        const user = await User.findById(req.user._id);

        const orderIndex = user.orders.findIndex(order => order._id.toString() === orderId);

        if (orderIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        user.orders[orderIndex].reviews = {
            rating,
            feedback
        };

        user.markModified('orders');

        await user.save();

        res.status(200).json({
            success: true,
            message: "Review submitted successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};