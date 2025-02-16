const exp=require("express")
const app=exp()
const mg=require("mongoose")
const usrouter=require("./useroute.js")
const router=require("./routes.js")

mg.connect("mongodb://localhost:27017/bookstore")

app.use(exp.json())
app.use("/",usrouter)
app.use("/img",router)
app.listen(8000,()=>{
    console.log("connecting..")
})