import {Component, OnInit} from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

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
