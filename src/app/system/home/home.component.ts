import { Component } from '@angular/core';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private tokenstorage: TokenStorageService,
    private router: Router,
    private toster: ToastrService
  ) { }

  ngOnInit() {
    if (this.ValidatorChecker(this.tokenstorage.getToken())) {
      const user = this.tokenstorage.getUser();

      if (user && user.role) {
        switch (user.role) {
          case 'client':
            this.router.navigate(['/client/home']);
            break;

          case 'freelancer':
            this.router.navigate(['/freelancer/projectlist']);
            break;

          default:
            this.router.navigate(['/']).then(() => {
              this.toster.error('Role not Matched');
            });
        }
      } else {
        console.error('User or user role is null or undefined');
      }
    } else {
      console.error('Token validation failed');
    }

  }

  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
}
