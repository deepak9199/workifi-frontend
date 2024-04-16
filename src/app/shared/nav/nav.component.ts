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
    this.getusers()
    this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
  }
  private gettrigertrefresh() {
    this.sharedservice.functionTriggerObservable.subscribe(() => {
      this.islogin = this.ValidatorChecker(this.tokenstorage.getToken())
      this.getusers()
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
  // api call for workinghours
  private getusers() {
    this.dataservice.getData("users").subscribe({
      next: (data: users[]) => {
        if (data.length != 0) {
          // console.log('call done')
          if (this.islogin) {
            let user: users[] = data.filter((user: users) => user.email === this.tokenstorage.getUser().userCredential.user.email)
            if (user.length != 0) {
              console.log(user[0].role)
              if (user[0].role === 'client') {
                this.client = true
              }
              else {
                this.client = false
              }
            }
            else {
              console.log('user not found')
            }
          }
          else {
            this.client = false
          }

        }
        else {
          console.log("workinghours data not found")
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error)
      },
      complete: () => {
      },
    });
  }
}
