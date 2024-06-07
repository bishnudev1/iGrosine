import mongoose, {ConnectOptions} from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/igrocine", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("MongoDB has connected to Node.ts Server");
    } catch (error) {     
        console.error("MongoDB connection error: ", error);
    }
};