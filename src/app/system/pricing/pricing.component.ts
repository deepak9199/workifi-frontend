import { Component } from '@angular/core';
import { CollectionService } from '../../shared/_service/collection.service';
import { getprofile, profile } from '../../model/profile';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { PayemntGetwayService } from '../../shared/_service/payemnt-getway.service';
import { Transaction } from '../../model/Transaction ';

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
    private paymentservice: PayemntGetwayService
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
    this.collectionservice.updateDocument('profile', data.id, data).subscribe({
      next: (data) => {
        this.toster.success('Subscribe For Standard_plan')
      },
      error: error => {
        console.error(error.message)
      }
    })
  }
  private addTransactionapi(datat: Transaction) {

    this.collectionservice.addDocumentWithId('transaction', datat.utr, datat).subscribe({
      next: (data: any) => {
        // console.log(data)
        if (datat.type === 'Online') {
          // this.formProfile.cash = this.formProfile.cash + datat.amount
          this.makePayment(this.profile.phone.toString(), datat.amount, datat.utr, this.profile.id)
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
  private makePayment(phone: string, amount: number, transactionId: string, profileid: string) {
    this.loading = true
    this.paymentservice.initiatePayment('9199731275', amount, transactionId, profileid).subscribe(
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

}
