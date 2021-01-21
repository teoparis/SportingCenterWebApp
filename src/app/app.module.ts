import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { UserService } from './service/user-service.service';
import {AuthGuardService} from "./service/auth-guard.service";
import {AuthInterceptor, authInterceptorProviders} from "./_helpers/auth.interceptor";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AbbonamentoServiceService} from "./service/abbonamento-service.service";
import { EntitiesComponent } from './entities/entities/entities.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserLayoutComponent,
    EntitiesComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },UserService,AuthGuardService,AbbonamentoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
