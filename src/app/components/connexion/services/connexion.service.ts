import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurDto } from '../models/UtilisateurDto';
import { UtilisateurInfoDto } from '../models/UtilisateurInfoDto';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class connexionserviceService {
url: string ="http://localhost:9090/api";
  constructor(private http: HttpClient) { }
login(credentials: any): Observable<UtilisateurInfoDto> {
  return this.http.post<UtilisateurInfoDto>(`${this.url}/connexion`, credentials)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
}

}
