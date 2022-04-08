import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { InspectionApiService } from 'src/app/shared/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  //InspectionList$!:Observable<any[]>;
  //InspectionTypesList$!:Observable<any[]>;
  //proba sa forkJoin
  InspectionsList!:any[];
  InspectionTypesList!:any[];
  sub!: Subscription;
  childComponentOpen:boolean=false;
  childComponentAdd:boolean=true;
  //SelectedInspection:any;
  SelectedInspection:any;
  ModalTitle:string="";

  constructor(private service: InspectionApiService) { }

  ngOnInit(): void {
    //this.InspectionList$=this.service.getInspectionList();--sa async pipe
    //sa subscribe
    this.sub=forkJoin([this.service.getInspectionList(),this.service.getInspectionTypesList()]).subscribe(data=>{
      for(let i=0;i<data[0].length;i++){
        data[0][i].inspectionType=data[1].find(el=>el.id===data[0][i].inspectionTypeId).name;
      }
      this.InspectionsList=data[0];
      this.InspectionTypesList=data[1];
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
    this.sub=forkJoin([this.service.getInspectionList(),this.service.getInspectionTypesList()]).subscribe(data=>{
      for(let i=0;i<data[0].length;i++){
        data[0][i].inspectionType=data[1].find(el=>el.id===data[0][i].inspectionTypeId).name;
      }
      this.InspectionsList=data[0];
      this.InspectionTypesList=data[1];
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
}
