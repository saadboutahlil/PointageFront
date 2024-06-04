import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit{
  sidebarMenu: sidebarMenu[]=[];
  search: boolean = false;
  profilsession!:string|null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route: ActivatedRoute,private router: Router,
    private localservice :LocalStorageService 
  ) { }
  ngOnInit(): void {
    debugger;
    this.localservice.getItem("typeProfil");
    this.localservice.getItem("utilisateurId");
this.profilsession=this.localservice.getItem("typeProfil");
this.construct_Menu(this.localservice.getItem("typeProfil"));
  }
  routerActive: string = "activelink";
public construct_Menu(profil :string|null):sidebarMenu[]{
  if(profil==="RH"){
    this.sidebarMenu.push(  {
      link: "/inscription",
      icon: "users",
      menu: "Inscription",
    });
    this.sidebarMenu.push(  {
      link: "/informationCollaborateur",
      icon: "list",
      menu: "Informations Collaborateur",
    });
  }
  else if(profil==="Manager"){
    this.sidebarMenu.push( {
      link: "/planning",
      icon: "list",
      menu: "Planning",
    });
    this.sidebarMenu.push(  {
      link: "/listPlanning",
      icon: "list",
      menu: "Liste des plannings",
    });
    this.sidebarMenu.push(  {
      link: "/lesPointages",
      icon: "list",
      menu: "Liste des pointages",
    }); 
      this.sidebarMenu.push(  {
      link: "/validationConge",
      icon: "list",
      menu: "Validation de congé",
    });

  }
  else if(profil==="Collaborateur"){

    this.sidebarMenu.push(  {
      link: "/calendrierCollaborateur",
      icon: "list",
      menu: "Calendrier",
    });
    
    this.sidebarMenu.push(  {
      link: "/monPointage",
      icon: "list",
      menu: "Mon pointage",
    });
      
    this.sidebarMenu.push(  {
      link: "/monConge",
      icon: "list",
      menu: "Demande Conge",
    });
  }




  return this.sidebarMenu;
}
SeDeconnecter(){
  localStorage.clear();
  this.router.navigate(['/']);
}

}
