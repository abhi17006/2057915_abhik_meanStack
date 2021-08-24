import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from './testHome.models';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestHService {

  constructor(public http:HttpClient) { }

  testHomeInfo():Observable<Test[]>{
    return this.http.get<Test[]>("/assets/dataQue.json")
  }

}


