import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("mongodb connected successfully")
        
    }catch(err){
        console.log("mongodb connection failed")
        console.error(err)
        process.exit(1)
    }
}

export default connectDB