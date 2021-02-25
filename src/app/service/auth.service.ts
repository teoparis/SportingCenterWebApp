import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import {createAotCompiler} from "@angular/compiler";
import {AppConstantsMicro} from "../common/app.constantsMicro";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(credentials): Observable<any> {

    return this.http.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user,enabled): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL',
      enabled: enabled,
      number: user.number,
      dataNascita: user.dataNascita
    }, httpOptions);
  }

  modify(user,enabled): Observable<any> {
    return this.http.post(AppConstants.ADMIN_URL + 'modify', {
      displayName: user.displayName,
      email: user.email,
      password: '',
      matchingPassword: '',
      socialProvider: 'LOCAL',
      enabled: enabled,
      number: user.number,
      dataNascita: user.dataNascita,
      dataScadenza: user.dataScadenza,
      abbonamento: user.abbonamento
    }, httpOptions);
  }

  userModify(user): Observable<any> {
    return this.http.post(AppConstants.ADMIN_URL + 'modify', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      enabled: true,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL',
      number: user.number,
      dataNascita: user.dataNascita
    }, httpOptions);
  }

}
