import { Component } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { TokenStorageService } from '../_service/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  client: boolean = false
  islogin: boolean = false
  constructor(
    private sharedservice: SharedService,
    private tokenstorage: TokenStorageService
  ) { }
  ngOnInit() {
    this.gettrigertrefresh()
    this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
  }
  private gettrigertrefresh() {
    this.sharedservice.functionTriggerObservable.subscribe(() => {
      this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
    });
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
