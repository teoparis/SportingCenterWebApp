import { Component, OnInit } from '@angular/core';
import {Evento} from "../../entities/evento";
import {Attivita} from "../../entities/attivita";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  prenotazioni: Evento[];
  prenotazione: Evento;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
  }

  extractDay(date: string){
    var dt = new Date(date)
    return dt.getDate().toString()
  }
  extractTime(date: string){
    var dt = new Date(date)
    return dt.getTime().toString()
  }

  openDelete(targetModal, prn: Evento) {
    this.prenotazione = prn;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }



}
