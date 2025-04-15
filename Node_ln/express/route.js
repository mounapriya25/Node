const express=require('express')
const app =express()
app.get('/',(req,res)=>{
    res.send('hello express')
    console.log('connected.....')
})
app.get('/prd',(req,res)=>{
    const prod=[{
        id:1,
        pname:'phone'
    },
    {
        id:2,
        pname:'phone'
    }
]
        
    
    res.json(prod)
    console.log('connected.....')
})

// get a single product,: represents dynamic

// route parameter are represented using :name
//params is object that stores rp with values like - 'pid':1
app.get('/prd/:pid',(req,res)=>{
    const id=parseInt(req.params.pid);
    const prod=[{
        id:1,
        pname:'phone'
    },
    {
        id:2,
        pname:'phone'
    }
    ]
    const sp=prod.find(prod=>prod.id===id)
    console.log(sp)
    if(sp){
        res.json(sp)
        
    }
    else
   {
    res.status(404).send('not found')
   }

})
const port =4000
app.listen(port)