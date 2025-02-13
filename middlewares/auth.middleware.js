import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js"

const authorize = async (req, res, next) => {

    try {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1]  // will gives us ["Bearer", "<Token>"] 
        }

        
        if (!token) return res.status(401).json({success: false, message: "Unauthorized"});

        // if there is a token then we decoded
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        // based on the decoded token, we check if the user exist on DB
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({success: false, message: "Unauthorized"});

        // if the user exist on DB we assign it
        req.user = user
        
        next();
    } catch (error) {
        res.status(401).json({success: false, message: error.message});
    }
}

export default authorize