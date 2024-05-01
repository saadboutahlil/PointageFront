import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface typePlanification {
  id: number;
  type: string;
}
interface collaborateur {
  id: number;
  nom: string;
  prenom: string;
}
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
})
export class PlanningComponent implements OnInit {
  planningForm!:FormGroup;

 public  types: typePlanification[] = [
    {id: 1, type:'TT'},
    {id: 2, type:'Presentiel'},
    {id: 3, type:'Congé'},
  ];
  public  collaborateurs: collaborateur[] = [
    {id: 1, nom:'boutahlil',prenom:'saad'},
    {id: 2, nom:'boutahlil',prenom:'ziad'},
  ];
  constructor(private formbuilder:FormBuilder) {
   
    this.planningForm=this.formbuilder.group({
      from:[''],
      to:[''],
      typePlanning:['',Validators.required],
      collaborateur:['',Validators.required]

    });

   }

  ngOnInit(): void {
  }
planning():void{

}
}
