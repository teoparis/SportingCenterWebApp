import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {UserCalendarComponent} from "../../pages/user-calendar/user-calendar.component";
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        NgbDatepickerModule,
        // NgbModule
    ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserCalendarComponent
  ]
})
export class AuthLayoutModule { }
