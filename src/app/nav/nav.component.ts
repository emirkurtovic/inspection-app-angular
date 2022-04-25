import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountApiService } from '../shared/account-api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  childComponentOpen:boolean=false;
  childComponentLogin:boolean=true;
  ModalTitle:string="";
  loggedIn!:boolean;
  username:string="";
  
  sub!:Subscription;

  constructor(private accountService:AccountApiService,private router:Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loginModal(){
    this.childComponentOpen=true;
    this.childComponentLogin=true;
    this.ModalTitle="Login";
  }
  registerModal(){
    this.childComponentOpen=true;
    this.childComponentLogin=false;
    this.ModalTitle="Register";
  }
  closeModal(event:boolean){
    let buttonModalClose=document.getElementById('modal-add-edit-close2');
    if(buttonModalClose){
      buttonModalClose.click();
    }
    //this.childComponentOpen=event;
  }

  getCurrentUser(){
    this.sub=this.accountService.currentUser$.subscribe(res=>{
      this.loggedIn=!!res;
      if(res) this.username=res.username;
    });
  }

  logout(){
    this.accountService.Logout();
    this.router.navigateByUrl('/');
  }

}
