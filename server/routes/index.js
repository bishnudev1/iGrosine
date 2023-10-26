const router = require("express").Router();

const {ensureAuth, ensureGuest} = require("../middleware/auth");

router.get("/", ensureGuest, (req,res) => {
    res.status(404).json({
        message: "You're not signed in..."
    });
});

router.get("/log", ensureAuth, (req,res) => {
    res.status(201).json({
        message: "Welcome Back",
        data: req.user
    });
});


module.exports = router;