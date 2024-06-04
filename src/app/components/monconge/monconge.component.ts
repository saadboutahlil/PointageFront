import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MonCongeService } from './services/MonCongeService';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CongeDTO } from './models/CongeDto';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-monconge',
  templateUrl: './monconge.component.html',
  styleUrls: []
})
export class MoncongeComponent implements OnInit {
  congeDto!: CongeDTO;
  infoCongeForm!:any;
  datainfos!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['Date congé', "Nbr de jour", 'Etat'];
  constructor(private plaservice: MonCongeService,private formbuilder:FormBuilder,private datePipe: DatePipe,
    private localservice :LocalStorageService ,private _snackBar: MatSnackBar
  ) { 
    this.infoCongeForm=this.formbuilder.group({
      dateConge:[''],
      nbrJour:['']

    });
  }
  ngOnInit(): void {
    this.afficherList();
  }

  saveInformation():void{  
    if(this.infoCongeForm.valid){
      this.infoCongeForm.value.dateConge= this.datePipe.transform(this.infoCongeForm.value.dateConge, 'yyyy-MM-dd');
      this.congeDto ={
        dateConge: this.infoCongeForm.value.dateConge,
        collaborateurId: this.localservice.getNumber('utilisateurId'),
        nbrJour: this.infoCongeForm.value.nbrJour,
        isValidManager:null
    };
    if( this.datainfos.filter((conge:any) => conge.isValidManager === null).length<1){
if(this.infoCongeForm.value.nbrJour>7){
  this._snackBar.open('vous avez en reliquat que 7 jours', 'Fermer', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
else{
      this.plaservice.saveConge(this.congeDto).subscribe({
        next: (response:any) => {
          debugger;
          this._snackBar.open('Enregistrement effectué avec succees', 'Fermer', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
            this.afficherList();
         
        },
        error: (error: HttpErrorResponse) => {
           console.error(error);
        }
      });
    }
    }
    else{
      this._snackBar.open('vous devez attendre la validation de votre demande pour saisir une autre', 'Fermer', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  }
afficherList(){
  this.plaservice.getConge().subscribe({
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
