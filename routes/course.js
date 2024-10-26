import {Router} from "express"

const courseRouter = Router();

courseRouter.post("/course/purchase", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

courseRouter.get("/courses", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

export {courseRouter}