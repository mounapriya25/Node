const mg=require("mongoose")


const sch = mg.Schema(  {
    "id": String,
    "name": String,
    "price":Number,
    "category": String
})

module.exports=mg.model("prod",sch)