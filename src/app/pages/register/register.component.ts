import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../entities/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: User;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  data: any;

  constructor(private authService: AuthService) {
    this.form = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("L'utente da registrare è:")
    console.log(this.form)
    this.authService.register(this.form,false).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  stampDate(date: Date)
  {
    return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
  }

}
