import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Child } from './models/Child';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildDetailsService {
  constructor(private http:HttpClient) { 
  }

  baseApiUrl= environment.baseApiUrl;

  getChild():Observable<Child>{
   return  this.http.get<Child>(this.baseApiUrl+"Child/1");
  }

}
