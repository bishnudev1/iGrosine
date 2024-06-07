import { Document, Schema, Model, model } from 'mongoose';

interface Review {
    // Define your Review interface here
}

interface OrderDocument extends Document {
    itemId: string;
    itemName: string;
    realPrice: string;
    off: string;
    reviews: Review[];
    seller: string;
    itemImage: string;
    itemPrice: string;
    desc: string;
    number: number;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    city: string;
    state: string;
    status: string;
    orderedType: string;
    orderedDate: Date;
    isDelivered?: boolean;
    isCancelled?: boolean;
    deliveredDate: string;
}

const orderSchema = new Schema<OrderDocument>({
    itemId: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    realPrice: {
        type: String,
        required: true,
    },
    off: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
            default: [],
        },
    ],
    seller: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    buyerName: {
        type: String,
        required: true,
    },
    buyerEmail: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Your item will be shipped soon.',
    },
    orderedType: {
        type: String,
        required: true,
    },
    orderedDate: {
        type: Date,
        default: Date.now,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
    deliveredDate: {
        type: String,
        default: `Will be delivered by ${new Date().toDateString()}`,
    },
});

const Order: Model<OrderDocument> = model<OrderDocument>('Order', orderSchema);

export default Order;
