import { Injectable } from '@angular/core';
import {CanLoad, Route, Router} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanLoad {
  private isok: boolean;
  private user: any;


  constructor(public tokenStorageService: TokenStorageService, private router: Router) {
  }


  canLoad(route: Route) {
    this.isok = !!this.tokenStorageService.getToken();
    const user = this.tokenStorageService.getUser();

    if (!this.isok) {
      this.router.navigate(['/login']);
    }
    return this.isok;
  }

  canActivate(): boolean {
    const user = this.tokenStorageService.getUser();
    if (!user.roles.includes("ROLE_USER")) {
      return false
    }
    return true;
  }
}
