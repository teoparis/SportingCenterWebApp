import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from "../common/app.constants";
import {Abbonamento} from "../entities/abbonamento";

@Injectable({
  providedIn: 'root'
})
export class AbbonamentoServiceService {


  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Abbonamento[]> {
    return this.http.get<Abbonamento[]>(AppConstants.ADMIN_URL+'abbonamento');
  }

  public save(abbonamento: Abbonamento) {
    return this.http.post<Abbonamento>(AppConstants.ADMIN_URL+'abbonamento', abbonamento);
  }

  public delete(abbonamento: Abbonamento) {
    return this.http.post<Abbonamento>(AppConstants.ADMIN_URL+'abbonamento/delete', abbonamento);
  }
}
