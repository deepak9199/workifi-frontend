import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../shared/_service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrl: './client-side.component.css'
})
export class ClientSideComponent {
  islogin: boolean = false
  constructor(private tokenstorage: TokenStorageService, private route: Router) { }
  ngOnInit() {
    this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
    if (!this.islogin) {
      this.route.navigate(['/'])
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
