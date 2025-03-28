const mong=require("mongoose")
const schm=mong.Schema({
    title:{
        type:String,
        required:["name of book is required" ],
        trim:true,
        maxLength:[100,"title of the book cannot be  more than 100 char "]
    },
    author:{
        type:String,
        required:["name of author is required" ],
        trim:true,
        maxLength:[100,"title of the book cannot be  more than 100 char "]
    },
    year:{
        type:Number,
        min:[1200,"year is must after 1200"],
        max:[new Date().getFullYear(),"year cannot be in future"]
        
    }

}
)
//Date.now() gives  current timestamp 
// new Date.getFullYear() gives current year like 2025
module.exports = mong.model("books",schm);
