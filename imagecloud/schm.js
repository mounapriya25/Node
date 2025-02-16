
const mg=require("mongoose")

const schm=mg.Schema({
    url:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    pid:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    uploadeBy:{
            type:mg.Schema.Types.ObjectId,
            ref:"Userimg",
            required:true
    }
})

module.exports=mg.model("cloud",schm)