//embedded js templating
// simple templating language that leads u generate a html with js,it create dynamic pages in express
//it insert data fro backend from exp into html
const exp=require('express')
const path=require('path')
const app=exp()
console.log(__dirname)

app.set('view engine','ejs')//VE is a tool  that allows server to render dynamic pages by sending data to html  
// ejs means it tells Exp to use ejs as template
//C:\Users\K.MOUNA PRIYA\OneDrive\Desktop\node\ejs\views
app.set('views',path.join(__dirname,'views'))//define exact location
const prd=[
    {
        id:1,
        pname:'phone'
    },
    {
        id:2,
        pname:'phone'
    }
]
app.get('/',(req,res)=>{
    res.render('home',{prd: prd})//render home.ejs and {} inside it is send to file
})
app.listen(4000,()=>{
    console.log('connect.....')
})
/* we need to create a view folder because express defaultly 
looks for templates inside that folder automatly or else error occur

*/