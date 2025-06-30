import mongoose from "mongoose";

const priceOptionSchema =new  mongoose.Schema({
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },
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


