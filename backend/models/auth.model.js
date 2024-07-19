import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    userName:String,
    firstName:String,
    lastName:String,
    password:String
})

export const User = mongoose.model('User',userSchema)
// export const SignIn = mongoose.model('SignIn',SignUpSchema)