import mongoose, {ConnectOptions} from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("MongoDB has connected to Node.ts Server");
    } catch (error) {     
        console.error("MongoDB connection error: ", error);
    }
};