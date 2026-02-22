import mongoose from "mongoose";
import User from "../model/User.js";
import AppError from "../utils/AppError.js";

// GET ALL USERS >>
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            success:true,
            message:"All Users",
            users
        })
    }catch(err){
        next(err)
    }
}

// DELETE USER BY ID >> 
export const deleteUserById = async (req, res, next) => {
    try {
        const {id} = req.params 
        if(!mongoose.Types.ObjectId.isValid(id))return next(new AppError("Invalid User Id", 400))

        const user = await User.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"User Deleted!",
            user
        })

    }catch(err){
        next(err)
    }
}  