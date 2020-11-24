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

  canLoad(route: Route){
    this.isok =  !!this.tokenStorageService.getToken();
    const user = this.tokenStorageService.getUser();

    if(!this.isok) {
      this.router.navigate(['/login']);
    }
    return this.isok;
  }

  canActivate(): boolean {
    const user = this.tokenStorageService.getUser();
    if(!user.roles.includes("ROLE_ADMIN")){
      return false
    }
    return true;
}


}
