import {Router} from "express";
import { adminModel } from "../db.js";
import jwt from "jsonwebtoken";
import {z} from "zod";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { signupSchema } from "./authschema.js";
import { extractAdminFromToken } from "./middlewares/extractAdminFromToken.js";

const adminRouter = Router();



adminRouter.post("/signup", async (req,res) =>{
    // const {email, password, firstName, lastName} =  req.body;
    const salt = crypto.randomBytes(6).toString('hex');
    
    const hashpassword = async (password) =>{
        try{
            const hashedPassword = await bcrypt.hash(password+salt,3);
            return hashedPassword;
        }
        catch(error){
            console.error("Error hashing password: ", error);
        }
    }

    try {

        const validatedData = signupSchema.parse(req.body);
        // console.log(validatedData);
        const adminExists = await adminModel.findOne({email: validatedData.email});

        if (!adminExists) {
            const hashedPassword = await hashpassword(validatedData.password);
            const admin = await adminModel.create({
                email: validatedData.email,
                password: hashedPassword, 
                salt,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName
            });
            
            console.log("Admin added successfully");
            res.status(201).json({message:"Admin created Succesfully", admin});
        } else {
            res.status(409).send("Admin already exists"); 
        }
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationErrors = error.errors.map((e) => ({
              field: e.path[0],
              message: e.message,
            }));
            return res.status(400).json({ errors: validationErrors });
          }
        res.status(500).send("Internal Server Error"); 
    }
})

adminRouter.post("/signin", async (req,res) =>{
    const {email, password} =  req.body;
    console.log(req.body);
    try{
        const admin = await adminModel.findOne({email});
        console.log(admin);
        if (!admin) return res.status(404).json({ message: 'User not found' });
        const isPasswordvalid = await bcrypt.compare(password + admin.salt , admin.password);
        console.log(isPasswordvalid);
        if(!isPasswordvalid)  return res.status(401).json({message: "Invalid Credentials"});
        const token = await jwt.sign({id: admin._id},process.env.JWT_SECRET, {expiresIn: "1h"});
        console.log(token)
        res.json({message: "Login Successful", token});
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error});
    }
})

adminRouter.post("/course", extractAdminFromToken ,(req,res) =>{
    const admin = adminModel.findById({_id: req.id});
    console.log(admin);

    
})

adminRouter.put("/course", (req,res) =>{
   
})

adminRouter.post("/course/bulk", (req,res) =>{
    
})

export {adminRouter}