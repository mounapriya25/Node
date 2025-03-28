const express=require('express')
const appli=express()
appli.get('/',(req,res)=>{
    res.send('hello express')
    console.log('connected.....')
})

const port =8000
appli.listen(port)