
const mg=require('mongoose');

const sch= mg.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

module.exports=mg.model("Userimg",sch)