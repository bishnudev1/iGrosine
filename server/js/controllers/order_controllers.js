// const { Order } = require("../models/Order");
// const { razorpayInstance } = require("../server.js");
const Razorpay = require('razorpay');
const crypto =require('crypto')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const Order = require('../models/Order');
// const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Import the Admin model


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

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


exports.updateOrderStatus = async (req, res) => {
    try {
        const { buyerId, status, item } = req.body;

        console.log(buyerId);

        console.log("Calling updateOrderStatus");

        console.log("item",item);

        // Validate input fields
        if (!buyerId || !status || !item) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const orders = await Order.find({
            buyerId
        });

        const order = orders[0];

        console.log("order",order);

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

        const user = await User.findOne({email:item.buyerEmail}); // Assuming buyerId is present in the item object

// console.log(users);

// const user = users[0];

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userOrder = user.orders.find(order => order.buyerId.toString() === buyerId.toString());
        if (userOrder) {
            console.log("userOrder",userOrder);
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
}

exports.removeOrders = async (req, res) => {
    try {
        const orders = await Order.deleteMany();

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

// exports.loginAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         console.log(email,password);

//         // Check if the provided email exists in the database
//         const admin = await Admin.findOne({ email });

//         if (!admin) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid email or password"
//             });
//         }

//         // Compare the provided password with the hashed password stored in the database

//         console.log(admin.password);
//         const passwordMatch = await bcrypt.compare(password, admin.password);

//         if (!passwordMatch) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid email or password"
//             });
//         }

//         // If email and password are correct, generate JWT token
//         const token = jwt.sign({ id: admin._id }, "process.env.JWT_SECRET", {
//             expiresIn: '1h' // Token expires in 1 hour
//         });

//         // Set the token in a cookie
//         res.cookie('adminToken', token, { 
//             httpOnly: true, // Cookie is only accessible via HTTP(S) and not JavaScript
//             expires: new Date(Date.now() + 3600000) // Cookie expires in 1 hour (3600000 milliseconds)
//         });

//         // Send the token in the response
//         res.status(200).json({
//             success: true,
//             message: "Login successful",
//             token:token
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// };


// exports.getAdmin = async (req, res) => {
//     try {

//         const admin = await Admin.findById(req.admin.id);

//         console.log(req.admin.id);

//         // Return the admin information in the response
//         res.status(200).json({
//             success: true,
//             data: admin
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// }




// exports.signupAdmin = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if the email already exists in the database
//         const existingAdmin = await Admin.findOne({ email });

//         if (existingAdmin) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email already exists"
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new admin
//         const newAdmin = new Admin({
//             name,
//             email,
//             password: hashedPassword
//         });

//         // Save the new admin to the database
//         await newAdmin.save();

//         // Generate JWT token
//         const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, "process.env.JWT_SECRET", {
//             expiresIn: '1h' // Token expires in 1 hour
//         });

//         // Send the token in the response
//         res.status(201).json({
//             success: true,
//             message: "Signup successful",
//             token
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// };


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
        const user = await User.findById("665b408d8d3bb344da20cbc2");
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
        user.orders[orderIndex].isCancelled = true;
        user.orders[orderIndex].deliveredDate = user.orders[orderIndex].orderedType === "online" ?  "You'll get 50% money within 5-7 days." : "Thanks for choosing us.";

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
        const { price, itemName,itemImage,buyerId, buyerName, buyerEmail,itemId,number,city,state,realPrice,off, reviews, seller,desc } = req.body;

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
            buyerId,
            orderedType:"online",
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,state,realPrice,off, reviews, seller,desc 
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

exports.orderItemByCartsCOD = async (req, res) => {
    try {
        const { price, itemName,itemImage,buyerId, buyerName, buyerEmail,itemId,number,city,state,realPrice,off, reviews, seller,desc  } = req.body;

        console.log(realPrice);

        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: Number(price)+99,
            itemName,
            itemImage,
            buyerId,
            orderedType:"cod",
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,state,
            realPrice,off, reviews, seller,desc 
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
    `,buyerEmail );

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
    }finally{
        const user = await User.findById(req.user._id);
        user.carts = [];
        await user.save();
    }
};


exports.orderItemCOD = async (req, res) => {
    try {
        const { price, itemName,itemImage,buyerId, buyerName, buyerEmail,itemId,number,city,state,realPrice,off, reviews, seller,desc  } = req.body;

        console.log(buyerName);

        console.log(typeof price);
        console.log(price);

        console.log(Number(price) + Number(99));


        // Create and save the order using the Order model
        const myOrder = await Order.create({
            itemPrice: Number(price)+99,
            itemName,
            itemImage,
            buyerId,
            orderedType:"cod",
            buyerName,
            buyerEmail,
            itemId,
            number,
            city,state,realPrice,off, reviews, seller,desc 
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



exports.orderItem = async (req, res) => {
    try {
        const { price, itemName,itemImage,buyerId, buyerName, buyerEmail,itemId,number,city,state,realPrice,off, reviews, seller,desc  } = req.body;

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
            buyerId,
            orderedType:"online",
            buyerName,
            buyerEmail,
            itemId,
            number,
            realPrice,off, reviews, seller,
            city,state,desc 
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
const Item = require('../models/Item');

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


const mongoose = require('mongoose');

exports.reviewOrder = async (req, res) => {
    try {
        const { orderId, desc, buyerName, reviewDate } = req.body;

        console.log(buyerName);

        // Check if orderId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid orderId"
            });
        }

        // Create and save the order using the Order model
        const myOrder = await Item.findById(orderId);

        if (!myOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const newReview = {
            buyerName: buyerName,
            reviewDate: reviewDate,
            desc: desc
        };

        myOrder.reviews.push(newReview);

        myOrder.markModified("reviews");
        await myOrder.save();

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

