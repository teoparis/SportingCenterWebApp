import { Component, OnInit } from '@angular/core';
import {Evento} from "../../entities/evento";

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  prenotazioni: Evento[];

  constructor() { }

  ngOnInit(): void {
  }

}
