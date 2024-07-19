import express from "express";
import { connect } from "./db/connect.js";

import mainRouter from "./routes/index";
import mongoose from "mongoose";
import cors from "cors";


const app = express()

app.use(cors())
app.use(express.json())

app.use("api/v1",mainRouter)


connect()
.then(()=>{
    app.listen(3000,()=>{
        console.log('backend server running at port 3000');
        console.log('db is running at port 27017');
    })
})
.catch(async (err)=>{
    await mongoose.disconnect()
    console.log("Not connectiong to db ...",err);
})

