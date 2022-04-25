import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map, Observable, Subscription } from 'rxjs';

import { AccountApiService } from 'src/app/shared/account-api.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  
  @Input() childComponentLogin:any;
  @Output() openedEvent=new EventEmitter<boolean>();
  
  sub!: Subscription;
  sub2!:Subscription;
  username:string="";
  password:string="";

  constructor(private service: AccountApiService, private toastService: ToastrService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }

  loginUser(){
    var user={
      username:this.username,
      password:this.password
    }
    this.sub=this.service.Login(user).subscribe({
      next: (res)=>{
        //zatvaranje modula - ovaj put preko komunikacije child sa parent
        this.openedEvent.emit(false);
        //neke akcije
      },
      error: (err)=>{
        this.toastService.error(err.error);
      }
    });
  }
  
  registerUser(){
    var user={
      username:this.username,
      password:this.password
    }
    this.sub2=this.service.Register(user).subscribe({
      next: (res)=>{
        //zatvaranje modula - ovaj put preko komunikacije child sa parent
        this.openedEvent.emit(false);
        //success alert- i ovo mozemo kasnije preko komunikacije sa parent?
        var showAddSuccess=document.getElementById('register-success-alert');
        if(showAddSuccess){
          showAddSuccess.style.display="block";
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display="none";
          }
        },4000);
      },
      error: (err)=>{
        this.toastService.error(err.error);
      }
    });
  }
  

}
