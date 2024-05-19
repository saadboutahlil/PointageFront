import { Component, OnInit } from '@angular/core';
import { CalendarDay } from './models/CalendarDay';
import { PlanningService } from '../planning/services/PlanningService';
import { Planning } from './models/Planning';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-calendar-collaborateur',
  templateUrl: './calendar-collaborateur.component.html',
  styleUrls: ['./calendar-collaborateur.component.css']
})
export class CalendarCollaborateurComponent implements OnInit {
  typePlannifications!:Array<Planning>;
  public calendar: CalendarDay[] = [];
  public monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
  ];
  public displayMonth!: string;
  private monthIndex: number = 0;
  constructor(private pla:PlanningService,private route: ActivatedRoute, private router: Router,
    private localservice :LocalStorageService 
  ){} 
  ngOnInit(): void {
// exemple du collaborateur 2 avant de mettre la connexion

    this.pla.getPlanningsByCollaborateurId(this.localservice.getNumber('utilisateurId')).subscribe({
      next: (data:Array<Planning>) => {
        debugger;
        console.log(data);
        this.typePlannifications = data;
        this.generateCalendarDays(this.monthIndex);
      },
      error: (error) => {
          console.log(error)
      },
      complete: () => {
          console.log('complete')
      }
    }) 

  }

  private generateCalendarDays(monthIndex: number): void {
    debugger;
    // we reset our calendar
    this.calendar = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      let dayLabel = ''; 
      let isPlanningDate = this.checkIfDateIsPlanning(dateToAdd); 
      if(isPlanningDate){

        let matchingTypePlannifications = this.typePlannifications.filter(x => new Date(x.datePlanning).toDateString() === dateToAdd.toDateString());
        dayLabel=matchingTypePlannifications[0].typePlannification?.type?? "";
      }
      this.calendar.push(new CalendarDay(new Date(dateToAdd),dayLabel));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
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

   public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }
  private checkIfDateIsPlanning(date: Date): boolean {
    // Vérifier si la date est une date de planification
    return this.typePlannifications.some(planning => new Date(planning.datePlanning).toDateString() === date.toDateString());
      }

}
