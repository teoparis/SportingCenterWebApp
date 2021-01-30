import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { UserLayoutRoutes } from './user-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SearchfilterPipe} from "../../searchfilter.pipe";
import {UserCalendarComponent} from "../../pages/user-calendar/user-calendar.component";
import {CalendarModule, CalendarMonthModule} from "angular-calendar";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    CalendarMonthModule,
    CalendarModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    SearchfilterPipe,
    UserCalendarComponent,
  ]
})

export class UserLayoutModule {}
