import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";///doubt 1 .js or without .js


export const protect = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        res.status(401);
        throw new Error("Not authorized");
    }
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await UserModel.findOne({email: decoded.email}).select("-password");
        console.log("mid",user);
        req.LoggedInUser = user;
        next();
    }
    catch(err){
        res.status(401);
        throw new Error("Not authorized");
    }
}