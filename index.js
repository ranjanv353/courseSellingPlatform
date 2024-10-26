import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {userRouter} from "./routes/user.js"
import {courseRouter} from "./routes/course.js"
import {adminRouter} from "./routes/admin.js"

const app = express();
const  port = 3000;

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


app.listen(3000,() =>{
    console.log("Server is live at port: %d", port);
})