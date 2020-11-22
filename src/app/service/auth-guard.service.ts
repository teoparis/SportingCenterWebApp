import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  private isok: boolean;
  private user: any;


  constructor(public tokenStorageService: TokenStorageService, private router:Router) { }

  canLoad(){
    this.isok =  !!this.tokenStorageService.getToken();
    if(!this.isok) {
      alert('Non sei autorizzato a visualizzare questa pagina');
      this.router.navigate['/login'];
    }
    return this.isok;
  }

  canActivate(): boolean {
    this.isok =  !!this.tokenStorageService.getToken();
    if(!this.isok) {
      alert('Non sei autorizzato a visualizzare questa pagina');
      this.router.navigate['/login'];
    }
    return this.isok;
  }

}
