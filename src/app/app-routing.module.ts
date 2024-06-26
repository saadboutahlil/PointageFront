import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { PlanningComponent } from './components/planning/planning.component';
import { CalendarCollaborateurComponent } from './components/calendar-collaborateur/calendar-collaborateur.component';
import { InfoCollaborateurComponent } from './components/info-collaborateur/info-collaborateur.component';
import { ListPlanningCollaborateursComponent } from './components/list-planning-collaborateurs/list-planning-collaborateurs.component';
import { MonpointageComponent } from './components/monpointage/monpointage.component';
import { lespointagesComponent } from './components/lespointages/lespointages.component';
import { MoncongeComponent } from './components/monconge/monconge.component';
import { ValidationcongeComponent } from './components/validationconge/validationconge.component';

const routes: Routes = [
  {path:"", component:ConnexionComponent},
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"home", component:DashboardComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},
      {path:"inscription", component:InscriptionComponent},
      {path:"planning", component:PlanningComponent},
      {path:"calendrierCollaborateur", component:CalendarCollaborateurComponent},
      {path:"informationCollaborateur", component:InfoCollaborateurComponent},
      {path:"listPlanning", component:ListPlanningCollaborateursComponent},
      {path:"monPointage", component:MonpointageComponent},
      {path:"lesPointages", component:lespointagesComponent},
      {path:"monConge", component:MoncongeComponent},
      {path:"validationConge", component:ValidationcongeComponent},
    ]
  },

  {path:"", redirectTo:"/connexion", pathMatch:"full"},
  {path:"**", redirectTo:"/connexion", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
