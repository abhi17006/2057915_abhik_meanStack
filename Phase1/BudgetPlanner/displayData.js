
function displayData(){
    let sumBud = 0;
    var total =0;
    const oldData = localStorage.getItem("oldData");
    const empJson = JSON.parse(oldData);
          
    var startTable = "<table border=1><tr> <th>Client Name</th> <th>Project Name</th> <th>Budget</th> </tr>" ; 
    let tableContent = " ";
    var row = document.createElement("tr");
    var row ="";
    for  (var x in empJson){
            
        tableContent += "<tr><td>"+empJson[x].cName +"</td><td>" +empJson[x].pName+ "</td><td>" +empJson[x].budID+ "</td></tr>";
        sumBud += parseFloat(empJson[x].budID);
        
    }
    //sum of the all the numbers
    //total += sumBud;
    
    var endTable = "</table>";
    tableContent = startTable+tableContent+endTable;
    
   //print data in html using ID
    document.getElementById("mine").innerHTML=tableContent;
    document.getElementById("main").innerHTML="Total="+sumBud;
    
    
}

