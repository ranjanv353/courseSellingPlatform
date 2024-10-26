import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const app = express();
const port = 3000;



app.post("/user/signup", (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

app.get("/user/purchases", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

app.post("/course/purchase", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

app.get("/courses", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

app.listen(3000,() =>{
    console.log("Server is live at port: %d", port);
})