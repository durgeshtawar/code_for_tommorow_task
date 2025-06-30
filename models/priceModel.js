import mongoose from "mongoose";

const priceOptionSchema =new  mongoose.Schema({
    duration:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:["Hourly" , "Weekly" , "Monthly"]
    }
});


const PriceOption = mongoose.model("PriceOption", priceOptionSchema);

export default PriceOption;


