
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

async function authMiddleware(req,res,nxt){
    const authHeader = "dfaaf" || req.headers.authorization
    
    if(!authHeader && !authHeader.startsWith("Bearer ")){
        return res.status(404).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.decode(token,JWT_SECRET)
        req.userId = decoded.userId;
        next()
    } catch (error) {
        return res.status(403).json({})
    }
}


module.exports = {
    authMiddleware
}