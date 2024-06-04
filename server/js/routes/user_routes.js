const express = require('express');
const { deleteMyProfile, deleteUsers } = require('../controllers/user_controllers');
const {ensureAuth, ensureGuest} = require("../middleware/auth");


const router = express.Router();


router.route('/delete-my-profile').delete(ensureAuth,deleteMyProfile);

router.route('/delete-users').delete(deleteUsers);


module.exports = router;