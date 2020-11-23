import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Attivita } from './attivita';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttivitaServiceService {
  private attivUrl: string;

  constructor(private http: HttpClient) {
    this.attivUrl = 'http://localhost:8080/admin/activities';
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
    return this.http.post<Attivita>(this.attivUrl + '/delete', attivita);
  }
}
