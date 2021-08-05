
//var arrayData = [];
var objData;
let tmpArray=[];
function addData(){
    //array[x] = document.getElementsByTagName("cname");
    var input1 = document.getElementById("cname").value
    var input2 = document.getElementById("pname").value
    var input3 = document.getElementById("budId").value
    

    objData = {cName:input1, pName:input2, budID:input3};
   //document.write(objData);

    //const oldData = []
    const oldData = localStorage.getItem("oldData");
    if (oldData){
        tmpArray=JSON.parse(oldData);
    }
    tmpArray.push(objData);

    localStorage.setItem("oldData",JSON.stringify(tmpArray));
    console.log("Data store in session and local storage");

        
}
