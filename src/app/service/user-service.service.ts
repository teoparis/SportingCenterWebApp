import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../entities/user';
import { Observable } from 'rxjs';
import {AppConstants} from "../common/app.constants";
import {AppConstantsMicro} from "../common/app.constantsMicro";
import {Abbonamento} from "../entities/abbonamento";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * Esegue richieste GET e POST all'host
 * http://localhost:8080/users
 * Questo ci permette di incapsulare l'accesso al
 * controller REST in una singola classe, che possiamo
 * utilizzare per l'intera applicazione.
 *
 * Incapsula, all'interno di una componente riutilizzabile,
 * tutte le funzionalità richieste per consumare il controller
 * REST API che abbiamo implementato in Spring Boot (UserController)
 */
@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * Esegue una richiesta GET HTTP
   * a http://localhost:8080/users attraverso
   * il client HttpClient di Angular.
   * Specificando il tipo User possiamo sfruttare la risposta
   * del backend in un modo più efficiente e effettivo.
   */
  /*public findAll(): Observable<User[]> {
    return this.http.get<User[]>(AppConstantsMicro.USER_SERVICE + "users");
  }*/

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(AppConstants.ADMIN_URL+'users');
  }

  public findUsers(): Observable<User[]> {
    return this.http.get<User[]>(AppConstants.ADMIN_URL + "usersbyrole/"+ encodeURIComponent("1"),httpOptions);
  }

  public save(user: User) {
    return this.http.post<User>(AppConstants.ADMIN_URL +"users", user);
  }

  public delete(user: User) {
    return this.http.post<User>(AppConstants.ADMIN_URL +"users/deleteUser", user);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.ADMIN_URL + 'user/me', httpOptions);
  }

  subIdByUserId(id: any): Observable<any> {
    return this.http.get(AppConstants.AUTH_API + 'SubIdByUserId/'+ encodeURIComponent(id), httpOptions);
  }


}
