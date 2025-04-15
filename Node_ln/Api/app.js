const exp=require('express')
const app=exp()
app.use(exp.json())//middleware

let prd=[
    {
        id:1,
        pname:'phone'
    },
    {
        id:2,
        pname:'laptob'
    }
]

app.get('/',(req,res)=>{
    res.json({message:"welcome to products"})
})
app.get('/get',(req,res)=>{
    res.json(prd)
})
app.get('/get/:pid',(req,res)=>{
    const pid=parseInt(req.params.pid)
    const pd=prd.find(prd=>prd.id===pid)
    if(pd) res.json(pd)
    else{
 res.status(404).send('not found----')
}
})

app.get('/get/name/:pname',(req,res)=>{
    const nm=req.params.pname// it returns string type data
    const pd=prd.find(prd=>prd.pname===nm)
    console.log(nm)
    if(pd) res.json(pd)
    else res.status(404).send('ahhhhh')//json({message:'ahhhh'})
})

//posting
app.post('/add',(req,res)=>{
    
    const newprd=[{
        id:prd.length+1,
        pname:'earphones'
    },{
        id:prd.length+2,
        pname:'iphones'
    }]
    prd.push(...newprd)
    res.status(200).json(prd)
})


///update
app.put('/put/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const pd=prd.find(prd=>prd.id===id)
    if(pd){
        pd.pname=req.body.pname||pd.pname
        res.json(pd)
    }
    res.status(404).send('not found----')
})

//delete
app.delete('/del/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const pd=prd.filter(prd=>prd.id!==id)
    if(prd){
        prd=pd
        res.json(prd)
    }
    res.status(404).send('not found----')
})
app.listen(4000,()=>{
    console.log('connecting.....')
})
