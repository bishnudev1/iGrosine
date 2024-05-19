const express = require('express');
const {ensureAuth, ensureGuest} = require("../middleware/auth");
const { orderItem, verifyPayment } = require('../controllers/order_controllers');

const router = express.Router();

router.route('/order-item').post(ensureAuth, orderItem);
router.route('/verify-payment').post(ensureAuth, verifyPayment);

module.exports = router;