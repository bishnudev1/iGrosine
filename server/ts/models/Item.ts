import { Document, Schema, Model, model } from 'mongoose';

interface Review {
    // Define your Review interface here
}

interface ItemDocument extends Document {
    category: string;
    id: number;
    image: string;
    name: string;
    seller: string;
    price: string;
    realPrice: string;
    off: string;
    desc: string;
    reviews: Review[];
}

const itemSchema = new Schema<ItemDocument>({
    category: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    price: {
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
    desc: {
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
});

const Item: Model<ItemDocument> = model<ItemDocument>('Item', itemSchema);

export default Item;
