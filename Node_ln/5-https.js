const http=require('http')
/* res and req are used to communicate with to browser
clients -browsers,apps(customer)
server-client ask  server give that then client display (chef)
network -(waiter)
req- object represent incoming data send by client to server
res- object server uses to  send back data to clent 
*/
const server=http.createServer((req,res)=>{//req is infr from server respone is we give that then it display
    console.log(req)
    res.writeHead(200,{'Content-Type':'text/plain'})//it tells brow about resp
    res.end("hello")//response
})
/* statuscode:represents response
200 mean ok(sucess)
404:not found
500:error */

/*Content-type:tells the broweser type of datasent in responds
text/plain - normal text
text/html -html
application/json-json
 */
const port=8000
server.listen(port,()=>{
    console.log("server is listen means server is opening on given port")
    
})