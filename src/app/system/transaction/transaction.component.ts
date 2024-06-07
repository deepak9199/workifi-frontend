import { Component } from '@angular/core';
import { Transaction, Transaction_detail } from '../../model/Transaction ';
import { CollectionService } from '../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  loading: Boolean = false
  transaction: Transaction_detail[] = []
  private uid: string = ''
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService,
    private token: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    const user = this.token.getUser()
    if (user && user.uid) {
      this.uid = user.uid
      this.gettarnsactionapi(this.uid)
    }
  }

  private gettarnsactionapi(uid: string) {
    console.log('uid : ' + uid)
    this.collectionservice.getData('transaction').subscribe({
      next: (data: Transaction_detail[]) => {
        this.transaction = data.filter((obj: Transaction_detail) => obj.from_uid === uid || obj.to_id === uid)
        console.log(this.transaction)
      },
      error: err => {
        console.error(err)
      }
    })
  }
  totatAmountAdd(data: Transaction_detail[]) {

  }
  totalWithdrawal(data: Transaction_detail[]) {

  }
  totalAvilableWithdrawal(data: Transaction_detail[]) {

  }

}
