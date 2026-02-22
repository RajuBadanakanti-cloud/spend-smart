import User from "../model/User.js"
import AppError from "../utils/AppError.js"
import catchAsync from "../utils/catchAsync.js"
import jwt from "jsonwebtoken"

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"7d"})
} 

// register 
export const register = catchAsync(async (req, res, next) => {
        const {name, email, password} = req.body 
        if(!name || !email || !password){
            return next(new AppError("All fields are required!", 400))
        }
 
        // email checking >> 
        const emailExist = await User.findOne({email})
        if(emailExist)return next(new AppError("Email already exist", 400))

        // password checking >>
        if(password.length < 6)return next(new AppError("Password must be 6 characters", 400))

        const user = await User.create({
            name,
            email,
            password
        })

    // token 
    const token = signToken(user._id) 

    res.status(201).json({
        success:true,
        message:"User Registered successfully",
        token,
        user:{
            name:user.name,
            email:user.email
        }
    })
})

// login 

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body 
    if(!email || !password){
        return next(new AppError("Invalid email or password", 400))
    }

    // email checking >> 
    const user = await User.findOne({email}).select("+password") // important
    if(!user)return next(new AppError("Invalid email!", 400))

    // password validation >> 
    const isMatch = await user.comparePassword(password)
    if(!isMatch)return next(new AppError("Invalid email or password", 400))
    
    // token 
    const token = signToken(user._id)

    res.status(201).json({
        success:true,
        message:"User login successfully",
        token,
        user:{
            name:user.name,
            email:user.email
        }
    })
    
})