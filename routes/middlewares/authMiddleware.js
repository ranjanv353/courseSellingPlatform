import jwt from "jsonwebtoken";

const verifyTokenAndAuthorize = async (req,res, next) =>{
    const token = req.headers['authorization']?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'User not authenticated'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.id = decoded.id;
        next();
    }
    catch(error){
        return res.status(401).json({message: "Invalid token"});
    }
}

export {verifyTokenAndAuthorize}