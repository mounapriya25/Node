require('dotenv').config();
const exp = require("express")
const bcrt=require('bcryptjs')
const app=exp.Router()// if u use the routes in different files then it require
const jwt=require('jsonwebtoken')
const us=require("./usersch.js")
const JWT_KEY=process.env.JWT_KEY;
const adminmid=require("./admin.js")
const authnmid=require("./athun.js")
const bcry=require("bcryptjs")
//add
app.post('/reg',async(req,res)=>{
    try{
        const {uname,em,passwrd,rl}= req.body
        const check=await us.findOne({$or:[{uname}, {em} ]})
        const salt= await bcrt.genSalt(10)
        const hpass=await bcrt.hash(passwrd,salt)
        
        if(check){
           return  res.status(500).json({message:"Already exists this username or email"}) 
        
        }else{
            const db= await us.create({
                name:uname,
                email:em,
                password:hpass,
                role:rl
        
            })

         console.log('added')
         res.json({message:"Added"}) 
       
        }  
    }catch(err){
        console.log(err.message)
    }
})

//"pasw":"mouna1",
 app.post('/login',async(req,res,next)=>{
        try{
            const {unm,em,pasw}=req.body
            const checkus = await us.findOne({$or:[{email:em},{username:unm}]})
            //checking the user exist or not
            if(checkus){
              const  checkpass = await bcrt.compare(pasw,checkus.password)
              //checking the password
              if(!checkpass){
                console.log('incorrect password')
               return  res.json({db,message:"incorrect password"})
              }

              //bearer
              //it creates a jwt token jwt.sign(payload,key,others)
              //payload contains the user specific  data which we want to store in token
              // which can be extracted by server,by this no need to check database everytime just by decoding it we can get 
              console.log(JWT_KEY,'hi')
              const  acstoken=jwt.sign({
                userid:checkus._id,
                username:checkus.name,
                role:checkus.role
              },JWT_KEY,{
                expiresIn:"60m"
              })

              res.status(200).json({acstoken,message:"login sucessfully"})




            }else{
                console.log('not found')
               return  res.status(404).json({db,message:"not found"})
               
            }
            
        }catch(err){
            console.log(err.message)
            return  res.status(500).json({message:err.message})
        }
    

   
})

const changepass=async(req,res)=>{
    try{
        const userId=req.userInfor.user
        const {oldpass,newpass}=req.body;
        const user =await us.findById(userId)
        if(!user){
            console.log("not exist")
            return res.status(404).json({message:"not exist"})
        }
        //check if the old pass is correct
        
        const checkcorrt=await bcry.compare(oldpass,user.password)
        if(!checkcorrt){
           return  res.status(400).json({message:"incorrect password"})
        }
        const salt= await bcry.genSalt(10)
        const hash=await bcry.hash(newpass,salt)
        const updt =await us.findByIdAndUpdate(userId,{$set:{password:hash}},{new:true}) 
        res.status(200).json({message:"sucessfully changed the password"})
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
}

//other home route
app.get('/home',authnmid,adminmid,(req,res)=>{
  res.json({message:`welcome to ${req.userInfor.role} page`})
})
app.post('/change',authnmid,changepass)
module.exports=app