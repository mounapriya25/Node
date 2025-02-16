const { Error } = require("mongoose");
const mlt=require("multer")
const pth=require("path")

const store=mlt.diskStorage({
    destination:function(req,file,cd){
        cd(null,"3-image/");
    },
    filename: function(req,file,cd){
        cd(null,file.fieldname+"-"+Date.now()+ pth.extname(file.originalname));
    }
    
})
const check=async(req,file,cd)=>{
    if(file.mimetype.startsWith("image")){
        cd(null,true);
    }
    else{
        cd(new Error("type not match"));
    }

}
const upload=mlt({
    storage:store,
    fileFilter:check,
    limits:{
        fileSize:5*1024*2024
    }
    
})

module.exports=upload
