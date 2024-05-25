import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planning } from '../../calendar-collaborateur/models/Planning';
import { InformationCollaborateurDto } from '../../info-collaborateur/models/InformationCollaborateurDto';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
url: string ="http://localhost:9090/manager";
  constructor(private http: HttpClient) { }
getInformations() {
  return this.http.get<any>(`${this.url}/getCollaborateurs`);
}
getPointages(datePointage:string) {
  return this.http.get<any>(`${this.url}/${datePointage}/getPointages`);
}
}
