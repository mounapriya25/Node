require("dotenv").config()
const exp=require("express")
const rt=exp.Router()
const bc=require("bcryptjs")
const schm=require("./database.js")
const jwt=require("jsonwebtoken")
const auth=require("./auth.js")

//sigin
rt.post("/siginform",async(req,res)=>{
        try{
                const {username,email,password}=req.body;
                const user= await schm.auth.findOne({email});
                if(user){
                   return res.json({message:"Useremail already exist"})
                }
                const s= await bc.genSalt(10);
                const h=await bc.hash(password,s)
                const us=schm.auth.create({
                        username:username,
                        email:email,
                        password:h
                })
                console.log(us)
                res.json({us,message:"Sucessfully sigin"})
                
        }catch(err){
             console.log(err.message)   
        }
     
})
//login
rt.post("/loginform",async(req,res)=>{
        try{
                const {email,password}=req.body;
                const user= await schm.auth.findOne({email});
                if(!user){
                   return res.json({message:"User not found"})
                }
                const checkpass=await bc.compare(password,user.password)
                if(!checkpass){
                        return res.json({message:"Invalid Password"})
                }
                const token= await jwt.sign({
                        username:user.username,
                        email:email,
                },process.env.JWT_KEY,{
                       expiresIn:"60m"
                })
                console.log(token)
                res.json({token,message:"success"})
        }catch(err){
             console.log(err.message)   
        }
     
})

//setpasswrd
rt.post("/setpass",async(req,res)=>{
        
       try{
        const {pass}= req.body
        const user= req.session.usrdetails
        console.log(pass,"hlooo")
        console.log(user,"hiiiii")
        const s= await bc.genSalt(10);
        const h= await bc.hash(pass,s);
        console.log(h)
        const us= await schm.auth.create({
                username:user.name,
                email:user.email,
                password:h
        })
        console.log(us)
        res.json({mesage:"sucess"})

       }catch(err){
        console.log(err)
       }

})

rt.post("/home",auth)









module.exports=rt
