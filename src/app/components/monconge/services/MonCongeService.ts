import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planning } from '../../calendar-collaborateur/models/Planning';
import { InformationCollaborateurDto } from '../../info-collaborateur/models/InformationCollaborateurDto';
import { CongeDTO } from '../models/CongeDto';
@Injectable({
  providedIn: 'root'
})
export class MonCongeService {
url: string ="http://localhost:9090/collaborateur";
urlmanager: string ="http://localhost:9090/manager";
  constructor(private http: HttpClient) { }
saveConge(information:any){
  let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders,
      'responseType': 'text' as 'json'
    };
    debugger;
    return this.http.post<CongeDTO>(this.url+'/saveConge',information,options);
}
getConge() {
  return this.http.get<any>(`${this.url}/getConge`);
}

changerEtat(val:boolean,congeId:number){
  let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders,
      'responseType': 'text' as 'json'
    };
    debugger;
    return this.http.post<any>(this.urlmanager+'/etat',{val,congeId},options);
}
}
