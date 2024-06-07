import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User'; // Import the User model

export const deleteUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        await User.deleteMany();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User profiles deleted successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const deleteMyProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract user ID from request parameters or authentication token
        const userId: string = req.user._id; // Adjust this based on your authentication logic

        // Delete the user from the database
        const deletedUser: UserDocument | null = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User profile deleted successfully",
            data: deletedUser // You can omit this if you don't want to send the deleted user data back
        });
    } catch (error:any) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
