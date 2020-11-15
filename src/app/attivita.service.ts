import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import {Attivita} from "./attivita";

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
export class attivitaService {

  private attivUrl: string;

  constructor(private http: HttpClient) {
    this.attivUrl = 'http://localhost:8080/activity';
  }

  /**
   * Esegue una richiesta GET HTTP
   * a http://localhost:8080/users attraverso
   * il client HttpClient di Angular.
   * Specificando il tipo User possiamo sfruttare la risposta
   * del backend in un modo più efficiente e effettivo.
   */
  public findAll(): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(this.attivUrl);
  }

  public save(attivita: Attivita) {
    return this.http.post<Attivita>(this.attivUrl, attivita);
  }

  public delete(attivita: Attivita) {
    return this.http.post<Attivita>(this.attivUrl + '/deleteAttiv', attivita);
  }
}
