import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstantsMicro} from "../common/app.constantsMicro";
import {Evento} from "../entities/evento";
import {User} from "../entities/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(AppConstantsMicro.CALENDAR_SERVICE+'events');
  }

  public save(event: Evento) {
    return this.http.post<Evento>(AppConstantsMicro.CALENDAR_SERVICE+'event', event);
  }

  public getEventsForUser(id: string) {
    console.log(id);
    return this.http.get<Evento[]>(AppConstantsMicro.CALENDAR_SERVICE_USER+'events/'+ encodeURIComponent(id),httpOptions);
  }

  public getBookingsForUser(id: string) {
    console.log(id);
    return this.http.get<Evento[]>(AppConstantsMicro.CALENDAR_SERVICE_USER+'events/bookings/'+ encodeURIComponent(id),httpOptions);
  }


  public delete(event: Evento) {
    return this.http.post<void>(AppConstantsMicro.CALENDAR_SERVICE+'events/delete', event);
  }

  public prenotaAttivita(idUser: string,idEvent: string) {
    return this.http.put<void>(AppConstantsMicro.CALENDAR_SERVICE_USER+'events/bookings/'+ encodeURIComponent(idUser)+"/"+encodeURIComponent(idEvent),httpOptions);
  }
  public findBookedFromEventId(id: string) {
    return this.http.get<User[]>(AppConstantsMicro.CALENDAR_SERVICE+'getusers/'+ encodeURIComponent(id),httpOptions);
  }

  public deleteBooking(idUser: string, idEvent: string) {
    return this.http.put<void>(AppConstantsMicro.CALENDAR_SERVICE_USER+'delete_booking/'+ encodeURIComponent(idUser) +"/"+ encodeURIComponent(idEvent),httpOptions);
  }


}
