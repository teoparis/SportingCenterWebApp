import { Component, OnInit } from '@angular/core';
import { Attivita } from '../../entities/attivita';
import { AttivitaServiceService } from '../../service/attivita-service.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Abbonamento} from "../../entities/abbonamento";
import {AbbonamentoServiceService} from "../../service/abbonamento-service.service";

@Component({
  selector: 'app-abbonamenti',
  templateUrl: './abbonamenti.component.html',
  styleUrls: ['./abbonamenti.component.css']
})
export class AbbonamentiComponent implements OnInit {

  oldAbbonamento: Abbonamento;
  abbonamento: Abbonamento;
  abbonamenti: Abbonamento[];
  closeResult: string;
  deleteId: any;
  constructor(
    private modalService: NgbModal,
    private abbonamentoService: AbbonamentoServiceService,) {
    this.abbonamento = new Abbonamento();
  }

  /**
   * Angular chiama questo metodo dopo che ha finito
   * di istanziare la classe di implementazione, e anche
   * dopo aver chiamato il suo costruttore
   */
  ngOnInit() {
    this.abbonamentoService.findAll().subscribe(data => {
      this.abbonamenti = data;
      this.abbonamento = new Abbonamento();
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.abbonamento = new Abbonamento();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.extractType();
    this.abbonamentoService.save(this.abbonamento).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });

    this.modalService.dismissAll(); //dismiss the modal
  }

  onSubmitMod() {
    this.extractType();
    this.abbonamentoService.save(this.abbonamento).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, abb: Abbonamento) {
    this.abbonamento = abb;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  openModify(targetModal, abb: Abbonamento) {
    this.oldAbbonamento = abb;
    this.abbonamento = abb;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  openDelete(targetModal, abb: Abbonamento) {
    this.abbonamento = abb;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    this.abbonamentoService.delete(this.abbonamento).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }
  extractType(): void{
    var element = <HTMLInputElement> document.getElementById("nuoto");
    if(element.checked)
      this.abbonamento.nuoto = true;
    else
      this.abbonamento.nuoto = false;
    var element = <HTMLInputElement> document.getElementById("fitness");
    if(element.checked)
      this.abbonamento.fitness = true;
    else
    this.abbonamento.fitness = false;
  }
}
