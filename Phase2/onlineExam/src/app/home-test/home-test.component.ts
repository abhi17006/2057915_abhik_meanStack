import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';

import { TestHService } from '../test-h.service';
import { Test } from '../testHome.models';
//import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrls: ['./home-test.component.css']
})
export class HomeTestComponent implements OnInit {
 msg:string="";
  flagsYes :boolean[] = [false,false,false,false,false,false,false,false,false,false];
  flagsNo :boolean[] = [false,false,false,false,false,false,false,false,false,false];
 //array declaration for TEST class
  testArr:Array<Test>=[];
  counter: number = 0; // counter var
  showResults: boolean = false;
  pass:boolean = false;
  fail:boolean = false;
  

  constructor(public tstInfo : TestHService, public form:FormBuilder) {
   }
  
  ngOnInit(): void {
    this.tstInfo.testHomeInfo().subscribe(arrData=>this.testArr=arrData);
    console.log("array",this.testArr);
  }
  
  //checking for temp data to print message
  checkForTrue(index:number): boolean{
   return this.flagsYes[index];
  }
  checkForFalse(index:number): boolean{
    return this.flagsNo[index];
  }

  testSubmit(testRef:NgForm){
     let testS = testRef.value;

    // console.log("print here MY name Abhi",testS);
    //getting selected values into array
    let tempArr = Object.values(testS);
    // console.log("nweww selected arraqy",tempArr); // selected values in array
    var ansArr= [];

    //geetiing ans values into one array
    for(let ll in this.testArr){
      let azArr = Object.values(this.testArr[ll]);//array ans ans from json
      ansArr.push(azArr[5]);//push 5th element into array
    }
      
      // console.log("nweww answed arraqy",ansArr);
      // console.log("nweww answed arraqy",tempArr.length);

      for(let i=0; i<tempArr.length; i++)
      {
          // console.log("ansArr[i]",ansArr[i]);
          // console.log("tempArr[i]",tempArr[i]);
        //check for values
          if(ansArr[i] == tempArr[i]){
            this.flagsYes[i] = true;
            this.flagsNo[i] = false;
           
            //  console.log("print array boolena",this.flagsYes);
            //  console.log("print array boolena",this.flagsNo);
            this.counter++;
          }
          else{        
            this.flagsYes[i] = false;
            this.flagsNo[i] =  true;
          
            // console.log("print array boolena",this.flagsYes);
            // console.log("print array boolena",this.flagsNo);
          }   
      }

    this.showResults=true;
    if(this.counter>=6) {
      this.pass=true;
      this.fail=false;
    }
    else{
      this.pass=false;
      this.fail=true;
    }

  }
}


