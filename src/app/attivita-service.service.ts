import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attivita } from './attivita';
import { Observable } from '../../node_modules/rxjs';
import {AppConstants} from "./common/app.constants";

@Injectable({
  providedIn: 'root'
})
export class AttivitaServiceService {


  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(AppConstants.ADMIN_URL+'activities');
  }

  public save(attivita: Attivita) {
    return this.http.post<Attivita>(AppConstants.ADMIN_URL+'activities', attivita);
  }

  public delete(attivita: Attivita) {
    return this.http.post<Attivita>(AppConstants.ADMIN_URL+'activities/delete', attivita);
  }
}
