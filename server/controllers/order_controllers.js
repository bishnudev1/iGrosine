const Order = require('../models/Order');


module.exports.getAllOrders = (req, res) => {
    try {
        
        Order.find({}, (error, orders) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(200).json({ orders });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};