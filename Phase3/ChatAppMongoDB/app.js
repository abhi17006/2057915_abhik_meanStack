let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
//url 
let url = "mongodb://localhost:27017/tcsMean";
mongoose.pluralize(null); 

//carete the rfereene of express module
let app = express();

//load the http module and connect to express module with server progr
let http = require("http").Server(app);

//load the socket.io module and connect http module
let io = require('socket.io')(http);

// connect the database it return promise object 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

//to use this db connection we have to call function 
let db = mongoose.connection;
db.once("open",()=> {
    // We have to defined schema which provide the structure for collection 
    let courseSchema = mongoose.Schema({
        uname:String,
        msgBx:String
        
    });

    let chatModel = mongoose.model("ChatApp", courseSchema);
   
    // which is use to enable post data receving from normal html form. 
    app.use(bodyParser.urlencoded({extended:true}))

    app.get("/", (req,res)=>{
        res.sendFile(__dirname+"\\index.html")
        //res.sendFile(__dirname+"\\temp.html")
    })



    listmsg=["How are you doing?", "How can we help you?", "ANything else we can do?", "Have a good day!"];
    var i =0;
    io.on("connection", (socket)=>{ 
        console.log("client connected");
        socket.emit("serRes","Welcome to the Server World!");
        socket.on("msgVar", (msg)=>{ 
            console.log(msg);
            let usrName = msg.msgUser;
            let usrMsg = msg.msgVar;
            //response
            if (i <4) 
            socket.emit('newMsg', usrMsg);
            console.log("i ="+i);
            socket.emit("serRes1",listmsg[i])
           
            //query
            chatModel.insertMany({uname:usrName, msgBx:usrMsg}, (err, result)=>{
                if(!err){
                    console.log("successful!")
                    //socket.emit("newMsg","stored successfully");
                }else{
                        response.emit("newMsg",err);
                }
            });
        //inc for the next value
        i = i +1;
        });
    
     
    })

})

http.listen(9090,()=>{console.log("Server sunning on port")});