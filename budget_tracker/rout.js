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
               
                console.log(token,'login auth')
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
        res.json({us,mesage:"sucess"})

       }catch(err){
        console.log(err)
       }

})

rt.post("/home",auth)


//category 
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
    



rt.post("/addCat", async(req,res)=>{
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
rt.put("/updateCat",async(req,res)=>{
        const {uid,name,type,icon}=req.body
        const c= await schm.category.findByIdAndUpdate(uid,{$set:{name,type,icon}},{new:true})
        console.log(c)
        res.json({c,message:"sucess"});
})
rt.delete("/deleteCat", async(req,res)=>{
        const {id}=req.body
        console.log(id,"hiiii")
        const us=await schm.category.findByIdAndDelete(id);
        
        console.log(us)
        res.json({message:"sucess"})
})

//account
//get all
rt.post("/getAm", async (req, res) => {
        const {em}= req.body
        console.log(em)
        try {
            const us = await schm.auth.findOne({ email: em });
            if (!us) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const acc = await schm.account.find({ userId: us._id });
    
            console.log(acc);
            res.json({acc});
    
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).json({ message: "Server error" });
        }
    });
//add
rt.post("/addAm", async(req,res)=>{
        const {email,name,amount,icon}=req.body
       
                const c= await schm.account.findOne({name})
                if(c){
                        return res.json({message:"Name already exist"});
                }
                const us = await schm.auth.findOne({email});
                const nc=await schm.account.create({
                        userId:us._id,
                        name:name,
                        amount:amount,
                        icon:icon
                })
                console.log(nc)
                res.json({nc,message:"sucess"});
})
rt.put("/putAm",async(req,res)=>{
        const {id,name,amount,icon}=req.body
        const c= await schm.account.findByIdAndUpdate(id,{$set:{name,amount,icon}},{new:true})
        console.log(c)
        res.json({c,message:"sucess"});
})
rt.delete("/delAm", async(req,res)=>{
        const {id}=req.body
        console.log(id,"hiiii")
        const us=await schm.account.findByIdAndDelete(id);
        
        console.log(us)
        res.json({message:"sucess"})
})

//record
rt.post("/getRd",async(req,res)=>{
        const {em}=req.body;
        const us=await schm.auth.findOne({email:em});
        if(!us){
              return res.json({mesage:"Not found"})
        }
       const rd=await schm.transaction.find({userId:us._id}).populate('account1').populate('category').populate('account2');
       console.log(rd)
       res.json({rd,message:"sucess"})
})

///record add button
rt.post("/getcatAcc",async(req,res)=>{
        const {email} =req.body
        console.log(email)
        const us= await schm.auth.findOne({email})
        if(!us){
                return res.json({message:" email not found"})
        }
        console.log(us)
        const cat=await schm.category.find({userId:us._id})
       const acc=await schm.account.find({userId:us._id})
       console.log(cat,acc)
        res.json({cat,acc,message:"sucess"})
})
rt.post("/addRd",async(req,res)=>{
        const {email,id,type,catId,accId1,accId2,note,value,date,time} =req.body
        const us= await schm.auth.findOne({email})
        if(!us){
                return res.json({message:" email not found"})
        }
        console.log(us)
        const rd=await schm.transaction.create({
                userId:us._id,
                typename:type,
                category:catId,
                amount:value,
                account1:accId1,
                account2:accId2,
                date:date,
                time:time,
                note:note
        })
           
       console.log(rd)
        res.json({rd,message:"sucess"})
})
rt.put("/updateRd",async(req,res)=>{
        const {id,type,catId,accId1,accId2,note,value,date,time} =req.body
        
        const rd=await schm.transaction.findByIdAndUpdate(id,{$set:{
                typename:type,
                category:catId,
                amount:value,
                account1:accId1,
                account2:accId2,
                date:date,
                time:time,
                note:note
        }},{new:true})
           
       console.log(rd)
        res.json({rd,message:"sucess"})
})
rt.delete("/deleteRd", async(req,res)=>{
        const {id}=req.body
        console.log(id,"hiiii")
        const us=await schm.transaction.findByIdAndDelete(id);
        
        console.log(us)
        res.json({message:"sucess"})
})

//peichart
rt.post("/expensesOverveiw",async (req,res)=>{
        const {email}=req.body;
        console.log(email,'emmmmm')
        const us= await schm.auth.findOne({email})
       if(!us){
        return res.json({message:" email not found"})
       }
       const rdE=await schm.transaction.find({$and:[{userId:us._id},{typename:"Expense"}]}).populate('account1').populate('category').populate('account2');
       const rdI=await schm.transaction.find({$and:[{userId:us._id},{typename:"Income"}]}).populate('account1').populate('category').populate('account2');
       console.log(rdE,rdI)
        res.json({rdE,rdI,message:"sucess"})

})
//buget
rt.post("/getTranBg",async (req,res)=>{
        const {em}=req.body;
        const us= await schm.auth.findOne({email:em})
        if(!us){
         return res.json({message:" email not found"})
        }
        const tn=await schm.transaction.find({userId:us._id}).populate('category');
        console.log(tn)
         res.json({tn,message:"sucess"})
 
 })
rt.post("/getBudget",async (req,res)=>{
        const {em}=req.body;
        const us= await schm.auth.findOne({email:em})
        if(!us){
         return res.json({message:" email not found"})
        }
        const bg=await schm.buget.find({userId:us._id}).populate('category');
        console.log(bg)
         res.json({bg,message:"sucess"})
 
 })
 rt.post("/getCatBg",async (req,res)=>{
        const {em}=req.body;
        const us= await schm.auth.findOne({email:em})
        if(!us){
         return res.json({message:" email not found"})
        }
        const cat=await schm.category.find({$and:[{userId:us._id},{type:"Expense"}]});
        console.log(cat)
        res.json({cat,message:"success"})
 
 })
rt.post("/addBudget", async(req,res)=>{
        const {email,category,limit,spent}=req.body
       
                const us= await schm.auth.findOne({email})
                if(!us){
                        return res.json({message:"Email not  exist"});
                }
                console.log(category)
                const bg=await schm.buget.create({
                        userId:us._id,
                        category,
                        limit,
                        spent
                })
                console.log(bg)
                res.json({bg,message:"sucess"});
})

rt.put("/updateBudget",async(req,res)=>{
        const {id,category,limit,spent}=req.body
        const bg=await schm.buget.findByIdAndUpdate(id,{$set:{category,limit,spent}},{new:true})
        console.log(bg)
        res.json({bg,message:"sucess"});
})
rt.delete("/deleteBudget", async(req,res)=>{
        const {id}=req.body
        console.log(id,"hiiii")
        const us=await schm.buget.findByIdAndDelete(id);
        
        console.log(us)
        res.json({message:"sucess"})
})

module.exports=rt
