import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import {AbbonamentoServiceService} from "../../service/abbonamento-service.service";
import {Abbonamento} from "../../entities/abbonamento";
import {User} from "../../entities/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  matchinPassword: any;
  abbonamenti: Abbonamento[];

  constructor(private token: TokenStorageService, private authService: AuthService, private abbonamService: AbbonamentoServiceService) {

  }

  ngOnInit(): void {
    this.abbonamService.findAll().subscribe(data => {
      this.abbonamenti = data;
    });
    this.currentUser = this.token.getUser();
    this.authService.getUser(this.currentUser.id).subscribe(data => {
      this.currentUser = data;
    });

    console.log("THIS IS THE: "+ this.currentUser.dataNascita);
  }

  onSubmitModify() {
    console.log(this.currentUser);
    this.currentUser.matchingPassword=this.currentUser.password;
    console.log("THIS IS THE: "+ this.currentUser.dataNascita);
    this.authService.userModify(this.currentUser).subscribe(
      data => {
        console.log(data);
        this.ngOnInit(); //reload the table
      });
  }

  parseDate(dateString: string): string {
    if (dateString) {
      console.log(",lsa data è : "+dateString);
      return dateString;
    }
    return null;
  }
  private getNameAbbFromId(id: string){
    for(let i=0; i<this.abbonamenti.length; i++){
      if(this.abbonamenti[i].id==id){
        return this.abbonamenti[i].name;
      }
    }
    return ""
  }
}
