import { Component } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { TokenStorageService } from '../_service/token-storage.service';
import { CollectionService } from '../_service/collection.service';
import { users } from '../../model/user';

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
    private tokenstorage: TokenStorageService,
    private dataservice: CollectionService
  ) { }
  ngOnInit() {
    this.gettrigertrefresh()
    // this.client = this.ValidatorChecker(this.tokenstorage.getUser()) && this.tokenstorage.getUser().role[0] === 'client';
    this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
  }
  private gettrigertrefresh() {
    this.sharedservice.functionTriggerObservable.subscribe(() => {
      this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
      // this.client = this.ValidatorChecker(this.tokenstorage.getUser()) && this.tokenstorage.getUser().role[0] === 'client';
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