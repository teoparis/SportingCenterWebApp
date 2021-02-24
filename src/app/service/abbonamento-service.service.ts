import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConstants} from "../common/app.constants";
import {Abbonamento} from "../entities/abbonamento";
import {AppConstantsMicro} from "../common/app.constantsMicro";
import {TokenStorageService} from "./token-storage.service";
import {User} from "../entities/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AbbonamentoServiceService {


  constructor(private http: HttpClient, private token: TokenStorageService) {
  }


  public findAll(): Observable<Abbonamento[]> {
    return this.http.get<Abbonamento[]>(AppConstantsMicro.SUBSCRIPTION_SERVICE_ADMIN+'subscriptions');
  }

  public findAllUser(): Observable<Abbonamento[]> {
    return this.http.get<Abbonamento[]>(AppConstantsMicro.SUBSCRIPTION_SERVICE_USER+'subscriptions');
  }

  public save(abbonamento: Abbonamento) {
    return this.http.post<Abbonamento>(AppConstantsMicro.SUBSCRIPTION_SERVICE_ADMIN+'subscription', abbonamento);
  }

  public delete(abbonamento: Abbonamento) {
    return this.http.post<Abbonamento>(AppConstantsMicro.SUBSCRIPTION_SERVICE_ADMIN+'subscription/delete', abbonamento);
  }


  getAbbFromId(abbonamento: string): Observable<String> {
    return this.http.get<String>(AppConstantsMicro.SUBSCRIPTION_SERVICE_ADMIN + "subscriptions/getnamefromid/"+ encodeURIComponent(abbonamento),httpOptions);
  }
}
