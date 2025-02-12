import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";
import process from "process"


if (!MONGO_URI) {
    throw new Error('check you have set the mongo key correctly form .env.<production | development>.local');
}

const connectDb = async() => {

    try {
    await mongoose.connect(MONGO_URI);
    console.log(`DB connected in ${NODE_ENV} mode`);
    } catch (error) {
        console.log("error connecting to DB", error);
        process.exit(1);
    }
}


export default connectDb;