import { Component } from '@angular/core';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  optionname: string = 'Sign Up as a client '

  constructor(private shareservice: SharedService, private router: Router, private toster: ToastrService) {

  }

  clickclient() {
    this.optionname = 'Sign Up as a client'
  }
  clickfreelancer() {
    this.optionname = 'Sign Up as a freelancer'
  }
  routtosignup() {
    if (this.optionname === 'Sign Up as a client') {
      this.shareservice.savedata('client')
      this.router.navigate(['/signup'])
    }
    else if (this.optionname === 'Sign Up as a freelancer') {
      this.shareservice.savedata('freelancer')
      this.router.navigate(['/signup'])
    }
    else {
      this.toster.error('Role selection error')
    }

  }
}
