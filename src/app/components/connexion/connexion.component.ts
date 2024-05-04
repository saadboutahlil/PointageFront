import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { connexionserviceService } from './services/connexion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurInfoDto } from './models/UtilisateurInfoDto';

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
      next: (response:UtilisateurInfoDto) => {
        debugger;
console.log(response.type);
if(response!==null){
  let navigationExtras: NavigationExtras = {
    queryParams: { 'typeProfil': response.type, 'utilisateurId': response.utilisateur.id
      ,'nom':response.utilisateur.nom,'prenom':response.utilisateur.prenom
    }
  };
  if(response.type==="Manager"){
  this.router.navigate(['/planning'], navigationExtras);
}
else if(response.type==="Collaborateur"){
  this.router.navigate(['/calendrierCollaborateur'], navigationExtras);
}
else if(response.type==="RH"){
  this.router.navigate(['/inscription'], navigationExtras);
}
}
else{
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
