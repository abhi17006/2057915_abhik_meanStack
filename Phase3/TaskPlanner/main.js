let http = require("http");
let url = require("url");
let fs = require("fs");
let indexPage = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AddTask</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

</head>
<body>
    <h2>Task Planner</h2>
    <br/>
    <a class="btn btn-primary" href="AddTask" role="button">Add Task</a>
    <a class="btn btn-primary" href="DeleteTask" role="button">Delete Task</a>
    <a class="btn btn-primary" href="ListTask" role="button">List Task</a>

</body>
</html>
`
let addTaskPage = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AddTask</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

</head>
<body>
    <h2>Add Task</h2>
    <form action="addTaskData">
        <label class="form-label">Emp Id:</label>
        <input type="text"  class="form-control" name="empId" id="eid" required/><br/>
        <label class="form-label">Task Id:</label>
        <input type="text"  class="form-control" name="taskId" id="tid" required/><br/>
        <label class="form-label">Task:</label>
        <input type="text"  class="form-control" name="taskName" id="tname" required/><br/>
        <label class="form-label">Deadline:</label>
        <input type="date"  class="form-control" name="date" id="date" required/><br/>
        <input type="submit" value="Add Task">
        <a href="Home">Home </a>
    </form>
    
</body>
</html>`

let deleteTaskPage =
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Task</title>
</head>
<body>
    <h2>Delete Task</h2>
    <form action="deleteTaskData">
        <label>Task Id:</label>
        <input type="text" name="dtask" id="dtask"><br/>
        <input type="submit" value="Delete Task">
        <a href="Home">Home </a>
    </form>
</body>
</html>
`

let listTaskPage=
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List Task</title>
</head>
<body>
    <h2>List Task</h2>

    <table border="1">
    <tr>
        <th>Emplooyee Id</th>
        <th>Task Id</th>
        <th>Task Name</th>
        <th>Date</th>
    </tr>
    
    <a href="Home">Home </a>
</body>
</html>`


let server = http.createServer((request,response)=>{
    let urlInfo = url.parse(request.url,true);

    if(urlInfo.path != "/favicon.ico"){
        console.log("We are on Mission");
        if(urlInfo.path == "/AddTask"){
            response.write(addTaskPage);
        }else if(urlInfo.pathname == "/addTaskData"){
            let taskVar = urlInfo.query;
            let taskData = JSON.parse(fs.readFileSync("taskData.json").toString());
            taskData.push(taskVar); //push into array
            fs.writeFileSync("taskData.json",JSON.stringify(taskData));

            response.writeHead(200,{"content-type":"text/html"});
            response.write(addTaskPage);
            response.write("<span style='color:blue'><b>Task Stored Successfully</b></span>");       
        }
        else if(urlInfo.path == "/DeleteTask"){
            response.write(deleteTaskPage);
        }
        else if(urlInfo.pathname == "/deleteTaskData"){
            let taskVar = urlInfo.query;
            let taskData = JSON.parse(fs.readFileSync("taskData.json").toString());
           
            let index = taskData.findIndex(cVar =>cVar.taskId == taskVar.dtask);
            response.writeHead(200,{"content-type":"text/html"});
            if (index != -1){
                taskData.splice(index,1);   
                fs.writeFileSync("taskData.json",JSON.stringify(taskData));
                response.write(deleteTaskPage);
                response.write("<span style='color:blue'><b>Task Deleted.</b></span>");
            }else{
                response.write("<span style='color:red'>Task Id is NOT Found </span>");
                response.write(deleteTaskPage);
            }
        }
        else if(urlInfo.path == "/ListTask"){
            response.write(listTaskPage);
          //get jason array data
            let taskData = JSON.parse(fs.readFileSync("taskData.json").toString());
            taskData.find(l=>{
                response.write('<tr>');
                response.write('<td>');
                response.write(l.empId);
                response.write('</td>');
                response.write('<td>');
                response.write(l.taskId);
                response.write('</td>');
                response.write('<td>');
                response.write(l.taskName);
                response.write('</td>');
                response.write('<td>');
                response.write(l.date);
                response.write('</td>');
                response.write('</tr>');
               
            });
            response.write('</table>');

        }else if(urlInfo.path == "/Home"){
            response.write(indexPage);
        }
        else{
            response.write(indexPage);
        }
    }
    response.end();
     
});

server.listen(9091, ()=>console.log("server is running on port number"));