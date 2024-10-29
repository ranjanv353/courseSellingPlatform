import express from "express"
import mongoose from "mongoose"

import {userRouter} from "./routes/user.js"
import {courseRouter} from "./routes/course.js"
import {adminRouter} from "./routes/admin.js"
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT,() =>{
        console.log("Server is live at port: %d", process.env.PORT);
    })
}

main()
