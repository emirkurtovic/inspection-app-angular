import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = environment.inspectionAPIUrl;
  constructor(private http: HttpClient) { }

  //Inspection

  getInspectionList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/inspections');
  }
  addInspection(data:any){
    return this.http.post(this.inspectionAPIUrl+'/inspections',data,{headers: new HttpHeaders({Authorization: 'Bearer '+JSON.parse(String(localStorage.getItem('user'))).token})});
  }
  updateInspection(id:number, data:any){
    return this.http.put(this.inspectionAPIUrl+'/inspections/'+id,data,{headers: new HttpHeaders({Authorization: 'Bearer '+JSON.parse(String(localStorage.getItem('user'))).token})});
  }
  deleteInspection(id:number){
    return this.http.delete(this.inspectionAPIUrl+'/inspections/'+id,{headers: new HttpHeaders({Authorization: 'Bearer '+JSON.parse(String(localStorage.getItem('user'))).token})});
  }

  //Inspection Type
  getInspectionTypesList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/inspectionTypes');
  }

  //Users
  getUsersList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/users',{headers: new HttpHeaders({Authorization: 'Bearer '+JSON.parse(String(localStorage.getItem('user'))).token})});
  }
  getUser(username:string):Observable<any>{
    return this.http.get<any>(this.inspectionAPIUrl+'/users/'+username,{headers: new HttpHeaders({Authorization: 'Bearer '+JSON.parse(String(localStorage.getItem('user'))).token})});
  }
  updateUser(username:string, data:any){
    return this.http.put(this.inspectionAPIUrl+'/users/'+username,data,{headers: new HttpHeaders({Authorization: 'Bearer '+JSON.parse(String(localStorage.getItem('user'))).token})});
  }
}
