import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
})
export class InscriptionComponent implements OnInit {
  
  checked = true;
  
  constructor(private _router: Router,) { }

  ngOnInit(): void {}

  onBack(): void {
  }
}
