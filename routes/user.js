import {Router} from "express"
import { userModel } from "../db.js";
import { courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import {z} from "zod";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { signupSchema, signinSchema } from "./authschema.js";


const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
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
         console.log(validatedData);
         const userExists = await userModel.findOne({email: validatedData.email});
 
         if (!userExists) {
             const hashedPassword = await hashpassword(validatedData.password);
             const user = await userModel.create({
                 email: validatedData.email,
                 password: hashedPassword, 
                 salt,
                 firstName: validatedData.firstName,
                 lastName: validatedData.lastName
             });
             
             console.log("user added successfully");
             res.status(201).json({message:"user created Succesfully", user});
         } else {
             res.status(409).send("user already exists"); 
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

userRouter.post("/signin", async (req, res) => {
    try{
        const validatedData = signinSchema.parse(req.body);
        const user = await userModel.findOne({email: validatedData.email});
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isPasswordvalid = await bcrypt.compare(validatedData.password + user.salt , user.password);
        if(!isPasswordvalid)  return res.status(401).json({message: "Invalid Credentials"});
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        res.json({message: "Login Successful", token});
    }
    catch (error) {
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

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "purchased course endpoint"
    })
})

export {userRouter}

