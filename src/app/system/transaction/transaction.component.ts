import { Component } from '@angular/core';
import { Transaction, Transaction_detail } from '../../model/Transaction ';
import { CollectionService } from '../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { Router } from '@angular/router';
import { getprofile, profile } from '../../model/profile';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  loading: Boolean = false
  transaction: Transaction_detail[] = []
  private uid: string = ''
  private profile: getprofile = {
    points: 0,
    uid: '',
    loyalty_coins: 0,
    cash: 0,
    bonus: 0,
    status: '',
    pan_card_no: '',
    created_date_time: '',
    updated_date_time: '',
    transaction_rewards: 0,
    image: '',
    username: '',
    email: '',
    phone: 0,
    tagline: '',
    hourly_rate: '',
    gender: '',
    specialization: '',
    type: '',
    country: '',
    city: '',
    language: '',
    language_level: '',
    introduce_yourself: '',
    subscribe: { datetime: '', plan: '' },
    trie: '',
    skil: [],
    education: [],
    work_experience: [],
    award: [],
    proposals: [],
    id: '',
    currency: ''
  }
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
      this.getprofile(this.uid)
    }
  }

  private gettarnsactionapi(uid: string) {
    this.loading = true
    this.collectionservice.getData('transaction').subscribe({
      next: (data: Transaction_detail[]) => {
        this.transaction = data.filter((obj: Transaction_detail) => obj.from_uid === uid || obj.to_id === uid)
        // console.log(this.transaction)
        this.loading = false
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }
  private getprofile(uid: string) {
    this.loading = true
    this.collectionservice.getDatabyuid('profile', uid).subscribe({
      next: (data: getprofile[]) => {
        this.profile = data[0]
        this.gettarnsactionapi(uid)
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }
  totatAmountAdd(data: Transaction_detail[]) {
    return data.reduce((sum: Number, obj: Transaction_detail) => Number(sum) + Number(obj.amount), 0);
  }
  totalWithdrawal(data: Transaction_detail[]) {

  }
  totalAvilableWithdrawal(data: Transaction_detail[]) {

  }
  formatTimeconv(date: string): string {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
  }
  formatDateconv(date: string): string {
    // Format the date as "YYYY-MM-DD" (required by input type="date")
    const year = new Date(date).getFullYear();
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = new Date(date).getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
