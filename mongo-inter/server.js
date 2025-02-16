const exp=require("express")
const app=exp()
const mg=require("mongoose")
const route=require("./route.js")
const bookrt=require("./bookroute.js")

mg.connect("mongodb://localhost:27017/mongo")
.then(()=>{console.log("mg sucess")})
.catch((err)=>{console.log(err.message)})


app.use(exp.json())
app.use("/",route)
app.use("/b",bookrt)
app.listen(8000,()=>{
    console.log("connecting...")
})