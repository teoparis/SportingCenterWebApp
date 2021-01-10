import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TokenStorageService} from "../../service/token-storage.service";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/tables', title: 'Clienti',  icon:'ni-single-02 text-blue', class: '' },
    { path: '/maps', title: 'Calendario',  icon:'ni-calendar-grid-58 text-orange', class: '' },
    { path: '/activities', title: 'Attività Sportive',  icon:'ni-user-run text-yellow', class: '' },
    { path: '/icons', title: 'Istruttori',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/abbonamenti', title: 'Abbonamenti',  icon:'ni-ruler-pencil text-info', class: '' },
    { path: '/register', title: 'Contatti',  icon:'ni-chat-round text-red', class: '' }
];
export const ROUTESUSER: RouteInfo[] = [
  { path: '/dashboard', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/prenotazioni', title: 'Prenotazioni',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/calendario', title: 'Calendario',  icon:'ni-calendar-grid-58 text-orange', class: '' },
  { path: '/contatti', title: 'Contatti',  icon:'ni-chat-round text-red', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    if(user.roles.includes("ROLE_ADMIN")){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else{
      this.menuItems = ROUTESUSER.filter(menuItem => menuItem);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  logout(): void {
    this.tokenStorageService.signOut();
  }
}
