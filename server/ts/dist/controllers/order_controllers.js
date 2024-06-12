"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewOrder = exports.removeFromCart = exports.getMyCarts = exports.addToCart = exports.verifyPayment = exports.orderItem = exports.orderItemCOD = exports.orderItemByCartsCOD = exports.orderItemByCarts = exports.cancelOrder = exports.makeEmptyCarts = exports.makeEmptyOrders = exports.getMyOrders = exports.removeOrders = exports.updateOrderStatus = exports.getAllOrders = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const sendEmail_1 = require("../utils/sendEmail");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.getAllOrders = getAllOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerId, status, item } = req.body;
        console.log(buyerId);
        console.log("Calling updateOrderStatus");
        console.log("item", item);
        // Validate input fields
        if (!buyerId || !status || !item) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }
        const orders = yield Order_1.default.find({ buyerId });
        const order = orders[0];
        console.log("order", order);
        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
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
                res.status(400).json({ success: false, message: "Invalid status" });
                return;
        }
        yield order.save();
        console.log(item.buyerEmail);
        const user = yield User_1.default.findOne({ email: item.buyerEmail });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const userOrder = user.orders.find(order => order.buyerId.toString() === buyerId.toString());
        if (userOrder) {
            console.log("userOrder", userOrder);
            userOrder.status = order.status;
            userOrder.isDelivered = status === "Delivered" ? true : false;
            user.markModified('orders');
            yield user.save();
        }
        // Send email notification
        (0, sendEmail_1.sendEmail)(`Delivery update - iGrosine`, `<p>Dear ${item.buyerName},</p>
            <img src="${item.itemImage}" alt="Shopping Image" style="height: 300px;" />
            <p>Your order for ${item.itemName} has been ${status} successfully by our team at ${currentDate}.</p>`, item.buyerEmail);
        res.status(200).json({
            success: true,
            data: order
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const removeOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.deleteMany();
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.removeOrders = removeOrders;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id);
        const orders = user.orders;
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.getMyOrders = getMyOrders;
const makeEmptyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById("665b408d8d3bb344da20cbc2");
        user.orders = [];
        yield user.save();
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.makeEmptyOrders = makeEmptyOrders;
const makeEmptyCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id);
        user.carts = [];
        yield user.save();
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.makeEmptyCarts = makeEmptyCarts;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id);
        const { orderId } = req.body;
        // Find the order by its ID in the user's orders array
        const orderIndex = user.orders.findIndex(order => order._id.toString() === orderId);
        if (orderIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Order not found"
            });
            return;
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
        yield user.save();
        (0, sendEmail_1.sendEmail)('Order Cancellation Confirmation - iGrosine', `
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.cancelOrder = cancelOrder;
const orderItemByCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;
        const razorpayInstance = new razorpay_1.default({
            key_id: 'rzp_test_NH7DutCORAH6gm',
            key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs'
        });
        const order = yield razorpayInstance.orders.create({
            amount: Number(price) * 100,
            currency: "INR"
        });
        // Create and save the order using the Order model
        const myOrder = yield Order_1.default.create({
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
        const user = yield User_1.default.findById(req.user._id);
        user.orders.push(myOrder);
        yield user.save();
        (0, sendEmail_1.sendEmail)('Order Confirmation - iGrosine', `
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
    finally {
        const user = yield User_1.default.findById(req.user._id);
        user.carts = [];
        yield user.save();
    }
});
exports.orderItemByCarts = orderItemByCarts;
const orderItemByCartsCOD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;
        // Create and save the order using the Order model
        const myOrder = yield Order_1.default.create({
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
        const user = yield User_1.default.findById(req.user._id);
        user.orders.push(myOrder);
        yield user.save();
        (0, sendEmail_1.sendEmail)('Order Confirmation - iGrosine', `
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
    finally {
        const user = yield User_1.default.findById(req.user._id);
        user.carts = [];
        yield user.save();
    }
});
exports.orderItemByCartsCOD = orderItemByCartsCOD;
const orderItemCOD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;
        // Create and save the order using the Order model
        const myOrder = yield Order_1.default.create({
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
        const user = yield User_1.default.findById(req.user._id);
        user.orders.push(myOrder);
        yield user.save();
        (0, sendEmail_1.sendEmail)('Order Confirmation - iGrosine', `
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.orderItemCOD = orderItemCOD;
const orderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, itemName, itemImage, buyerId, buyerName, buyerEmail, itemId, number, city, state, realPrice, off, reviews, seller, desc } = req.body;
        const razorpayInstance = new razorpay_1.default({
            key_id: 'rzp_test_NH7DutCORAH6gm',
            key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs'
        });
        const order = yield razorpayInstance.orders.create({
            amount: Number(price) * 100,
            currency: "INR"
        });
        // Create and save the order using the Order model
        const myOrder = yield Order_1.default.create({
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
        const user = yield User_1.default.findById(req.user._id);
        user.orders.push(myOrder);
        yield user.save();
        (0, sendEmail_1.sendEmail)('Order Confirmation - iGrosine', `
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.orderItem = orderItem;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    var expectedSignature = crypto_1.default.createHmac('sha256', "ON7sNQcvMc1YaNXdBFjd4wTs")
        .update(body.toString())
        .digest('hex');
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        res.redirect(`http://localhost:3000/order-success?reference=${razorpay_payment_id}`);
    }
    else {
        res.status(404).json({
            success: false,
            message: "We couldn't verify your order."
        });
        return;
    }
});
exports.verifyPayment = verifyPayment;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item } = req.body;
        const user = yield User_1.default.findById(req.user._id);
        user.carts.push(item);
        const carts = user.carts;
        yield user.save();
        res.status(201).json({
            success: true,
            data: carts
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.addToCart = addToCart;
const getMyCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id);
        const carts = user.carts;
        res.status(200).json({
            success: true,
            data: carts
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.getMyCarts = getMyCarts;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id);
        const { id } = req.body;
        user.carts = user.carts.filter(cartItem => cartItem.id !== id);
        yield user.save();
        const carts = user.carts;
        res.status(200).json({
            success: true,
            data: carts
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.removeFromCart = removeFromCart;
const reviewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, rating, feedback } = req.body;
        const user = yield User_1.default.findById(req.user._id);
        const orders = user.orders;
        // Find the order by ID
        const orderIndex = orders.findIndex(order => order._id.toString() === orderId);
        if (orderIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Order not found"
            });
            return;
        }
        const review = {
            rating,
            feedback
        };
        // Ensure the order has a reviews array and push the review
        orders[orderIndex].reviews.push(review);
        user.markModified('orders');
        yield user.save();
        res.status(200).json({
            success: true,
            message: "Review submitted successfully"
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
});
exports.reviewOrder = reviewOrder;
