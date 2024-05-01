import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurDto } from '../models/UtilisateurDto';
@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
url: string ="http://localhost:9090";
  constructor(private http: HttpClient) { }
create(user:UtilisateurDto){
  let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders,
      'responseType': 'text' as 'json'
    };
    debugger;
    return this.http.post<UtilisateurDto>(this.url+'/save',user,options);
}
}
