import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InscriptionService } from './services/InscriptionService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
})
export class InscriptionComponent implements OnInit {
  userForm!:FormGroup;
  checked = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private router: Router,private usService : InscriptionService,private formbuilder:FormBuilder
    ,private _snackBar: MatSnackBar
  ) {    
    this.userForm=this.formbuilder.group({ login:['',[Validators.required]],password:['',[Validators.required]],telephone:[''],
      email:['',[Validators.required]], nom:['',[Validators.required]],prenom:['',[Validators.required]],dateNaissance:['',[Validators.required]],
      profil:[]

    });
   }
  inscription() {
    debugger;
    if(this.userForm.valid){
        this.usService.create(this.userForm.value).subscribe({
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

      
  ngOnInit(): void {}

  onBack(): void {
  }
}
