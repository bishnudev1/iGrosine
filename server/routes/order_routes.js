const express = require('express');
const {ensureAuth, ensureGuest} = require("../middleware/auth");
const { orderItem, verifyPayment,getMyOrders, makeEmptyOrders, cancelOrder } = require('../controllers/order_controllers');

const router = express.Router();

router.route('/get-my-orders').get(ensureAuth, getMyOrders);

router.route('/order-item').post(ensureAuth, orderItem);
router.route('/verify-payment').post(ensureAuth, verifyPayment);

router.route('/make-empty').post(makeEmptyOrders);

router.route('/cancel-order').post(ensureAuth, cancelOrder);

module.exports = router;