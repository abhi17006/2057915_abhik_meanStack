var indexData;
let temp = [];
function addData(){
    var input1 = document.getElementById("Clientname").value
    var input2 = document.getElementById("Projectname").value
    var input3 = document.getElementById("Budget").value

    indexData = {ClientName:input1, ProjectName:input2, Budget:input3};
    const dataObj = localStorage.getItem("dataObj");    
    if(dataObj) {
        temp = JSON.parse(dataObj); 
        
    }

    temp.push(indexData);
    localStorage.setItem("dataObj",JSON.stringify(temp));
    console.log("Data store in session and local storage");
}

function displayData(){

    const dataObj = localStorage.getItem("dataObj");
    const dataJson = JSON.parse(dataObj);    
    
    var startTable = "<table><tr> <th>Client Name</th> <th>Project Name</th> <th>Budget</th> </tr>"  
    let tableContent = " ";
    var row = document.createElement("tr")
    var row = " "
    for  (var i in dataJson){
       console.log("i", dataJson[i]);        
       tableContent += "<tr><td>"+dataJson[i].ClientName +"</td>" + "<td>"+dataJson[i].ProjectName +"</td>" + "<td>"+dataJson[i].Budget +"</td><tr/>";
       
    }

    //tableContent = "<tr><td>"+empJson.cName +"</td><td>"+empJson.pName+"</td><td>"+empJson.budID+"</td></tr>"
    console.log("table content", tableContent);
    var endTable = "</table>"
    tableContent = startTable+tableContent+endTable
    document.getElementById("main").innerHTML=tableContent; 
}