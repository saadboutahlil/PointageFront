import { Component, OnInit } from '@angular/core';
import { MonCongeService } from '../monconge/services/MonCongeService';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'src/app/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-validationconge',
  templateUrl: './validationconge.component.html',
  styleUrls: []
})
export class ValidationcongeComponent implements OnInit {
  infoCongeForm!:any;
  datainfos!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['Date congé', "Nbr de jour", 'Etat','Action'];
  constructor(private plaservice: MonCongeService,private datePipe: DatePipe,
    private localservice :LocalStorageService ,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.afficherList();
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
  changerEtat(val:boolean,congeId:number){
      this.plaservice.changerEtat(val,congeId).subscribe({
        next: (response:any) => {
          debugger;
          this._snackBar.open('Enregistrement effectué avec succees!!', 'Fermer', {
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
