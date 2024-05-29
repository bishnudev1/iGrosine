const express = require('express');
const {ensureAuth, ensureGuest} = require("../middleware/auth");
const { orderItem, verifyPayment,getMyOrders, makeEmptyOrders, cancelOrder, addToCart, removeFromCart, getMyCarts, makeEmptyCarts, orderItemByCarts } = require('../controllers/order_controllers');

const router = express.Router();

router.route('/get-my-orders').get(ensureAuth, getMyOrders);

router.route('/order-item').post(ensureAuth, orderItem);


router.route('/order-item-cart').post(ensureAuth, orderItemByCarts);

router.route('/verify-payment').post(ensureAuth, verifyPayment);

router.route('/make-empty').post(makeEmptyCarts);

router.route('/cancel-order').post(ensureAuth, cancelOrder);

router.route('/add-to-cart').post(ensureAuth, addToCart);

router.route('/remove-cart').post(ensureAuth, removeFromCart);

router.route('/get-my-carts').get(ensureAuth, getMyCarts);

module.exports = router;