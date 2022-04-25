import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { publicUser } from '../models/public-user';
import { AccountApiService } from '../shared/account-api.service';
import { combineLatest, Subscriber, Subscription } from 'rxjs';
import { InspectionApiService } from '../shared/inspection-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  LoggedUser:User|null=null;
  ViewUser:publicUser|null=null;
  username:string|null="";
  about:string="";

  sub!:Subscription;
  sub2!:Subscription;
  sub3!:Subscription;

  constructor(private service:InspectionApiService,private accountService:AccountApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.sub=combineLatest([this.service.getUser(String(this.route.snapshot.paramMap.get("username"))),this.accountService.currentUser$]).subscribe(data=>{

      this.ViewUser=data[0];
      this.LoggedUser=data[1];
      //user
      console.log("ViewUSer: "+this.ViewUser?.username);
      console.log("LoggedUSer: "+this.LoggedUser?.username);

    });
    */
    this.sub=combineLatest([this.route.paramMap,this.accountService.currentUser$]).subscribe(data=>{

      this.username=data[0].get("username");
      this.LoggedUser=data[1];
      this.sub2=this.service.getUser(String(this.username)).subscribe(res=>{
        this.ViewUser=res;
        if(this.ViewUser) this.about=this.ViewUser.about;
        //user
        //console.log("ViewUSer: "+this.ViewUser?.username);
        //console.log("LoggedUSer: "+this.LoggedUser?.username);
      });
    });
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
    if(this.sub3) this.sub3.unsubscribe();
  }
  
  updateUser(){
    if(this.LoggedUser){
      let _user={
        id:this.LoggedUser.id,
        username:this.LoggedUser.username,
        about:this.about
      }
      //console.log(inspection);
      this.sub3=this.service.updateUser(this.LoggedUser.username,_user).subscribe(res=>{
        if(this.ViewUser) this.ViewUser.about=this.about;
        //success alert
        var showAddSuccess=document.getElementById('update-success-alert3');
        if(showAddSuccess){
          showAddSuccess.style.display="block";
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display="none";
          }
        },4000);
      });
    }

  }

}
