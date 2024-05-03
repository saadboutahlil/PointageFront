import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListReferentielDto } from '../models/ListReferentielDto';
import { Observable } from 'rxjs';
import { PlanningDto } from '../models/PlanningDto';
@Injectable({
  providedIn: 'root'
})
export class PlanningService {
url: string ="http://localhost:9090";
  constructor(private http: HttpClient) { }
getListReferentiel(): Observable<ListReferentielDto>{
  return this.http.get<ListReferentielDto>(this.url+'/getReferentiel');
}
savePlanning(planning:PlanningDto){
  let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders,
      'responseType': 'text' as 'json'
    };
    debugger;
    return this.http.post<PlanningDto>(this.url+'/savePlanning',planning,options);
}
}
