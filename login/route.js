require("dotenv").config()
const exp=require("express")
const rt=exp.Router()
const sch=require("./schm.js")
const bc=require("bcryptjs")
const jwt=require("jsonwebtoken")
const JWT_KEY=process.env.JWT_KEY
const auth=require("./auth.js")
const usermid=require("./usermid.js")


rt.post("/post",async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        const check=await sch.findOne({email});
        //check whether already exist or not
        if(check){
            console.log("found   kkk")
            return res.status(404).json({message:"Already exist"})
        }
        //salt 
        const salt=await bc.genSalt(10);
        const hp= await bc.hash(password,salt)
        const newuser= await sch.create({
            name:name,
            email:email,
            password:hp
    
        })
        console.log(newuser)
        res.status(200).json({message:"Login successful"})
    }catch(err){
        console.log(err.message)
    }
    
})




rt.post("/login",async(req,res)=>{
    try{
       
        const {email,password}=req.body
        console.log(email,password)
        const usr= await sch.findOne({email})
        if(usr){
            const comp= await bc.compare(password,usr.password)
            if(comp){
                const token=  jwt.sign({
                    name:usr.name,
                    email:usr.email
                },JWT_KEY,{
                    expiresIn:"20m"
                })
            
                console.log(token)
                res.json({token})
               
            }
        }else{
            console.log("NNot found")
        }
    }catch(err){
        console.log(err.message)
            
    }
    
})
rt.get("/home",auth,usermid,(req,res)=>{
    res.json({message: "yes"})
})

rt.post("/setpasswrd",async (req,res)=>{
    try{
    const {password}= req.body;
        //salt 
        console.log(password,req.session.ud)
        const salt=await bc.genSalt(10);
        const hp= await bc.hash(password,salt)
        
        const newuser= await sch.create({
            name:req.session.ud.name,
            email:req.session.ud.email,
            password:hp
    
        })
        console.log(newuser)
        res.sendFile(path.join(__dirname,"home.html"))
        
    }catch(err){
        console.log(err.message)
    }
})

module.exports=rt
