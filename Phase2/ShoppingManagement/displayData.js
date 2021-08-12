// function displayData(){
//     const cart = localStorage.getItem("cart");
//     const dataJson = JSON.parse(cart);    
//     var startTable = "<table border = 1,text-align:Center><tr> <th>Product</th> <th>Price</th></tr>"  
//     let tableContent = "";
//     var row = document.createElement("tr")
//     var total = 0;
//     for  (var i in dataJson){
//        console.log("i", dataJson[i]);        
//        tableContent += "<tr><td>"+dataJson[i].product +"</td>" + "<td>$"+dataJson[i].price +"</td><tr/>";
//         total = total+dataJson[i].price;
//     }
//     //totalBudget += total;
//     console.log("table content", tableContent);
//     var endTable = "</table>"
//     tableContent = startTable+tableContent+endTable;
//     tableContent = tableContent+"<br/>Total : $"+total.toString()
//     document.getElementById("main").innerHTML=tableContent;
// }
function displayData() {
    var sumBud = 0;
    var total = 0;
    //get data from localStorage
    var oldData = localStorage.getItem("cartOldData");
    var cartJson = JSON.parse(oldData);
    // create dynamic table    
    var startTable = "<table border=1><tr> <th>Product</th>  <th>Price</th> </tr>";
    var tableContent = " ";
    // loop for array data 
    for (var x in cartJson) {
        //create new row and save in rows  
        tableContent += "<tr><td>" + cartJson[x].product + "</td><td>" + cartJson[x].price + "</td></tr>";
        sumBud += parseFloat(cartJson[x].price); // add price column data
    }
    //sum of the all the numbers
    //total += sumBud;
    var endTable = "</table>";
    tableContent = startTable + tableContent + endTable;
    //print data in html using ID
    document.getElementById("mine").innerHTML = tableContent;
    document.getElementById("main").innerHTML = "Total=" + sumBud;
}
