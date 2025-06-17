import {Router} from "express";
import { adminModel } from "../db.js";
import { courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import {z} from "zod";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { signupSchema } from "./authschema.js";
import { verifyTokenAndAuthorize } from "./middlewares/authMiddleware.js";

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
    try{
        const admin = await adminModel.findOne({email});
        console.log(admin);
        if (!admin) return res.status(404).json({ message: 'User not found' });
        const isPasswordvalid = await bcrypt.compare(password + admin.salt , admin.password);
        console.log(isPasswordvalid);
        if(!isPasswordvalid)  return res.status(401).json({message: "Invalid Credentials"});
        const token = jwt.sign({id: admin._id},process.env.JWT_SECRET, {expiresIn: "1h"});
        console.log(token)
        res.json({message: "Login Successful", token});
    }
    catch(error){
        res.status(500).json({message: 'Server Error', error});
    }
})

adminRouter.use(verifyTokenAndAuthorize);

adminRouter.post("/course", async (req,res) =>{
    const {title, description, price, imageUrl} = req.body;
    try{
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: req.id  
        });
        res.send(course);
    }
    catch (error){
        console.log(error);
    }    
})

adminRouter.put("/course", async (req,res) =>{
    const updatedCourseData = req.body;
    if (!updatedCourseData._id || updatedCourseData.__v === undefined) {
        return res.status(400).json({
            success: false,
            message: "Course ID and version are required for update."
        });
    }
    const { __v, ...dataToUpdate } = updatedCourseData; 
    console.log(dataToUpdate)
    try {
        const courseData = await courseModel.findOneAndUpdate(
            { _id: updatedCourseData._id, __v: updatedCourseData.__v },  
            { $set: dataToUpdate, $inc: { __v: 1 } },                                   
            { new: true }                                             
        )
        console.log(courseData);
        if (!courseData) {
            return res.status(409).json({
                success: false,
                message: "Document has been updated by another user. Please refresh and try again."
            });
        }
        res.status(200).json({ success: true, data: courseData });
    }
    catch (error) {
        console.error("Error updating course:", error.message);
        res.status(500).json({ success: false, message: "Failed to update course. Please try again later." });
    }
})

adminRouter.get("/course", async (req, res) => {
    try {
        const courses = await courseModel.findOne({creatorId: req.id}).populate({
            path: 'creatorId',
            select: 'firstName lastName email' 
        });
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch courses. Please try again later." });
    }
});

adminRouter.get("/course/bulk", async (req, res) => {
    try {
        const courses = await courseModel.find().populate({
            path: 'creatorId',
            select: 'firstName lastName email'
        });
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch courses. Please try again later." });
    }
});

// Delete a course created by the logged in admin
adminRouter.delete("/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const deleted = await courseModel.findOneAndDelete({ _id: courseId, creatorId: req.id });
        if (!deleted) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course" });
    }
});

export {adminRouter}