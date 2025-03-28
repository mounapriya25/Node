require("dotenv").config()
const jwt=require("jsonwebtoken")
const JWT_KEY=process.env.JWT_KEY


const  check=(req,res,next)=>{
    const hd=req.headers["authorization"]
    
    tk=hd //&& hd.split(" ")[1]
    
    if(!tk){
        console.log("not found");
    }
    try{
        const user=jwt.verify(tk,JWT_KEY)
        
        req.details=user
        console.log(user)
        next()
    }catch(err){
        
        console.log(err.message)
    }
    
}

module.exports= check