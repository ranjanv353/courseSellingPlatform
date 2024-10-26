import {Router} from "express"

const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "course purchase endpoint"
    })
})

courseRouter.get("/preview", (req, res) => {
    res.json({
        message: "course preview endpoint"
    })
})

export {courseRouter}