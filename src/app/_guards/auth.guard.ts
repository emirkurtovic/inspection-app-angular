import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountApiService } from '../shared/account-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountApiService,private router:Router){}
  
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user=>{
        if(user) return true;
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
  
}
