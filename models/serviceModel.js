import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Category"
    },
    
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["Normal" , "VIP"],
        required:true
    }
}, {timestamps:true});

const Service = mongoose.model("Service" , serviceSchema);

export default Service;

