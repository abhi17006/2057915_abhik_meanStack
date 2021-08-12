
// function addData()
// {
//   //Working code here........
//     let btnId =  document.getElementById("value") as HTMLElement;
//     counter++;
//     btnId.innerHTML =  "" + counter;
// }


var counter : number =0;
let tempArr = [];
function addData(product:string, price:number)
{

  
    let btnId =  document.getElementById("value") as HTMLElement;
    
    btnId.innerHTML =  "" + counter;
    var pObjData = {product:null,price:null};
    if(product != null){

        pObjData = {
            'product': product,
            'price': price
        }
    }

    var cartOldData = localStorage.getItem("cartOldData");  
    if(cartOldData) {
        tempArr = JSON.parse(cartOldData);         
    }
    if(pObjData.product!=null){
        tempArr.push(pObjData);
    }
   
    localStorage.setItem("cartOldData",JSON.stringify(tempArr));
    console.log("Data store in session and local storage");
   btnId.innerHTML = "" + tempArr.length;
}





//(for html code)document.getElementById('pnameLbl'),document.getElementById('valLbl') 