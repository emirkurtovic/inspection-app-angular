import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Unsubscribable } from 'rxjs';
import { User } from '../models/user';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  readonly inspectionAPIUrl = environment.inspectionAPIUrl;
  private currentUserSource=new ReplaySubject<User|null>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  //Login User
  Login(data:any){
    return this.http.post<any>(this.inspectionAPIUrl+'/account/login',data).pipe(
      map((x:User)=>{
        if(x){
          localStorage.setItem('user',JSON.stringify(x));
          this.currentUserSource.next(x);
        }
      })
    );
  }
  //Logout user
  Logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  //Register User
  Register(data:any){
    return this.http.post<any>(this.inspectionAPIUrl+'/account/register',data);
  }
  //SetCurrentUser
  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  
}
