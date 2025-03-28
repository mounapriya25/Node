const exp=require('express')
const app=exp()
const mong=require('mongoose')
const book=require("./books.js")
const router=require("./broute.js")
const port=8000


const con=async()=>{
    try{
        await mong.connect("mongodb://localhost:27017/bookstore")
        app.use(exp.json())
        app.use("/",router)
    }catch(err){
        console.log(err.message)
    }
    
    
}

con()


app.listen(port,()=>{
    console.log('server is connecting...')
})
