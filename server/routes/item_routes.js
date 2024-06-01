const express = require('express');
const { getItems, addItem } = require('../controllers/item_controllers');
// const {ensureAuth, ensureGuest} = require("../middleware/auth");
// const extractAdminFromCookie = require('../middleware/adminAuth');

const router = express.Router();


router.route('/get-items').get(getItems);
router.route('/add-item').post(
    // extractAdminFromCookie,
     addItem);


module.exports = router;