import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MonCongeService } from './services/MonCongeService';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CongeDTO } from './models/CongeDto';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-monconge',
  templateUrl: './monconge.component.html',
  styleUrls: []
})
export class MoncongeComponent implements OnInit {
  congeDto!: CongeDTO;
  infoCongeForm!:any;
  datainfos!: any;
  displayedColumns: string[] = ['Date congé', "Nbr de jour", 'Etat'];
  constructor(private plaservice: MonCongeService,private formbuilder:FormBuilder,private datePipe: DatePipe,
    private localservice :LocalStorageService 
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
        isValidManager:null,
        isValidRH:null
    };

      this.plaservice.saveConge(this.congeDto).subscribe({
        next: (response:any) => {
          debugger;
            alert("Enregistrement effectué avec succees");
            this.afficherList();
         
        },
        error: (error: HttpErrorResponse) => {
           console.error(error);
        }
      });
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
