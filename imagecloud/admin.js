
const isadminuser=(req,res,next)=>{
    try{
        // admin middleware
        //req.user from userInfo
        console.log(req.userInfor,'admin')
        if (req.userInfor.role=='admin'){
          return  next()
        }
       /* else if (req.userInfor.role=='user'){
             //res.status(200).json({sucess:true,message:"Hi user"})
             return next()
        }*/
         else{
            return  res.status(403).json({sucess:false,message:"not allowed "})
         } 

       // next()
    }catch(err){
        res.status(500).json({message:err.message})
        console.log(err.message,'admin')

    }
   
    
}
module.exports=isadminuser