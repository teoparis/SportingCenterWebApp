import {Component, OnInit} from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user-service.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  user: User;
  users: User[];
  closeResult: string;
  deleteId: any;
  searchValue: string;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,) {
    this.user = new User();
  }

  /**
   * Angular chiama questo metodo dopo che ha finito
   * di istanziare la classe di implementazione, e anche
   * dopo aver chiamato il suo costruttore
   */
  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
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
    this.userService.save(this.user).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, user1: User) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('dname').setAttribute('value', user1.name);
    document.getElementById('demail').setAttribute('value', user1.email);
  }

  openDelete(targetModal, user: User) {
    this.user = user;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDeleteUser() {
    this.userService.delete(this.user).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }
}
