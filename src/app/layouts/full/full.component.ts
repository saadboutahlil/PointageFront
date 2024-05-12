import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/inscription",
      icon: "users",
      menu: "Inscription",
    }
    ,
    {
      link: "/planning",
      icon: "list",
      menu: "Planning",
    },
    {
      link: "/informationCollaborateur",
      icon: "list",
      menu: "Informations Collaborateur",
    },
    {
      link: "/listPlanning",
      icon: "list",
      menu: "Liste des plannings",
    }
  ]

}
