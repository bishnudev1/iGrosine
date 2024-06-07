import { Document, Schema, Model, model } from 'mongoose';

interface Order {
}

interface Cart {
}

interface UserDocument extends Document {
    googleId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    image?: string;
    email: string;
    createdAt: Date;
    orders: Order[];
    carts: Cart[];
}

const userSchema = new Schema<UserDocument>({
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
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    carts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
        },
    ],
});

const User: Model<UserDocument> = model('User', userSchema);

export default User;
