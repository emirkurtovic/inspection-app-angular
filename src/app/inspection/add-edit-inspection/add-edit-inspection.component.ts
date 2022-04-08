import { Component, OnInit, Input} from '@angular/core';
import { InspectionApiService } from 'src/app/shared/inspection-api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  @Input() InspectionTypesList!:any[];
  @Input() childComponentAdd:any;
  @Input() SelectedInspection:any;

  //ngModel ne moze bind na undefined na pocetku, pa cemo uvest ove atribute
  id:number=0;
  inspectionTypeId!:number;
  status:string="";
  comment:string="";
  inspectionType:string="";

  sub!: Subscription;

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    if(this.childComponentAdd===false){
      this.id=this.SelectedInspection.id;
      this.inspectionTypeId=this.SelectedInspection.inspectionTypeId;
      this.status=this.SelectedInspection.status;
      this.comment=this.SelectedInspection.comment;
      this.inspectionType=this.SelectedInspection.inspectionType;
    }
  }
  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  addInspection(){
    var inspection={
      status:this.status,
      comment:this.comment,
      inspectionTypeId:this.inspectionTypeId
    };
    //console.log(inspection);
    this.sub=this.service.addInspection(inspection).subscribe(res=>{
      //zatvaranje modula
      var buttonModalClose=document.getElementById('modal-add-edit-close');
      if(buttonModalClose){
        buttonModalClose.click();
      }
      //success alert
      var showAddSuccess=document.getElementById('add-success-alert');
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
  updateInspection(){
    var inspection={
      id:this.id,
      status:this.status,
      comment:this.comment,
      inspectionTypeId:this.inspectionTypeId
    };
    //console.log(inspection);
    this.sub=this.service.updateInspection(Number(this.id),inspection).subscribe(res=>{
      //zatvaranje modula
      var buttonModalClose=document.getElementById('modal-add-edit-close');
      if(buttonModalClose){
        buttonModalClose.click();
      }
      //success alert
      var showAddSuccess=document.getElementById('update-success-alert');
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
