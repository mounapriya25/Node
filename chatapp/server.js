const exp=require("express")
const http=require("http")// web sockets need raw http server  and wont work for a app=exp()
const socket=require("socket.io")
const app=exp()

//socket.io is a library ,io is instance of websocket server
// io  allows us to listen events and emit events 
const server=http.createServer(app)// converts  app  as fully functional http so it can work for both rest api and websockets

//io is a websockets server 
const io=socket(server)// attach web socket to http server

app.use(exp.static('public'))// means any files in this folder can be acessed directly in browser(localhost 8000)
// no need to run live server static files are html,css, js

const users=new Set()// it prevents duplicates
//.on(event,callback) listen to event that was emitted(receiving that event),simply declaring function
// emit is used to send an event to all connected clients , means calling a functio
io.on("connection",(socket)=>{// when user connect to server it runs connection event
    // this can be emit automatomaticlly when user connet
    console.log(" user in connection.")
    // socket represents connected clients( BROWSER ), each clent gets unquie socket object when they connect
    socket.on("join",(username)=>{
       // server uses socket obj to send and receive message only when there are in connection
       socket.username=username
       users.add(username) 
       //to display to all users
       io.emit("userjoined",username)
       //send update list to all clients
       io.emit("list",Array.from(users))

    })
    socket.on("chatmess",(message)=>{
        io.emit("chatmess",message)
    })
    socket.on("disconnect",()=>{
      
        users.forEach((i)=>{
            if(i === socket.username ){
                users.delete(i)
                io.emit("userleft",i)
            io.emit("list",Array.from(users))
            }
            
        })
       
    })
    
})

server.listen(8000,()=>{
    console.log("connecting...")
})