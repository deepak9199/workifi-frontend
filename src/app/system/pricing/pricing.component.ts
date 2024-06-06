import { Component } from '@angular/core';
import { CollectionService } from '../../shared/_service/collection.service';
import { getprofile, profile } from '../../model/profile';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';

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
    bonus: 0
  }
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getprofiledetails(this.token.getUser().uid)
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
}
