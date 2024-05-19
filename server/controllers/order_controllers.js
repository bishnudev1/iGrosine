import { Order } from "../models/Order";


export const orderItem = async (req,res) => {
    try {
        const {item, amount} = req.body;

        const order = await razorpayInstance.orders.create({
            amount: Number((amount * item) * 80 * 100),
            currency: "INR"
        });

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            messsage: "Internal Server Error !"
        });
    }
}

export const verifyPayment = async(req,res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        await Order.create({
            buyerName: user.name, buyerEmail: user.email, razorpay_order_id, razorpay_payment_id, razorpay_signature
        });
        res.redirect(`http://localhost:3000/order-successful?reference=${razorpay_payment_id}`);
    }
    else{
        return res.status(404).json({
            success: false,
            message: "We couldn't verify your order."
        });
    }
}