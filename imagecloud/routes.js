require("dotenv").config()
const exp=require("express")
const rt=exp.Router()
const cld=require("cloudinary").v2
const sch=require("./schm.js")
const mltup=require("./multer.js")
const cldup=require("./cloud.js")
const authr=require("./athun.js")
const admin=require("./admin.js")

//add in db
const upld_db=async(req,res,next)=>{
    try{
        if(!req.file){
            res.status(404).json({message:"file is not uploaded"})
        }
        const {url,publicid}= await cldup(req.file.path)
        console.log(req.userInfor.userid," middle in route")
        const newimg=await sch.create({
            url:url,
            pid:publicid,
            uploadeBy:req.userInfor.userid
        })
        if(newimg){
            console.log(newimg)
            res.status(200).json({newimg})
        }
        next()
    }catch(err){
        console.log(err.message)
    }
    
}



// display
const display=async(req,res,next)=>{

    const newimg=await sch.find()
        if(newimg){
          
            res.status(200).json({newimg})
        }
    
}
//specific
const displayid=async(req,res,next)=>{
    const imgid=req.params.id;
    const newimg=await sch.findById(imgid)
        if(newimg){
          
            res.status(200).json({newimg})
        }
    
}

//delete
const del=async(req,res,next)=>{
    try{
       const imgid =req.params.id
       const img= await sch.findById(imgid)
       console.log(img)
       if(!img){
        return res.status(404).json({message:"not found img"})
       }
       if(img.uploadeBy.toString()!==req.userInfor.userid){
        return res.status(500).json({message:"can't delte img"})
       }
       //destroy in cld
       await cld.uploader.destroy(img.pid)
       //then delte in db
        await sch.findByIdAndDelete(imgid)
      res.status(200).json({message:"sucessfully deleted"})
       next()
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message:"cannot acess"})
    }


    
}


// fetch image-pagination instead of sending all img at once it send in parts
//pagination is used to display the data in parts
const fetch=async(req,res)=>{
    try{
        //we need to give the params header
        //req.query is obj contain key value pairs it is like params it is preferd for sorting,pagination
        // we are just taking the params from req based on it we are dispalying
        const pageno=parseInt(req.query.page)||1
        const limit=parseInt(req.query.limit)||2
        const sortby=req.query.sortby ||"_id"
        const sortorder=req.query.order==="asc"?1:-1

        const skip=(pageno-1)*limit;
        const totalImages=await sch.countDocuments();
        const totalpages= Math.ceil(totalImages/limit)
        const sortobj={}
        sortobj[sortby]=sortorder

        const img=await sch.find().skip(skip).limit(limit).sort(sortobj)
        if(img){
            res.json({
                currpg:pageno,
                totalImages:totalImages,
                totalpages:totalpages,
                data:img,

            })
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:" Error  canot fetch "})
    }
}
rt.post("/post",authr,admin,mltup.single("image"),upld_db )
rt.get("/get",authr,display)
rt.get("/get/:id",authr,displayid)
rt.get("/fetch",authr,fetch)
rt.delete("/del/:id",authr,admin,del)

module.exports=rt