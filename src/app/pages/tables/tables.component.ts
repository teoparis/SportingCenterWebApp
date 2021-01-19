import {Component, OnInit} from '@angular/core';
import { User } from '../../entities/user';
import { UserService } from '../../service/user-service.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../service/auth.service";
import {AbbonamentoServiceService} from "../../service/abbonamento-service.service";
import {Abbonamento} from "../../entities/abbonamento";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  nameAbbonam: Observable<String>[];
  datep: String
  user: User;
  users: User[];
  closeResult: string;
  abbonamenti: Abbonamento[];
  deleteId: any;
  searchValue: string;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,private abbonamService: AbbonamentoServiceService,private authService: AuthService) {
    this.user = new User();

  }

  /**
   * Angular chiama questo metodo dopo che ha finito
   * di istanziare la classe di implementazione, e anche
   * dopo aver chiamato il suo costruttore
   */
  ngOnInit() {
    this.userService.findUsers().subscribe(data => {
      this.users = data;
      for(let i=0; i<data.length; i++){
        console.log(data[i].abbonamento);
        //this.nameAbbonam.push(this.abbonamService.getAbbFromId(data[i].abbonamento)) ;
        //console.log(this.nameAbbonam[i]);
      }
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
    this.user = new User();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.user.password="SETYORPASSWORD"
    this.user.matchingPassword="SETYORPASSWORD"
    this.authService.register(this.user,true).subscribe(
      data => {
        console.log(data);
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  onSubmitModify() {
    console.log(this.user);
    this.user.matchingPassword=this.user.password;
    console.log("THIS IS THE: "+this.user.dataNascita);
    this.authService.modify(this.user,this.user.enabled).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  onSubmitAbb() {
    console.log(this.user);
    this.user.matchingPassword=this.user.password;
    this.authService.modify(this.user,true).subscribe(
      data => {
        console.log(data);
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
    document.getElementById('dname').setAttribute('value', user1.displayName);
    document.getElementById('demail').setAttribute('value', user1.email);
    document.getElementById('dnumber').setAttribute('value', user1.number);
    document.getElementById('dnascita').setAttribute('value', user1.dataNascita);
  }

  openModify(targetModal, user1: User) {
    this.user = user1;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  openDelete(targetModal, user: User) {
    this.user = user;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  openAbbonam(targetModal, user: User) {
    this.user = user;
    this.abbonamService.findAll().subscribe(data => {
      this.abbonamenti = data;
    });
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
  accetta(user: User)
  {
    this.user=user;
    this.user.matchingPassword=this.user.password;
    this.authService.modify(this.user,true).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the table
      });
  }
  blocca(user: User)
  {
    this.user=user;
    this.user.matchingPassword=this.user.password;
    this.authService.modify(this.user,false).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the table
      });
  }

  selectOption(id: string): void{
    //console.log("THIS IS THE: "+name);
    this.user.abbonamento = id;
  }
  parseDate(dateString: string): string {
    if (dateString) {
      console.log(",lsa data è : "+dateString);
      return dateString;
    }
    return null;
  }
  stampDate(date: Date)
  {
    return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
  }
}
