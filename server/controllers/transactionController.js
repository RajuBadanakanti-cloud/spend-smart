import mongoose from "mongoose";
import Transactions from "../model/Transactions.js";
import AppError from "../utils/AppError.js";

// GET ALL TRANSACTIONS >>
export const getAllTransactions = async (req, res, next) => {
    try {
        const userId = req.user.id
        const page = Math.max(Number(req.query.page) || 1, 1)
        const limit = Math.max(Number(req.query.limit) || 10, 1)
        const skip = (page -1) * limit

        // category >> 
        let filter = {userId}
        if(req.query.category && req.query.category !== "All"){
            filter.category = req.query.category
        }
// ------------------------------------------------------------
        const allowSorting = ["amount", "date"]

        let sortBy = { createdAt: -1 } // default sorting

        if (req.query.sort) {
        const sortParam = req.query.sort
        // Check if descending
        const isDescending = sortParam.startsWith("-")
        // Remove "-" if exists
        const sortField = isDescending ? sortParam.slice(1) : sortParam
        // Validate allowed fields
        if (allowSorting.includes(sortField)) {
            sortBy = {
            [sortField]: isDescending ? -1 : 1
            }
         }
    }


        const transactions = await Transactions.find(filter).skip(skip).limit(limit).sort(sortBy)
        res.status(200).json({
            success:true, 
            message:"All Transactions",
            result:transactions.length,
            transactions
        })

    }catch(err){
        next(err)
    }
}

 
// ADD TRANSACTIONS >>

export const addTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id

        const transaction = await Transactions.create({userId, ...req.body}) // imp
        res.status(200).json({
            success:true,
            message:"Transactions Added",
            transaction
        })
    }catch(err){
        next(err)
    }
}


// UPDATE (EDIT) TRANSACTION >>
export const editTransaction = async (req, res, next) => {
    try{
        const {id} = req.params
        const userId = req.user.id


        if(!mongoose.Types.ObjectId.isValid(id))return next(new AppError("Invalid Transaction Id", 400))
        const transaction = await Transactions.findOneAndUpdate( { _id: id, userId }, req.body, {new:true, runValidators:true})
        if(!transaction)return next(new AppError("Transaction Not Found!", 404))

        res.status(200).json({
            success:true,
            message:"Transaction Updated!",
            transaction
        })
    }catch(err){
        next(err)
    }
}


// DELETE TRANSACTION >>
export const deleteTransaction = async (req, res, next) => {
    try{
        const {id} = req.params
        const userId = req.user.id

        if(!mongoose.Types.ObjectId.isValid(id))return next(new AppError("Invalid Transaction Id", 400))

        const transaction = await Transactions.findOneAndDelete({_id:id, userId})
        if(!transaction)return next(new AppError("Transaction Not Found!", 404))

        res.status(200).json({
            success:true,
            message:"Transaction Deleted!",
            transaction
        })
        
        


    }catch(err){
        next(err)
    }
}   