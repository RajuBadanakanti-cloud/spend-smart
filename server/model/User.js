import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:1,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        required:true
    },
    password:{
        type:String,
        minlength:6,
        select:false,
        required:true
    }
}, {timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}})


// indexing of email for easyily geting (unique ness)>>  userSchema.index({email}) 

// pre-bcrypt password security (avoid next, next is not a function)
userSchema.pre("save", async function(){
        if(!this.isModified("password"))return
        this.password = await bcrypt.hash(this.password, 12)

})


// compare password 
userSchema.methods.comparePassword = async function(cadidatePassword){
    return await bcrypt.compare(cadidatePassword, this.password)
}

// User Transactions >>
userSchema.virtual("transactions", {
    ref:"Transaction",
    localField:"_id",
    foreignField:"userId"
})

const User = mongoose.model("User", userSchema)

export default User