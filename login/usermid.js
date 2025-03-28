
const  checkusr=(req,res,next)=>{
    try{
        if(req.details.name!='mounapriya'){
            res.json({message:"no"});
            return  
        } 
        
        next()
        
      
    }catch(err){
        
        console.log(err.message)
    }
    
}

module.exports= checkusr