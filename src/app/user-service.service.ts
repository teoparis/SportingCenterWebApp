import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from '../../node_modules/rxjs';

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

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  /**
   * Esegue una richiesta GET HTTP
   * a http://localhost:8080/users attraverso
   * il client HttpClient di Angular.
   * Specificando il tipo User possiamo sfruttare la risposta
   * del backend in un modo più efficiente e effettivo.
   */
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public delete(user: User) {
    return this.http.post<User>(this.usersUrl + '/deleteUser', user);
  }
}
