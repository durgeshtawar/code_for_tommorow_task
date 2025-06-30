import jsonwebtoken from "jsonwebtoken";
import { decode } from "jsonwebtoken";

const auth = (req , res , next)=>{
    const token = req.headers.authorization?.split(" ")[1]; //"bearer token"

    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    try {
        const decoded = jsonwebtoken.verify(token , process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({message:"Invalide or expired token"});
    };
};

export default auth;


