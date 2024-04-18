import { Component } from '@angular/core';
import { TokenStorageService } from '../_service/token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.css'
})
export class DefaultComponent {

  constructor(
    private tokenstorage: TokenStorageService,
    private router: Router,
    private toster: ToastrService
  ) { }

  ngOnInit() {
    if (!this.ValidatorChecker(this.tokenstorage.getToken())) {
      switch (this.tokenstorage.getUser().role[0]) {
        case 'client': {
          this.router.navigate(['/client/dashboard'])
          break;
        }
        case 'freelancer': {
          this.router.navigate(['/freelancer/projectlist'])
          break;
        }
        default: {
          this.router.navigate(['/']).then(() => {
            this.toster.error('Role not Matched')
          })
        }
      }
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
