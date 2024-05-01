import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InscriptionService } from './services/InscriptionService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
})
export class InscriptionComponent implements OnInit {
  userForm!:FormGroup;
  checked = true;
  
  constructor(private router: Router,private usService : InscriptionService,private formbuilder:FormBuilder) {

    
    this.userForm=this.formbuilder.group({
      login:['',[Validators.required]],
      password:['',[Validators.required]],
      telephone:[''],
      email:['',[Validators.required]],
      nom:['',[Validators.required]],
      prenom:['',[Validators.required]],
      dateNaissance:['',[Validators.required]],
      profil:[]

    });

   }

  ngOnInit(): void {}

  onBack(): void {
  }

  inscription() {
    debugger;
    if(this.userForm.valid){
        this.usService.create(this.userForm.value).subscribe({
          next: (response:any) => {
            debugger;
            alert("Enregistrement effectué avec succees");
          },
          error: (error: HttpErrorResponse) => {
             console.error(error);
          }
        });
      }
      }
}
