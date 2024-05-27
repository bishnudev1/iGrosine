const express = require('express');
const {ensureAuth, ensureGuest} = require("../middleware/auth");
const { orderItem, verifyPayment,getMyOrders } = require('../controllers/order_controllers');

const router = express.Router();

router.route('/get-my-orders').get(ensureAuth, getMyOrders);

router.route('/order-item').post(ensureAuth, orderItem);
router.route('/verify-payment').post(ensureAuth, verifyPayment);

module.exports = router;