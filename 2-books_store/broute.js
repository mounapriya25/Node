const exp = require("express")

const app=exp.Router()// if u use the routes in different files then it require

const bs=require("./books.js")


//add
app.post('/add',async(req,res)=>{
    try{
        const newbk= req.body
        const db= await bs.create(newbk ||{
             title:"The jungle book 1",
             author:"Thomas",
             year:2008
         })
         console.log('added')
         res.json({db,message:"Added"})    
    }catch(err){
        console.log(err.message)
    }


   
})
app.get('/get',async(req,res)=>{
   const g = await bs.find()
   res.json({g,message:"display all"})

})
app.get('/get/:id',async(req,res)=>{
    const bid=req.params.id
    const g = await bs.findById(bid)
    if(g){
        res.json({g,message:`display boks at ${bid}`})
    }
    else{
        res.status(404).json({message:'not found'})
    }
    
})

app.put('/update/:id',async(req,res)=>{
    const bid=req.params.id
    const newbk= req.body 
    const ud= await bs.findByIdAndUpdate(bid,newbk,{new:true})//no need to rewrite entire, we just write line where we want update 
    res.json({ud,message:`display boks at ${bid}`})
    if(ud){
        res.json({ud,message:`display boks at ${bid}`})
    }
    else{
        res.status(404).json({message:'not found'})
    }
    
    
})
app.delete('/delt/:id',async(req,res)=>{
    const bid=req.params.id 
    const d= await bs.findByIdAndDelete(bid)
    if(d){
        res.json({d,message:`books at ${bid} id deleted`})
    }
    else{
        res.status(404).json({message:'not found'})
    }
    
    
})

module.exports=app