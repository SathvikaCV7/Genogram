import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Relationship } from '../models/Relationship';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  constructor(private http:HttpClient) { 
  }

  baseApiUrl= environment.baseApiUrl;

  addRelationship(result:Relationship){
    debugger;
    return this.http.post<Relationship>(this.baseApiUrl+"relationship/Add",result)
  }

  updateRelationship(result:Relationship){
    debugger;
    return this.http.post<Relationship>(this.baseApiUrl+"relationship/edit",result)
  }
}
