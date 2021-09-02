let express = require("express");

//carete the rfereene of express module
let app = express();

//load the http module and connect to express module with server progr
let http = require("http").Server(app);

//load the socket.io module and connect http module
//with IIFE features

let io = require('socket.io')(http);

app.get("/", (req,res)=>{
   // res.sendFile(__dirname+"\\index.html")
    res.sendFile(__dirname+"\\temp.html")
})

listmsg=["How are you doing?", "How can we help you?", "ANything else we can do?", "Have a good day!"];
var i =0;
io.on("connection", (socket)=>{
    console.log("client connected");
    socket.emit("serRes","Welcome to the Server World!");
    socket.on("msgVar", (msg)=>{
        console.log(msg);
        //Send message to everyone
         socket.emit('newMsg', msg);
         console.log("i ="+i);
         socket.emit("serRes1",listmsg[i])
         i = i +1;
        });
           
})


http.listen(9090,()=>{console.log("Server sunning on port")});