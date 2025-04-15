
const http=require('http')
/*we cant use same port in diffrent files at a time or to differnts pages on same port we use routes
 */
    const server=http.createServer((req,res)=>{
        const url=req.url
        if(url==='/'){
            res.writeHead(200,{'content-type':'text/plain'})
            res.end('this is home page')
        }
        else if(url==='/about'){
            res.writeHead(200,{'content-type':'text/plain'})
            res.end('this is about page')
        }
        else{
            res.writeHead(404,{'content-type':'text/plain'})
            res.end('this is not working')
        }
    })
const port=8000
server.on('error',(err)=>{
    console.log(' not conecting...',err.message)
})
server.listen(port,()=>{
 console.log('conecting...')
})


