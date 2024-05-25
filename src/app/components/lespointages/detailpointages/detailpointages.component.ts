import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ManagerService } from '../../list-planning-collaborateurs/services/ManagerService';

@Component({
  selector: 'app-detailpointages',
  templateUrl: './detailpointages.component.html',
  styleUrls: []
})
export class DetailpointagesComponent implements OnChanges {
  pointagesdata:any;
  @Input() datePointage: string = '';
  constructor(private managerservice: ManagerService) { }
  convertObjectToArray(obj: any): any[] {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }
  ngOnChanges(): void {
    debugger;
    
    console.log(this.datePointage);
    this.managerservice.getPointages(this.datePointage).subscribe({
      next: (data:any) => {
        debugger;
        this.pointagesdata=this.convertObjectToArray(data);
        
      },
      error: (error) => {
          console.log(error)
      },
      complete: () => {
          console.log('complete')
      }
    })
  }
  calculateWorkDuration(pointages: any[]): string {
    debugger;
    let totalMinutes = 0;

    // Parcourir tous les pointages pour calculer la durée totale de travail
    for (let val of pointages) {
      if(val.heureSortie!==null){
        // Convertir les heures d'entrée et de sortie en objets Date
        const startTime = new Date('1970-01-01T' + val.heureEntree);
        const endTime = new Date('1970-01-01T' + val.heureSortie);

        // Calculer la différence en minutes entre l'heure de début et de fin
        const diffMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

        // Ajouter la différence à la durée totale
        totalMinutes += diffMinutes;
      }
    }

    // Convertir la durée totale de travail en heures et minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Formater la durée en heures et minutes
    return hours + 'h ' + minutes + 'min';
}


}
