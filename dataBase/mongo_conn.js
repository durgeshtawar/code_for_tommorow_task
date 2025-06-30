import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();


const mongo_uri = process.env.MONGO_URI;


const mongo_connection = async ()=>{
    try {
        await mongoose.connect(mongo_uri);
        console.log("mongoDb conneccted");
    } catch (error) {
        console.log("Somrthing went wrong while connectiong with db");
    }
}

export default mongo_connection;


