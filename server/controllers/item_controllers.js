const Item = require('../models/Item');


exports.getItems = async (req, res) => {
    try {
        // Fetch all items from the database
        const items = await Item.find();

        res.status(200).json({
            success: true,
            count: items.length,
            items: items
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { _id } = req.body; // Assuming the item ID is passed as a route parameter

        // Find the item by ID and delete it
        const deletedItem = await Item.findByIdAndDelete(_id);

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Item deleted successfully",
            data: deletedItem
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { id,category, image, name, seller, price, realPrice, off, desc } = req.body; // Assuming the item data is sent in the request body

        // Validate if all required fields are provided
        if (!id || !category || !image || !name || !seller || !price || !realPrice || !off || !desc) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if item with the same id already exists
        const existingItem = await Item.findOne({ id: id });
        if (existingItem) {
            return res.status(400).json({
                success: false,
                message: "Item with the same id already exists"
            });
        }

        // Create a new item instance using the Item model
        const newItem = new Item({
            id,
            image,
            category,
            name,
            seller,
            price,
            realPrice,
            off,
            desc
        });

        // Save the new item to the database
        await newItem.save();

        res.status(201).json({
            success: true,
            message: "Item added successfully",
            item: newItem
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

