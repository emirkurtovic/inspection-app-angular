import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = "https://localhost:7133/api";
  constructor(private http: HttpClient) { }

  //Inspection

  getInspectionList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/inspections');
  }
  addInspection(data:any){
    return this.http.post(this.inspectionAPIUrl+'/inspections',data);
  }
  updateInspection(id:number, data:any){
    return this.http.put(this.inspectionAPIUrl+'/inspections/'+id,data);
  }
  deleteInspection(id:number){
    return this.http.delete(this.inspectionAPIUrl+'/inspections/'+id);
  }

  //Inspection Type
  getInspectionTypesList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/inspectionTypes');
  }
  addInspectionType(data:any){
    return this.http.post(this.inspectionAPIUrl+'/inspectionTypes',data);
  }
  updateInspectionType(id:number, data:any){
    return this.http.put(this.inspectionAPIUrl+'/inspectionTypes/'+id,data);
  }
  deleteInspectionType(id:number){
    return this.http.delete(this.inspectionAPIUrl+'/inspectionTypes/'+id);
  }
}
