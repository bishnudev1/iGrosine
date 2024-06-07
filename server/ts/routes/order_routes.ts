import express from 'express';
import { ensureAuth, ensureGuest } from '../middleware/auth';
import {
    orderItem,
    verifyPayment,
    getMyOrders,
    makeEmptyOrders,
    cancelOrder,
    addToCart,
    removeFromCart,
    getMyCarts,
    makeEmptyCarts,
    orderItemByCarts,
    getAllOrders,
    removeOrders,
    updateOrderStatus,
    orderItemCOD,
    orderItemByCartsCOD,
    reviewOrder
} from '../controllers/order_controllers';
import extractAdminFromCookie from '../middleware/adminAuth';

const router = express.Router();

router.route('/get-my-orders').get(ensureAuth, getMyOrders);

router.route('/order-item').post(ensureAuth, orderItem);

router.route('/order-item-cod').post(ensureAuth, orderItemCOD);

router.route('/order-item-cart').post(ensureAuth, orderItemByCarts);

router.route('/order-item-cart-cod').post(ensureAuth, orderItemByCartsCOD);

router.route('/verify-payment').post(ensureAuth, verifyPayment);

router.route('/make-empty').post(makeEmptyOrders);

router.route('/cancel-order').post(ensureAuth, cancelOrder);

router.route('/add-to-cart').post(ensureAuth, addToCart);

router.route('/remove-cart').post(ensureAuth, removeFromCart);

router.route('/get-my-carts').get(ensureAuth, getMyCarts);

router.route('/get-all-orders').get(getAllOrders);

router.route('/remove-orders').delete(removeOrders);

// router.route('/admin-signup').post(signupAdmin);

// router.route('/admin-login').post(loginAdmin);

// router.route('/admin-me').get(extractAdminFromCookie, getAdmin);

router.route('/admin-update-order').post(extractAdminFromCookie, updateOrderStatus);

router.route('/post-review').post(ensureAuth, reviewOrder);

export default router;
