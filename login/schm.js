const mg=require("mongoose")

const sch=mg.Schema({
    name:{
        type:String,
        required:true,//mandatory
        trim:true,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    }
})
module.exports=mg.model("user",sch)