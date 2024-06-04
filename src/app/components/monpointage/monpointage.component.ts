import { Component, OnInit } from '@angular/core';
import { monpointageService } from './services/monpointage';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-monpointage',
  templateUrl: './monpointage.component.html',
  styleUrls: []
})
export class MonpointageComponent implements OnInit {
  toggleChecked = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private readonly _pointage:monpointageService,  private localservice :LocalStorageService ,private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._pointage.getLastPointage(this.localservice.getNumber('utilisateurId')).subscribe(
      (data) => {
        if(!data.heureSortie){
this.toggleChecked=true;
        }
        else{
          this.toggleChecked=false;
        }
      },
      (error) => 
        this._snackBar.open('Erreur lors de la récupération du pointage!!', 'Fermer', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      
    );
  }
  onToggleChange(event: any) {
   debugger;
   if(event.checked){
    this._pointage.badge(event.checked,this.localservice.getNumber('utilisateurId')).subscribe({
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
   else{
    this._pointage.debadge(event.checked,this.localservice.getNumber('utilisateurId')).subscribe({
      next: (response:any) => {
        debugger;
        this._snackBar.open('modification effectuée avec succees!!', 'Fermer', {
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
