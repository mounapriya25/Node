const exp=require('express')
const router=exp.Router()
const jwt=require("jsonwebtoken")



const authnmid=(req,res,next)=>{
    const aheader=req.headers['authorization']
    console.log("middle....",aheader)//token is in the form of Bearer ey....
    const token =aheader && aheader.split(" ")[1]//it split the token into [Bearer ,ey....] then acess ey....
    if(!token){
        res.status(404).json({message:'not found'})
    }
    //decoding  token
    try{
        const jverify=jwt.verify(token,process.env.JWT_KEY)
        console.log(jverify)
        //userInfor is variable we are storing in req
        req.userInfor=jverify;
        console.log(req.userInfor," middle")
        next()
    }catch(err){
        res.status(500).json({message:err.message})
        console.log(err.message)
    }
    
}

//we need to past token in home which is generated in login 
/*router.get('/home',authnmid,adminmid,(req,res)=>{
    res.json({message:`welcome to ${req.userInfor.role} page`})
})*/



module.exports=authnmid