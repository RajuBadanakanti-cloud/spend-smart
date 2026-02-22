import User from "../model/User.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token)return next(new AppError("User Unauthorized, Please login!", 401))

    let decode;
    try{
        decode = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return next(new AppError("token invalid or expired!", 401))
    }

    const currentUser = await User.findById(decode.id) //important
    if(!currentUser)return next(new AppError("User no more longer exist, Please login agin", 401))

    req.user = currentUser // imp
    next()
}