import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanningService } from './services/PlanningService';
import { ListReferentielDto } from './models/ListReferentielDto';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
})
export class PlanningComponent implements OnInit {
  planningForm!:FormGroup;
  dataresult!: ListReferentielDto;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private formbuilder:FormBuilder,private plaservice: PlanningService,private datePipe: DatePipe
    ,private _snackBar: MatSnackBar
  ) {

    this.planningForm=this.formbuilder.group({
      from:[''],
      to:[''],
      typePlanningId:['',Validators.required],
      collaborateurId:['',Validators.required]

    });

   }
   public  afficherlist(){
    debugger;
    this.plaservice.getListReferentiel().subscribe({
      next: (data:ListReferentielDto) => {
        debugger;
        console.log(data);
        this.dataresult=data;
      },
      error: (error) => {
          console.log(error)
      },
      complete: () => {
          console.log('complete')
      }
    }) 
  }
  ngOnInit(): void {
    this.afficherlist();
    
  }
planning():void{
  console.log(this.planningForm.value);

  if(this.planningForm.valid){
    this.planningForm.value.from= this.datePipe.transform(this.planningForm.value.from, 'yyyy-MM-dd');
    this.planningForm.value.to= this.datePipe.transform(this.planningForm.value.to, 'yyyy-MM-dd');
    this.plaservice.savePlanning(this.planningForm.value).subscribe({
      next: (response:any) => {
        debugger;
        this._snackBar.open('Enregistrement effectué avec succees!!', 'Fermer', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
      error: (error: HttpErrorResponse) => {
         console.error(error);
      }
    });
  }

}
}
