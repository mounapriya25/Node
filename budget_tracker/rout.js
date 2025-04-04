require("dotenv").config()
const exp=require("express")
const rt=exp.Router()
const bc=require("bcryptjs")
const schm=require("./database.js")
const jwt=require("jsonwebtoken")
const auth=require("./auth.js")
const insert=require("./insert.js")

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
                const us= await schm.auth.create({
                        username:username,
                        email:email,
                        password:h
                })
                req.session.usrdetails={
                        name:username,
                        email:email
                }

                console.log(req.session.usrdetails,"hello")
               await  insert(email);
               console.log(us,"hiiii")
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
        await  insert(user.email);
        console.log(us)
        res.json({mesage:"sucess"})

       }catch(err){
        console.log(err)
       }

})

rt.post("/home",auth)

/*
rt.get("/getCat", async(req,res)=>{
        if(req.session.usrdetails){
                console.log(req.session.usrdetails)
        }
        else{
                console.log("not found")
        }
        const em=req.session?.usrdetails?.email
        
        try{
                const us= await schm.auth.findOne({email:em})
                if(!us){
                        console.log("user not found")
                        return ;
                }
                const id=us._id
                const bg=await schm.category.find({userId:id})
                console.log(bg)
                res.json({bg})
        }catch(err){
                console.log(err.message)
        }
})*/
rt.post("/getCat", async (req, res) => {
        /*console.log("Session Data in /getCat:", req.session);  // ✅ Debugging
    
        if (!req.session.usrdetails) {
            return res.status(401).json({ message: "Unauthorized: No session found" });
        }
    
        const em = req.session.usrdetails.email;
*/
        const {em}= req.body
        console.log(em)
        try {
            const us = await schm.auth.findOne({ email: em });
            if (!us) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const categories = await schm.category.find({ userId: us._id });
    
            console.log("Categories found:", categories);
            res.json({ categories });
    
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).json({ message: "Server error" });
        }
    });
    


//category add
rt.post("/addcat", async(req,res)=>{
        const {email,name,type,icon}=req.body
       
                const c= await schm.category.findOne({name})
                if(c){
                        return res.json({message:"Name already exist"});
                }
                const us = await schm.auth.findOne({email});
                const nc=await schm.category.create({
                        userId:us._id,
                        name:name,
                        type:type,
                        icon:icon
                })
                console.log(nc)
                res.json({nc,message:"sucess"});
})
rt.put("/update",async(req,res)=>{
        const {uid,name,type,icon}=req.body
        const c= await schm.category.findByIdAndUpdate(uid,{$set:{name,type,icon}},{new:true})
        console.log(c)
        res.json({c,message:"sucess"});
})
rt.delete("/delete", async(req,res)=>{
        const {id}=req.body
        console.log(id,"hiiii")
        const us=await schm.category.findByIdAndDelete(id);
        
        console.log(us)
        res.json({message:"sucess"})
})
module.exports=rt
