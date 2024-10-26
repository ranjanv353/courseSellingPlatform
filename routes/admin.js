import {Router} from "express";
import { adminModel } from "../db.js";

const adminRouter = Router();


adminRouter.post("/signup", (req,res) =>{
    res.json({
        message: "Admin sign up endpoint"
    })
})

adminRouter.post("/signin", (req,res) =>{
    res.json({
        message: "Admin sign in endpoint"
    })
})

adminRouter.post("/course", (req,res) =>{
    res.json({
        message: "Admin sign in endpoint"
    })
})

adminRouter.put("/course", (req,res) =>{
    res.json({
        message: "Admin sign in endpoint"
    })
})

adminRouter.post("/course/bulk", (req,res) =>{
    res.json({
        message: "Admin sign in endpoint"
    })
})

export {adminRouter}