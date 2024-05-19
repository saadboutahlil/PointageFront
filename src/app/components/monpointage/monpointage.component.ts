import { Component, OnInit } from '@angular/core';
import { monpointageService } from './services/monpointage';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-monpointage',
  templateUrl: './monpointage.component.html',
  styleUrls: []
})
export class MonpointageComponent implements OnInit {
  toggleChecked = false;
  constructor(private readonly _pointage:monpointageService,  private localservice :LocalStorageService ) { }

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
      (error) => console.error('Erreur lors de la récupération du pointage:', error)
    );
  }
  onToggleChange(event: any) {
   debugger;
   if(event.checked){
    this._pointage.badge(event.checked,this.localservice.getNumber('utilisateurId')).subscribe({
      next: (response:any) => {
        debugger;
        alert("Enregistrement effectué avec succees");
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
        alert("modification effectuée avec succees");
      },
      error: (error: HttpErrorResponse) => {
         console.error(error);
      }
    });
   }

  }
}
