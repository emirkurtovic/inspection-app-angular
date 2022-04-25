import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountApiService } from 'src/app/shared/account-api.service';
import { InspectionApiService } from 'src/app/shared/inspection-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //InspectionList$!:Observable<any[]>;
  //InspectionTypesList$!:Observable<any[]>;
  //proba sa forkJoin
  InspectionsList!:any[];
  InspectionTypesList!:any[];
  sub!: Subscription;
  sub2!: Subscription;
  childComponentOpen:boolean=false;
  childComponentAdd:boolean=true;
  //SelectedInspection:any;
  SelectedInspection:any;
  ModalTitle:string="";

  loggedIn!:boolean;
  user:User|null=null;

  constructor(private service: InspectionApiService, private accountService:AccountApiService) { }

  ngOnInit(): void {
    /*
    //this.InspectionList$=this.service.getInspectionList();--sa async pipe
    //sa subscribe
    this.sub=forkJoin([this.service.getInspectionList(),this.service.getInspectionTypesList()]).subscribe(data=>{
      for(let i=0;i<data[0].length;i++){
        data[0][i].inspectionType=data[1].find(el=>el.id===data[0][i].inspectionTypeId).name;
      }
      this.InspectionsList=data[0];
      this.InspectionTypesList=data[1];
      //user
      console.log("asad");
      //this.loggedIn=!!data[2];
      //if(data[2]) this.user=data[2];
      console.log("asad");
    });
    */
    this.sub=combineLatest([this.service.getInspectionList(),this.service.getInspectionTypesList(),this.accountService.currentUser$]).subscribe(data=>{
      /*
      for(let i=0;i<data[0].length;i++){
        data[0][i].inspectionType=data[1].find(el=>el.id===data[0][i].inspectionTypeId).name;
      }
      */
      this.InspectionsList=data[0];
      this.InspectionTypesList=data[1];
      //user
      this.loggedIn=!!data[2];
      this.user=data[2];
      //console.log(this.user);
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addModal(){
    this.childComponentAdd=true;
    this.childComponentOpen=true;
    this.ModalTitle="Add Inspection";
  }

  editModal(item:any){
    this.childComponentAdd=false;
    this.SelectedInspection=item;
    this.childComponentOpen=true;
    this.ModalTitle="Update Inspection";
  }
  closeModal(){
    this.childComponentOpen=false;
    this.sub.unsubscribe();
    this.sub=combineLatest([this.service.getInspectionList(),this.service.getInspectionTypesList(),this.accountService.currentUser$]).subscribe(data=>{
      /*
      for(let i=0;i<data[0].length;i++){
        data[0][i].inspectionType=data[1].find(el=>el.id===data[0][i].inspectionTypeId).name;
      }
      */
      this.InspectionsList=data[0];
      this.InspectionTypesList=data[1];
      //user
      this.loggedIn=!!data[2];
      this.user=data[2];
      //console.log(this.user);
    });
  }
  deleteInspection(id:number){
    if(confirm("Are you sure that you want to delete inspection?")){
      this.sub.unsubscribe();
      this.sub=this.service.deleteInspection(id).subscribe(res=>{
        this.closeModal();
        //success alert
        var showAddSuccess=document.getElementById('delete-success-alert');
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

  getCurrentUser(){
    this.sub2=this.accountService.currentUser$.subscribe(res=>{
      this.loggedIn=!!res;
      if(res) this.user=res;
      //console.log(res);
    });
  }
}
