import {Component, OnInit} from '@angular/core';
import { Attivita } from '../../entities/attivita';
import { AttivitaServiceService } from '../../service/attivita-service.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  oldActivity: Attivita;
  activity: Attivita;
  activities: Attivita[];
  closeResult: string;
  deleteId: any;
  constructor(
    private modalService: NgbModal,
    private attivitaService: AttivitaServiceService,) {
    this.activity = new Attivita();
  }

  /**
   * Angular chiama questo metodo dopo che ha finito
   * di istanziare la classe di implementazione, e anche
   * dopo aver chiamato il suo costruttore
   */
  ngOnInit() {
    this.attivitaService.findAll().subscribe(data => {
      this.activities = data;
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.extractType();
    this.attivitaService.save(this.activity).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  onSubmitMod() {
    this.attivitaService.delete(this.oldActivity)
    this.attivitaService.save(this.activity).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, act: Attivita) {
    this.activity = act;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('dname').setAttribute('value', act.name);
    document.getElementById('ddescr').setAttribute('value', act.descr);
  }

  openModify(targetModal, act: Attivita) {
    this.activity = act;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  openDelete(targetModal, act: Attivita) {
    this.oldActivity = act;
    this.activity = act;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    this.attivitaService.delete(this.activity).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }
  extractType(): void{
    var element = <HTMLInputElement> document.getElementById("nuotoM");
    if(element.checked)
      this.activity.nuoto = true;
    else
      this.activity.nuoto = false;
    var element = <HTMLInputElement> document.getElementById("fitnessM");
    if(element.checked)
      this.activity.fitness = true;
    else
      this.activity.fitness = false;
  }
}
