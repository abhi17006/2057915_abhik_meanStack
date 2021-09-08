let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let http = require("http");
//url 
let url = "mongodb://localhost:27017/tcsMean";
mongoose.pluralize(null); 

//creating the reference of express module 
let app = express();

// connect the database it return promise object 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

//to use this db connection we have to call function 
let db = mongoose.connection;
db.once("open",()=> {
    // We have to defined schema which provide the structure for collection 
    let courseSchema = mongoose.Schema({
        _id:Number,
        cname:String,
        desc:String,
        Amount:Number
    });

    let courseModel = mongoose.model("CourseInfo", courseSchema);

    // which is use to enable post data receving from normal html form. 
    app.use(bodyParser.urlencoded({extended:true}))

    app.get("/index",(request,response)=> {
    
        response.sendFile(__dirname+"\\index.html");
    })

    app.get("/AddCourse",(request,response)=> {
    
        response.sendFile(__dirname+"\\addCourse.html");
    })

    app.get("/UpdateCourse",(request,response)=> {
    
        response.sendFile(__dirname+"\\updateCourse.html");
    })

    app.get("/DeleteCourse",(request,response)=> {
    
        response.sendFile(__dirname+"\\deleteCourse.html");
    })
//fetch data
    app.get("/FetchCourse",(request,response)=> {
    
        courseModel.find({},(err,doc)=> {
            response.writeHead(200,{"content-type":"text/html"});
            if(!err){   
                response.write("<h2>List of Courses</h2>");  
                response.write("<a href='index'>Main Page</a>");  
                response.write("<table border=1><tr><th>ID</th><th>Course Name</th><th>Description</th><th>Cost</th></tr>");
                doc.forEach(rec=> {
                    response.write("<tr><td>"+rec._id+"</td><td>"+rec.cname+"</td><td>"+rec.desc+"</td><td>"+rec.Amount+"</td></tr>");
                });
                response.write("</table>");
                response.end();
            }else{
                console.log(err);
            }
            //mongoose.disconnect();
        })           
            
    })

    app.post("/addData",(request,response)=> {
       
        let addDetails = request.body;
        courseModel.insertMany(addDetails, (err, result)=>{
            response.writeHead(200,{"content-type":"text/html"});
            if(!err){
              response.write("<span style='color:blue'><b>Task Stored Successfully</b></span> <br/>");
              response.write("<a href='index'>Main Page</a>");
            }else{
                response.send(err);
            }
            mongoose.disconnect();
        })   
    
    })

    //update data
    app.get("/updateData",(request,response)=> {
        let uId = request.query["cid"];
        let newAmt = request.query["amt"]
        let newVal = {$set:{Amount:newAmt}};
       
        courseModel.updateOne({_id:uId},newVal,(err,result)=> {
            if(!err){
                console.log(result)
                if(result.modifiedCount>0 || result.matchedCount>0){
                        console.log("Product updated successfully")
                }else {
                        console.log("Prouct didn't update");
                }
            }else {
                console.log(err);   
            }    
        })   
    })  

    //delete  data
    app.get("/deleteData",(request,response)=> {
        let uId = request.query["cid"];

        courseModel.deleteOne({_id:uId},(err,result)=> {
            response.writeHead(200,{"content-type":"text/html"});
            if(!err){
                console.log(result)
                if(result.deletedCount > 0){
                        console.log("Record Deleted successfully");
                        response.write("<span style='color:blue'><b> Deleted Successfully</b></span> <br/>");
                        response.write("<a href='index'>Main Page</a>");
                }else {
                        console.log("Prouct didn't delete");
                        response.write("<span style='color:blue'><b>Not Found</b></span> <br/>");
                        response.write("<a href='index'>Main Page</a>");
                }
            }else {     
                console.log(err);   
            }
            mongoose.disconnect();
        })   
    })  
   

    
})     
  
app.listen(9090,()=>console.log("Server running on port number 9090"));