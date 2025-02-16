const { default: mongoose } = require("mongoose");
const mg=require("mongoose");
const authorsch= mg.Schema({
    name:String,
    bio:String
})

const booksch=mg.Schema({
    title:String,
    year:Number,
    author:{
        //ObjectId is not js builtin type it is mongo specific type thats y we need to give like below
        type:mg.Schema.Types.ObjectId,//Types is a namespace contains datatypes supported by mg in that ObjectId is one of type 
        ref:"author"//it create reference to other collection 
    }
})

const a=mg.model("author",authorsch)
const b=mg.model("books",booksch)
module.exports={a,b}