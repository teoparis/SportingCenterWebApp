import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ActivitiesComponent} from "../../pages/activities/activities.component";
import {SearchfilterPipe} from "../../searchfilter.pipe";
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {AbbonamentiComponent} from "../../pages/abbonamenti/abbonamenti.component";
import {UserCalendarComponent} from "../../pages/user-calendar/user-calendar.component";
import {PrenotazioniComponent} from "../../pages/prenotazioni/prenotazioni.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
        })
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ActivitiesComponent,
    AbbonamentiComponent,
    SearchfilterPipe,
    UserCalendarComponent,
    PrenotazioniComponent,
  ]
})

export class AdminLayoutModule {}
