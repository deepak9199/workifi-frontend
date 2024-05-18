import { Component } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { TokenStorageService } from '../_service/token-storage.service';
import { CollectionService } from '../_service/collection.service';
import { users } from '../../model/user';
import { profile } from '../../model/profile';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  client: boolean = false
  islogin: boolean = false
  profile_image: string = ''
  constructor(
    private sharedservice: SharedService,
    private tokenstorage: TokenStorageService,
    private dataservice: CollectionService
  ) { }
  ngOnInit() {

    this.gettrigertrefresh()
    // this.client = this.ValidatorChecker(this.tokenstorage.getUser()) && this.tokenstorage.getUser().role[0] === 'client';
    this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
    this.getprofileapi()
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
  isrole(data: string): boolean {

    if (this.ValidatorChecker(this.tokenstorage.getUser())) {
      let role: string = this.tokenstorage.getUser().role
      if (role === data) {
        return true
      }
      else {
        return false
      }
    }
    else {
      if (data === 'deafult') {
        return true
      }
      else {
        return false
      }
    }

  }
  private getprofileapi() {
    this.dataservice.getData('profile').subscribe({
      next: (data) => {
        // console.log(data)
        let obj = data.filter((obj: profile) => obj.uid === this.tokenstorage.getUser().uid)
        if (obj.length != 0) {
          this.profile_image = obj[0].image
        }
        else {
          console.log('no profile found')
        }
      },
      error: (error) => {
        console.error(error)
      },

    })
  }
}