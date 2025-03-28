const exp=require('express')
const app=exp()
// define middle ware 
/*mw is like watch man it process the request before  they reach the final response 
it checks req ,process them and decide whether they should pass or not
so by using it we can restrict or allow user to particular page*/

app.use((req,res,next)=>{//middlewre  
    console.log('first')
    next()//proceed or pass the control to the next route or middle ware
})// which out next it stuck there

//req.method ->get or post
//req.url-> url
app.get('/',(req,res)=>{
    res.send('home')
})
app.get('/about',(req,res)=>{
    res.send('about')
})
app.listen(4000,()=>{
    console.log('connect.....')
})
