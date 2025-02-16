require("dotenv").config()
const cld=require("cloudinary").v2

cld.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const upld=async(filepath)=>{
    const img=await cld.uploader.upload(filepath)
    if(!img){
        return 
    }
    console.log(img,'Hi')
    
    return {
        url:img.secure_url,
        publicid:img.public_id
    }
}
module.exports=upld