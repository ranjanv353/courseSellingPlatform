import jwt from "jsonwebtoken";

const extractAdminFromToken = (req,res, next) =>{
    console.log("Extracting the admin email");
    const token = req.headers['authorization']?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'Admin not authenticated'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        req.id = decoded.id;
        next();
    }
    catch(error){
        return res.status(401).json({message: "Invalid token"});
    }
}

export {extractAdminFromToken}