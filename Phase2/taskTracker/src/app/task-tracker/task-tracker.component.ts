//import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { taskDetails } from '../task.models';


@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {

  //call taskModels
  taskArray : Array<taskDetails> = [];
  showTable:boolean = false; // flag for show table data
  constructor() { 
  }

  ngOnInit(): void {
  }

  taskFun(idRef:any, nameRef:any, tnameRef:any, tdueRef:any){
    let taskEntry:taskDetails= {id:idRef.value, name:nameRef.value, task:tnameRef.value, tdate:tdueRef.value};
    this.taskArray.push(taskEntry);

    console.log("array data:",this.taskArray);

    console.log("array data:",taskEntry.id, taskEntry.name);

    console.log("array data:",taskEntry.task, taskEntry.tdate);

    this.showTable=true;
  }

}
