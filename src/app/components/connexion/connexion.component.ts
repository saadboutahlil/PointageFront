import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { connexionserviceService } from './services/connexion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: []
})
export class ConnexionComponent implements OnInit {
  userForm!:FormGroup;
  constructor(private router: Router,private usService : connexionserviceService,private formbuilder:FormBuilder) { 

    this.userForm=this.formbuilder.group({
      login:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  navigateToConnexion() {
if(this.userForm.valid){
    this.usService.login(this.userForm.value).subscribe({
      next: (response:any) => {
        debugger;

        if(response==="Trouvé"){
          this.router.navigate(['/home']);
        }
        else{
          this.router.navigate(['/']);
          alert("login ou mdp incorrecte");
        }
      },
      error: (error: HttpErrorResponse) => {
         console.error(error);
      }
    });
  }
  }
}
