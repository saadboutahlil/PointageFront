import { Component, OnInit } from '@angular/core';
import { ManagerService } from './services/ManagerService';
import { CalendarDay } from '../calendar-collaborateur/models/CalendarDay';
export interface CalendrierGeneral{
  calendar: CalendarDay[];
  collaborateurId:number;
  nomComplet:string;
  }
@Component({
  selector: 'app-list-planning-collaborateurs',
  templateUrl: './list-planning-collaborateurs.component.html',
  styleUrls: []
})

export class ListPlanningCollaborateursComponent implements OnInit {
 
  collborateurinfos:any;
  public calendar: CalendarDay[] = [];
  public calendarGeneral:Array<CalendrierGeneral>= [];
  public calendarCollaborateur: CalendarDay[] = [];
  public monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
  ];
  public displayMonth!: string;
  private monthIndex: number = 0;

  public increaseMonth() {
    this.calendarGeneral= [];
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
    for (let i = 0; i < this.collborateurinfos.length; i++) {
      this.generateCalendarDaysCollaborateurs(this.monthIndex,this.collborateurinfos[i].utilisateurId,        this.collborateurinfos[i].nom + " "+this.collborateurinfos[i].prenom);
    }
  }

  public decreaseMonth() {
    this.calendarGeneral= [];
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
    for (let i = 0; i < this.collborateurinfos.length; i++) {
    this.generateCalendarDaysCollaborateurs(this.monthIndex,this.collborateurinfos[i].utilisateurId,        this.collborateurinfos[i].nom + " "+this.collborateurinfos[i].prenom);
  }
}
public getTypePlanification(type:string):string{
   let lab:string="";
if(type==="Télétravail"){
  lab= "TT";
}
else if(type==="Présentielle"){
  lab= "PR";
}
else if(type==="Congé sans solde"){
  lab= "CS";
}
else if(type==="Congé payés"){
  lab= "CP";
}
return lab;
}
  public setCurrentMonth() {
    this.calendarGeneral= [];
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
    for (let i = 0; i < this.collborateurinfos.length; i++) {
      this.generateCalendarDaysCollaborateurs(this.monthIndex,this.collborateurinfos[i].utilisateurId,
        this.collborateurinfos[i].nom + " "+this.collborateurinfos[i].prenom
      );
    }
  }
  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }
  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd),''));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
    const nouvelElement: CalendrierGeneral = {
      calendar: this.calendar, // Supposons que this.calendarCollaborateur est un tableau de CalendarDay
      collaborateurId: 0,
      nomComplet:""
    };
    this.calendarGeneral.push(nouvelElement);
  }

  private generateCalendarDaysCollaborateurs(monthIndex: number,collaborateurId:number,nomComplet:string): void {
    // we reset our calendar
    this.calendarCollaborateur = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendarCollaborateurs(day);

    let dateToAdd = startingDateOfCalendar;
    for (var i = 0; i < 42; i++) {
      let dayLabel = ''; 
      let isPlanningDate = this.checkIfDateIsPlanning(dateToAdd,collaborateurId); 
      console.log(isPlanningDate);
      if(isPlanningDate){
        debugger;
        let matchingTypePlannifications = this.collborateurinfos.filter((planning: any) => planning.utilisateurId === collaborateurId)[0].planning.filter((x:any) => new Date(x.datePlanning).toDateString() === dateToAdd.toDateString());
        dayLabel=this.getTypePlanification(matchingTypePlannifications[0].typePlannification?.type)?? "";
      }
      this.calendarCollaborateur.push(new CalendarDay(new Date(dateToAdd),dayLabel));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
    const nouvelElement: CalendrierGeneral = {
      calendar: this.calendarCollaborateur, // Supposons que this.calendarCollaborateur est un tableau de CalendarDay
      collaborateurId: collaborateurId,
      nomComplet:nomComplet
    };
    
    this.calendarGeneral.push(nouvelElement);
    console.log('les dates sont',this.calendarGeneral);
  }

  private getStartDateForCalendarCollaborateurs(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }
  private checkIfDateIsPlanning(date: Date,idCollaborateur:number): boolean {
    debugger;
    const planningsForCollaborateur = this.collborateurinfos.filter((planning: any) => planning.utilisateurId === idCollaborateur)[0].planning;
  // Vérifier si la date est une date de planification pour le collaborateur spécifié
  return planningsForCollaborateur.some((planning: any) => new Date(planning.datePlanning).toDateString() === date.toDateString());  }
  
  constructor(private managerservice: ManagerService) { }

  ngOnInit(): void {
this.afficherList();
  }
  afficherList(){
    this.managerservice.getInformations().subscribe({
      next: (data:any) => {
        this.collborateurinfos=data;

        for (let i = 0; i < this.collborateurinfos.length; i++) {
          this.generateCalendarDaysCollaborateurs(this.monthIndex,this.collborateurinfos[i].utilisateurId,
            this.collborateurinfos[i].nom + " "+this.collborateurinfos[i].prenom
          );
        }
      },
      error: (error) => {
          console.log(error)
      },
      complete: () => {
          console.log('complete')
      }
    })
  }
}
