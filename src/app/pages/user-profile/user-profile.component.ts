import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import {AbbonamentoServiceService} from "../../service/abbonamento-service.service";
import {Abbonamento} from "../../entities/abbonamento";
import {User} from "../../entities/user";
import {UserService} from "../../service/user-service.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  matchinPassword: any;
  abbonamenti: Abbonamento[];
  abbonamento: any;
  user: User;
  scadenza: any;
  constructor(private token: TokenStorageService, private authService: AuthService, private abbonamService: AbbonamentoServiceService, private userService: UserService) {
    this.user = new User();
    this.abbonamento = '';
  }

  ngOnInit(): void {
    this.abbonamento = null;
    this.currentUser = this.token.getUser();
    this.userService.getUserByUserId(this.currentUser.id).subscribe(data => {
      this.user = data;
      console.log(this.user)
    });
    this.abbonamService.findAllUser().subscribe(data => {
      this.abbonamenti = data;
      this.abbonamento = this.getNameAbbFromId(this.user.abbonamento);
    });
  }

  onSubmitModify() {
    console.log(this.user);
    this.user.matchingPassword=this.user.password;
    console.log("THIS IS THE: "+ this.user.dataNascita);
    this.authService.userModify(this.user).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the page
      });
  }

  parseDate(dateString: string): string {
    if (dateString) {
      console.log("La data è : "+dateString);
      return dateString;
    }
    return null;
  }
  private getNameAbbFromId(id: string){
    console.log("THIS IS THE NUMBER: "+ id);
    for(let i=0; i<this.abbonamenti.length; i++){
      if(this.abbonamenti[i].id==id){
        console.log("abbsss: "+ this.abbonamenti[i].name);
        return this.abbonamenti[i].name;
      }
    }
    return ""
  }
}
