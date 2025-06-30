import express from "express";
import jsonwebtoken from "jsonwebtoken"
const router = express.Router();
//for genrating token 
const auth = async (req , res)=>{
    const {email , password} = req.body;

    if(email && password){
        const token = jsonwebtoken.sign({email} , process.env.JWT_SECRET , {expiresIn:"1h"});
        return res.json({token});
    }
    res.status(401).json({message:"Invalide credentials"});
}


export default auth;

