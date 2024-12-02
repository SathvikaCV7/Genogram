import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Child } from '../models/Child';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChildDetailsService {
  constructor(private http:HttpClient) { 
  }

  baseApiUrl= environment.baseApiUrl;

  getChild(childId:string|null):Observable<Child>{
   return  this.http.get<Child>(this.baseApiUrl+`Child/${childId}`);
  }

  updateChild(child:Child):Observable<Child>{
    return this.http.post<Child>(this.baseApiUrl+`Child/EditChild`,child)
  }

}
