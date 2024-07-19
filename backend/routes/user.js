import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { User } from "../models/auth.model";
import authMiddlware from "../middlewares/tokenAuth.middleware.js";


const router = express.Router()

const signUpShcema = zod.object({
    userName:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.post("/sign-up",async (req,res) => {

    const{userName,firstName,lastName,password} = req.body

    const {success} = signUpShcema.safeParse(req.body)

    if (!success) {
        return res.json({
            message: "Email is already teken /Incorrect inputs"
        })
    }

    const userExist = await User.findOne({
        userName:userName
    })

    if (userExist._id) {
        return res.json({
            message: "Email is already teken "
        })
    }

    const user = await User.create({
        userName,
        firstName,
        lastName,
        password
    })

    const token = jwt.sign({userId: user._id},JWT_SECRET)

    res.json({
        message:"User created succfully",
        token:token
    })
    
})

router.post("update-user",authMiddlware,async(req,res)=>{

    const {success} = updateBody.safeParse(req.body)
    
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    res.json({
        message: "Updated successfully"
    })

    
    await User.findOneAndUpdate(req.userId,req.body)
})


router.get("/bulk",authMiddlware,async(req,res)=>{
    

    // todo: user could also search by @username
    const filter = req.params.filter || "";

    const [firstName,lastName] = filter.split(" ")

    const users = await User.find(
        {
            $or:[
                {firstName: /firstName/},
                {lastName:/lastName/}
            ]
        },
        {   
            firstName,
            lastName,
            userName,
            _id
        }
    )

    res.json({user:users})
        
})


router.post("/sign-up",async (req,res) => {

    const{firstName,lastName,password} = req.body
    
    const user = await SignUp.findOne
    
})
module.exports = router;
