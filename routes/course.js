import {Router} from "express"
import { courseModel } from "../db.js";

const courseRouter = Router();

// Get list of all courses
courseRouter.get("/", async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});

// Get details of a single course
courseRouter.get("/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch course" });
    }
});

// Preview endpoint can be used to fetch minimal info about a course
courseRouter.get("/:courseId/preview", async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId).select('title price');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch course preview" });
    }
});

export {courseRouter}