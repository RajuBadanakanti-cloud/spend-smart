import mongoose from "mongoose";
/* 

* Title
* Amount
* Category
* Date
* Notes (optional)

*/

const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        trim:true,
       required: [true, "Title is required"]
    },
    amount:{
        type:Number,
        min: 0,
        required:true
    },
    type:{
        type:String,
        enum: ["Income", "Expense"],
        required:true
    },
    category: {
        type: String,
        enum: ["Food", "Rent", "Loan", "Transport", "Shopping", "Health","Other"],
        required: true
    },
    date:{
        type:String,
        trim:true,
        required:true
    },
    notes:{
        type:String
    }


}, {timestamps:true})


const Transactions = mongoose.model("Transaction", transactionSchema)
export default Transactions


