import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { connexionserviceService } from './services/connexion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurInfoDto } from './models/UtilisateurInfoDto';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: []
})
export class ConnexionComponent implements OnInit {
  userForm!:FormGroup;
  
  constructor(private router: Router,private usService : connexionserviceService,private formbuilder:FormBuilder,
    private localservice :LocalStorageService 
  ) { 

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
if(response!==null){
  this.localservice.setItem('typeProfil',response.type);
  this.localservice.setItem('utilisateurId',""+response.utilisateur.id);
  this.localservice.setItem('nom',""+response.utilisateur.nom);
  this.localservice.setItem('prenom',""+response.utilisateur.prenom);
  if(response.type==="Manager"){
  this.router.navigate(['/planning']);
}
else if(response.type==="Collaborateur"){
  this.router.navigate(['/calendrierCollaborateur']);
}
else if(response.type==="RH"){
  this.router.navigate(['/inscription']);
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
