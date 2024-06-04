import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning/services/PlanningService';
import { ListReferentielDto } from '../planning/models/ListReferentielDto';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-collaborateur',
  templateUrl: './info-collaborateur.component.html',
  styleUrls: []
  
})
export class InfoCollaborateurComponent implements OnInit {

  infoCollaborateurForm!:any;
  dataresult!: ListReferentielDto;
  datainfos!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['Nom Complet', "Date d'embauche", 'Reliquat'];
  constructor(private plaservice: PlanningService,private formbuilder:FormBuilder,private datePipe: DatePipe
    ,private _snackBar: MatSnackBar
  ) { 
    this.infoCollaborateurForm=this.formbuilder.group({
      dateEmbauche:[''],
      reliquat:[''],
      collaborateurId:[],
      salaire:['']

    });
  }
  ngOnInit(): void {
    this.afficherList();
    this.plaservice.getListReferentiel().subscribe({
      next: (data:ListReferentielDto) => {
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

  saveInformation():void{  
    if(this.infoCollaborateurForm.valid){
      this.infoCollaborateurForm.value.dateEmbauche= this.datePipe.transform(this.infoCollaborateurForm.value.dateEmbauche, 'yyyy-MM-dd');
      this.plaservice.saveInformations(this.infoCollaborateurForm.value).subscribe({
        next: (response:any) => {
          debugger;
          if(response!=="saved"){
            this._snackBar.open('Ces informations du collaborateur existe deja', 'Fermer', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else{
            this._snackBar.open('Enregistrement effectué avec succees', 'Fermer', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.afficherList();
          }
         
        },
        error: (error: HttpErrorResponse) => {
           console.error(error);
        }
      });
    }
  
  }
afficherList(){
  this.plaservice.getInformations().subscribe({
    next: (data:any) => {
      debugger;
      console.log(data);
      this.datainfos=data;
    },
    error: (error) => {
        console.log(error)
    },
    complete: () => {
        console.log('complete')
    }
  })
}
}
