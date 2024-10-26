import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {userRouter} from "./routes/user.js"
import {courseRouter} from "./routes/course.js"
import {adminRouter} from "./routes/admin.js"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const  port = 3000;

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(3000,() =>{
        console.log("Server is live at port: %d", port);
    })
}

main()
