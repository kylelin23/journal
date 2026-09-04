import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if(!uri){
    throw new Error("Environment variable incorrect")
}

const connectDB = async () => {
    try{
        await mongoose.connect(uri);
        console.log("Successfully connected to MongoDB! ");
    }
    catch(err){
        console.log("Unable to connect to MongoDB");
    }
}

export default connectDB;