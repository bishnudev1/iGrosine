const User = require('../models/User'); // Import the User model

exports.deleteMyProfile = async (req, res) => {
    try {
        // Extract user ID from request parameters or authentication token
        const userId = req.user._id; // Adjust this based on your authentication logic

        // Delete the user from the database
        const deletedUser = await User.findOneAndDelete({ _id: userId });

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("deletedUser",deletedUser);
        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User profile deleted successfully",
            data: deletedUser // You can omit this if you don't want to send the deleted user data back
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
