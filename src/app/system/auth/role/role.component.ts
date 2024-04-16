import { Component } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  optionname: string = 'Join as a client '

  clickclient() {
    this.optionname = 'Join as a client '
  }
  clickfreelancer() {
    this.optionname = 'Join as a freelancer'

  }
}
