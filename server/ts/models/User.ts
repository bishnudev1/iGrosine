import { Document, Schema, Model, model } from 'mongoose';
import { OrderDocument } from './Order';

interface Review {
    // Define your Review interface here
    rating: string;
    feedback: string;
}

interface Cart{
    id: string;

}

// interface Order {
//     itemPrice: string;
//     itemName: string;
//     itemImage: string;
//     buyerId: string;
//     orderedType: string;
//     buyerName: string;
//     buyerEmail: string;
//     itemId: string;
//     number: number;
//     city: string;
//     state: string;
//     realPrice: string;
//     off: string;
//     reviews: Review[];
//     seller: string;
//     desc: string;
//     status: string;
//     isDelivered?: boolean;
//     isCancelled?: boolean;
//     deliveredDate: string;
// }

interface Cart {
}

interface UserDocument extends Document {
    // _id: string;
    googleId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    image?: string;
    email: string;
    createdAt: Date;
    orders: OrderDocument[];
    carts: Cart[];
}

const userSchema = new Schema<UserDocument>({
    // _id: {
    //     type: String,
    //     required: true,
    // },
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

export { UserDocument, Cart };
