const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    orders: [
        {
            type:Object
        }
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;


