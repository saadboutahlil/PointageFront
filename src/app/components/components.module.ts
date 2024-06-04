import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component'
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PlanningComponent } from './planning/planning.component';
import { CalendarCollaborateurComponent } from './calendar-collaborateur/calendar-collaborateur.component';
import { ChunkPipe } from './calendar-collaborateur/models/ChunkPipe';
import { InfoCollaborateurComponent } from './info-collaborateur/info-collaborateur.component';
import { ListPlanningCollaborateursComponent } from './list-planning-collaborateurs/list-planning-collaborateurs.component';
import { MonpointageComponent } from './monpointage/monpointage.component';
import { lespointagesComponent } from './lespointages/lespointages.component';
import { DetailpointagesComponent } from './lespointages/detailpointages/detailpointages.component';
import { MoncongeComponent } from './monconge/monconge.component';
import { ValidationcongeComponent } from './validationconge/validationconge.component';

@NgModule({
  declarations: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,
    InscriptionComponent,
    ConnexionComponent,
    PlanningComponent,
    CalendarCollaborateurComponent,
    ChunkPipe,
    InfoCollaborateurComponent,
    ListPlanningCollaborateursComponent,
    MonpointageComponent,
    lespointagesComponent,
    DetailpointagesComponent,
    MoncongeComponent,
    ValidationcongeComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    InscriptionComponent,
    PlanningComponent
  ]
})
export class ComponentsModule { }
