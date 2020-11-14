import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

/**
 * Questa classe usa il metodo findAll() della classe
 * UserService per prendere in carico tutte le entità
 * che sono persistenti nel database e memorizza queste
 * nella lista users.
 */
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {
  }

  /**
   * Angular chiama questo metodo dopo che ha finito
   * di istanziare la classe di implementazione, e anche
   * dopo aver chiamato il suo costruttore
   */
  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}
