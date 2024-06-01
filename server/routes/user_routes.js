const express = require('express');
const { deleteMyProfile } = require('../controllers/user_controllers');


const router = express.Router();


router.route('/delete-my-profile').delete(deleteMyProfile);


module.exports = router;