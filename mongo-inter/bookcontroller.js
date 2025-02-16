const exp=require("express")
const sch=require("./bookauthorsch.js")

const crtauth=async(req,res)=>{
    try{
    const result= await sch.a.create(req.body)
   
    if(!result){
        res.status(500).json({message:"not created"})
    }
    res.status(200).json(result)


    }catch(err){
        console.log(err.message)
    }
}
const crtbook=async(req,res)=>{
    try{
        const result=await sch.b.create(req.body)
        if(!result){
            res.status(500).json({message:"not created"})
        }
        res.status(200).json(result)
    
    }catch(err){
        console.log(err.message)
    }
}

const getbk=async(req,res)=>{
    try{
        //populate helps in retriving the referenced document from other collection
        const result=await sch.b.findById(req.params.id).populate("author")//we get author collection details also
        if(!result){
            res.status(404).json({message:"not found"})
        }
        res.status(200).json(result)
    
    }catch(err){
        console.log(err.message)
    }
}
module.exports={crtauth,crtbook,getbk}
