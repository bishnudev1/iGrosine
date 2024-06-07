import { Document, Schema, Model, model } from 'mongoose';

interface AdminDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

const adminSchema = new Schema<AdminDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Admin: Model<AdminDocument> = model<AdminDocument>('Admin', adminSchema);

export default Admin;
