import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { UserDataService } from '../user-data.service';
import { UserInfo,perInfo } from '../user.model';

@Component({
  selector: 'app-simple-port-folio',
  templateUrl: './simple-port-folio.component.html',
  styleUrls: ['./simple-port-folio.component.css']
})
export class SimplePortFolioComponent implements OnInit {
  msg:string="";
  userName:string="";
  flagViewTemp :boolean = false; // for view T=Registaration form template
  flagHideLogin: boolean = true; // for view login 
  showMyData: boolean =  false;
  showTable:boolean = false;
  //array declaration for portfolio part
  perArray:Array<perInfo> = [];

  //array declaration
  userArray : Array<UserInfo> = []
  constructor(){}
 

  ngOnInit(): void {
  }
  
  // for the login page
  loginUser(loginRef:NgForm){
    let newArr = this.userArray;
  
    console.log("newArr===",newArr);
    let login = loginRef.value; // access value

      // check for array length
    if  (newArr.length == 0 ){
        this.msg="User not found";
    }
    for (let ab in newArr){
     
      let tempArr = Object.values(newArr[ab]);
     
      //check for credentials
      if (login.user == tempArr[2] && login.pass == tempArr[3])
      {
        this.msg = "successful";
        this.userName = tempArr[2]; // assign username to msg
        this.showMyData = true; // set true 
        this.flagHideLogin = false;
      }else{
        this.msg="User not found";
      }
    } 
  }    
  

  // for the control signup button to hidden view
  viewTemp(){
    this.flagViewTemp = true;
    this.flagHideLogin = false;
  }
// for the login button in registaration form
  backToLogin(){
    this.flagViewTemp = false;
    this.flagHideLogin = true;
  }

  // for the signup page
  createSign(signUpRef:NgForm){
    let signup:UserInfo = signUpRef.value; //access interfce DI service
    this.userArray.push(signup);//push into array
    //console.log("array data is:",this.userArray);
    signUpRef.reset();
  }

  // for the portFolio page
  saveData(cnameRef:any, cnoRef:any){
    let save:perInfo = {cName:cnameRef.value, cNo:cnoRef.value};
    this.perArray.push(save);
    console.log("arrayv data:",this.perArray);
  }

  clickData(){ //after click on contact details
    this.showTable = true;
  }
}
