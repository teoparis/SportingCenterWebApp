import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attivita } from '../entities/attivita';
import { Observable } from 'rxjs';
import {AppConstants} from "../common/app.constants";
import {AppConstantsMicro} from "../common/app.constantsMicro";

@Injectable({
  providedIn: 'root'
})
export class AttivitaServiceService {


  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(AppConstantsMicro.ACTIVITY_SERVICE+'activities');
  }

  public save(attivita: Attivita) {
    return this.http.post<Attivita>(AppConstantsMicro.ACTIVITY_SERVICE+'activities', attivita);
  }

  public delete(attivita: Attivita) {
    return this.http.post<Attivita>(AppConstantsMicro.ACTIVITY_SERVICE+'activities/delete', attivita);
  }
}
