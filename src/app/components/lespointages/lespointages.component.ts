import { Component, OnInit } from '@angular/core';
import { CalendarDay } from '../calendar-collaborateur/models/CalendarDay';
import { ManagerService } from '../list-planning-collaborateurs/services/ManagerService';
import { DatePipe } from '@angular/common';
export interface CalendrierGeneral{
  calendar: CalendarDay[];
  collaborateurId:number;
  nomComplet:string;
  }
@Component({
  selector: 'app-lespointages',
  templateUrl: './lespointages.component.html',
  styleUrls: []
})

export class lespointagesComponent implements OnInit {
 
  public displayDay: number = 1;
  private dayIndex: number = 0;
  public displayDate: string = this.getCurrentDate();
  public increaseDay() {
    this.dayIndex++;
    this.displayDay = this.getDayFromIndex(this.dayIndex);
    this.displayDate = this.getCurrentDate();
  }
  
  public decreaseDay() {
    this.dayIndex--;
    this.displayDay = this.getDayFromIndex(this.dayIndex);
    this.displayDate = this.getCurrentDate();
  }
  
  public setCurrentDay() {
    this.dayIndex = 0;
    this.displayDay = this.getDayFromIndex(this.dayIndex);
    this.displayDate = this.getCurrentDate();
  }
  
  private getDayFromIndex(index: number): number {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + index);
    return currentDate.getDate();
  }
  public getCurrentDay(): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + this.dayIndex);
  return currentDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

private getCurrentDate(): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + this.dayIndex);
  return this.formatDate(currentDate);
}
private formatDate(date: Date): string {
  const year = date.getFullYear();
  const day = this.padToTwoDigits(date.getDate());
  const month = this.padToTwoDigits(date.getMonth() + 1); // Les mois sont basés sur zéro
  return `${year}-${month}-${day}`;
}
private padToTwoDigits(num: number): string {
  return num.toString().padStart(2, '0');
}
  

  constructor() { }

  ngOnInit(): void {
  }
}
