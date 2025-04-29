import { Component } from '@angular/core';
import { CollectionService } from '../../shared/_service/collection.service';
import { getprofile, profile } from '../../model/profile';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { PayemntGetwayService } from '../../shared/_service/payemnt-getway.service';
import { Transaction } from '../../model/Transaction ';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  loading: boolean = false
  selectsubscribe: string = ''
  private profile: getprofile = {
    points: 0,
    uid: '',
    loyalty_coins: 0,
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
    skil: [],
    education: [],
    work_experience: [],
    award: [],
    proposals: [],
    id: '',
    subscribe: { plan: '', datetime: '' },
    trie: '',
    cash: 0,
    bonus: 0,
    currency: ''
  }
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService,
    private toster: ToastrService,
    private paymentservice: PayemntGetwayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.token.getUser()
    if (user && user.uid) {
      this.getprofiledetails(user.uid)
    }
    else {
      console.error('Uid is null')
    }
    this.scrollToTop()
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  selectsubscribefun(data: string) {
    switch (data) {
      case 'Standard': {
        this.updateCollection(this.profile, data)
        break
      }
      case 'Premium': {
        this.updateCollection(this.profile, data)
        break
      }
      default: {
        this.toster.error('Section Incorrect')
      }
    }
  }
  private getprofiledetails(id: string) {
    this.collectionservice.getData('profile').subscribe({
      next: (data: getprofile[]) => {
        this.profile = data.filter((item: profile) => item.uid === id)[0]
      },
      error: error => {
        console.error(error.message)
      }
    })
  }
  private updateCollection(data: getprofile, subscribe: string) {
    data.subscribe.datetime = new Date().toString()
    data.subscribe.plan = subscribe
    if (this.profile.uid) {
      this.addTransactionapi
        (
          {
            from_uid: 'Bank',
            type: 'Online',
            to_id: this.profile.uid,
            utr: this.generateTransactionId(),
            amount: data.subscribe.plan == 'Standard' ? 200 : data.subscribe.plan == 'Premium' ? 500 : 0,
            description: 'Cash add',
            login_user: this.profile.uid,
            payment: {
              mode: 'Online',
              status: 'Pending'
            },
            plan: data.subscribe.plan,
            createdTime: new Date().toString()
          }
        )
    }
    else {
      this.router.navigate(['/login'])

    }

  }
  private addTransactionapi(datat: Transaction) {

    this.collectionservice.addDocumentWithId('transaction', datat.utr, datat).subscribe({
      next: (data: any) => {
        // console.log(data)
        if (datat.type === 'Online') {
          // this.formProfile.cash = this.formProfile.cash + datat.amount
          this.makePayment(this.profile.phone.toString(), datat.amount, datat.utr, this.profile.id, datat.plan || '')
          // console.log(this.formProfile)
          // this.updateprofileapi(this.formProfile, this.profileid)
        }
        else {
          // this.updateprofileapi(this.formProfile, this.profileid)
        }
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  // payment gateway
  private makePayment(phone: string, amount: number, transactionId: string, profileid: string, plan: string) {
    this.loading = true
    if (plan) {
      console.log(plan)
      this.paymentservice.initiatePayment(phone, amount, transactionId, profileid, plan).subscribe(
        response => {
          console.log('Payment initiation response:', response);
          window.location.href = response.redirectUrl
        },
        error => {
          this.toster.error('Payment initiation failed:', error);
          this.loading = false
        }
      );
    }
    else {
      this.toster.error('Plan not selected')
    }

  }
  private generateTransactionId(): string {
    let id = uuidv4();
    return id
  }
}
