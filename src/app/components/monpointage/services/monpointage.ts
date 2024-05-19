import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class monpointageService {
url: string ="http://localhost:9090/collaborateur";
  constructor(private http: HttpClient) { }
badge(badge:boolean,collaborateurId:number|null){
  let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders,
      'responseType': 'text' as 'json'
    };
    debugger;
    return this.http.post<any>(this.url+'/badge',{badge,collaborateurId},options);
}
getLastPointage(collaborateurId: number|null): Observable<any> {
    return this.http.get<any>(`${this.url}/${collaborateurId}/last-pointage`);
  }

  debadge(badge:boolean,collaborateurId:number|null){
    let httpheaders=new HttpHeaders()
      .set('Content-type','application/Json');
      let options={
        headers:httpheaders,
        'responseType': 'text' as 'json'
      };
      debugger;
      return this.http.put<any>(this.url+'/debadge',{badge,collaborateurId},options);
  }
}
