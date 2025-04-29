import { Component } from '@angular/core';
import { award, education, getprofile, profile, work_experience } from '../../model/profile';
import { CollectionService } from '../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/_service/auth.service';
import { Transaction, Transaction_detail } from '../../model/Transaction ';
import { error } from 'console';
import { SharedService } from '../../shared/_service/shared.service';
import { PayemntGetwayService } from '../../shared/_service/payemnt-getway.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loading: boolean = false
  skills: string = ''
  work_experiance: work_experience = {
    company_name: '',
    project_name: '',
    description: '',
    from: null,
    to: null
  }
  education: education = {
    collage: '',
    certificate_name: '',
    description: '',
    from: null,
    to: null
  }
  awads: award = {
    company_name: '',
    project_name: '',
    description: '',
    from: null,
    to: null
  }
  formProfile: profile = {
    uid: '',
    created_date_time: '',
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
    points: 0,
    updated_date_time: '',
    proposals: [],
    status: '',
    pan_card_no: '',
    loyalty_coins: 0,
    transaction_rewards: 0,
    subscribe: { plan: '', datetime: '' },
    trie: '',
    cash: 0,
    bonus: 0,
    currency: ''
  }
  fromchangepass = {
    old: '',
    new: '',
    confrom: ''
  }
  currencies = [
    { code: "INR", symbol: "₹" },
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
    { code: "EURO", symbol: "€" },
    { code: "YEN", symbol: "¥" },
    { code: "AED", symbol: "د.إ" },
    { code: "CNY", symbol: "CN¥" },
    { code: "SAR", symbol: "﷼" },
    { code: "KRW", symbol: "₩" },
    { code: "RUB", symbol: "₽" },
    { code: "LUF", symbol: "F" }, // Luxembourg Franc symbol is not widely recognized
    { code: "ZAR", symbol: "R" },
    { code: "CAD", symbol: "C$" },
    { code: "SGD", symbol: "S$" },
    { code: "MYR", symbol: "RM" },
    { code: "BDT", symbol: "৳" },
    { code: "LKR", symbol: "Rs" },
    { code: "NPR", symbol: "Rs" },
    { code: "AUD", symbol: "A$" }
  ];

  private profileid: string = ''
  skilList: string[] = []
  educationlist: education[] = []
  private Transactionlist: Transaction[] = []
  work_experience_list: work_experience[] = []
  transactions: Transaction[] = []
  awadsList: award[] = []
  uploadProgress: number = 0
  role: string = ''
  private uid: string = ''
  amount: number = 0
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService,
    private token: TokenStorageService,
    private route: Router,
    private auth: AuthService,
    private sharedservice: SharedService,
    private paymentservice: PayemntGetwayService
  ) { }
  ngOnInit() {
    const user = this.token.getUser();
    if (this.ValidatorChecker(user)) {
      if (user && user.role && user.uid) {
        this.role = user.role;
        this.uid = user.uid
        this.formProfile.email = user.userCredential.user.email;
        this.formProfile.username = user.name;
        this.formProfile.phone = user.phone;
        this.getprofileapi();
        this.trigertrefreshnavbar();
      } else {
        console.error('User role is null or undefined');
        this.route.navigate(['/']);
      }
    } else {
      this.route.navigate(['/']);
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
  saveUser() {
    this.save()
  }
  saveskill() {
    this.skilList.push(this.skills)
  }
  saveeducation() {
    this.educationlist.push(this.education)
    console.log(this.educationlist)
  }
  saveworkexp() {
    this.work_experience_list.push(this.work_experiance)
  }
  saveawds() {
    this.awadsList.push(this.awads)
  }
  changepassword() {
    this.changePasswordapi(this.fromchangepass.old, this.fromchangepass.new, this.fromchangepass.confrom)
  }
  save() {
    if (this.profileid === '') {
      this.savedata()
    }
    else {
      this.updatedata(this.profileid)
    }
  }
  savedata() {
    if (this.formProfile.pan_card_no !== '') {
      const user = this.token.getUser();

      if (user && user.uid) {
        this.formProfile.uid = user.uid;

        if (user.role === 'freelancer') {
          this.formProfile.loyalty_coins = 50;
        } else if (user.role === 'client') {
          this.formProfile.loyalty_coins = 0;
        }

        const currentDateTime = new Date().toString();
        this.formProfile.created_date_time = currentDateTime;
        this.formProfile.updated_date_time = currentDateTime;
        this.formProfile.education = this.educationlist;
        this.formProfile.skil = this.skilList; // corrected 'skil' to 'skill'
        this.formProfile.work_experience = this.work_experience_list;
        this.formProfile.award = this.awadsList; // corrected 'awad' to 'award'
        this.formProfile.status = 'active';

        console.log('created');
        this.saveprofileapi(this.formProfile);
      } else {
        console.error('User uid is null or undefined');
      }
    } else {
      this.toster.error('Pan Card no. is required');
    }


  }
  updatedata(id: string) {
    this.formProfile.updated_date_time = (new Date()).toString()
    this.formProfile.education = this.educationlist
    this.formProfile.skil = this.skilList
    this.formProfile.work_experience = this.work_experience_list
    this.formProfile.award = this.awadsList
    console.log('Updated')
    console.log(this.formProfile)
    this.updateprofileapi(this.formProfile, id)
  }
  deletedata(type: string, index: number) {
    switch (type) {
      case 'edu':
        this.educationlist = this.educationlist.filter((item: education, item_index: number) => item_index != index)
        break;
      case 'skill':
        this.skilList = this.skilList.filter((item: string, item_index: number) => item_index != index)
        break;
      case 'awad':
        this.awadsList = this.awadsList.filter((item: award, item_index: number) => item_index != index)
        break
      case 'exp':
        this.work_experience_list = this.work_experience_list.filter((item: work_experience, item_index: number) => item_index != index)
        break;
      default:
        console.error('type selection error')
    }
  }
  addwallet() {
    if (this.formProfile.pan_card_no != '' && this.formProfile.phone != 0) {
      this.addTransactionapi
        (
          {
            from_uid: 'Bank',
            type: 'Online',
            to_id: this.uid,
            utr: this.generateTransactionId(),
            amount: this.amount,
            description: 'Cash add',
            login_user: this.uid,
            payment: {
              mode: 'Online',
              status: 'Pending'
            },
            createdTime: new Date().toString()
          }
        )
    }
    else {
      this.toster.error("Please Update Pan Card no. First")
    }
  }
  private saveprofileapi(data: profile) {
    this.loading = true
    this.collectionservice.addDocumnet('profile', data).subscribe({
      next: (data: profile[]) => {
        this.toster.success('Profile Update Successfully')
        this.ngOnInit()
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      }
    })
  }
  private updateprofileapi(data: profile, id: string) {
    this.loading = true
    console.log(data)
    this.collectionservice.updateDocument('profile', id, data).subscribe((data) => {
      this.toster.success('Profile Update Successfully')
      this.ngOnInit()
      this.loading = false
    },
      (err) => {
        console.error(err)
        this.loading = false
      })
  }
  private getprofileapi() {
    this.loading = true
    this.collectionservice.getData('profile').subscribe({
      next: (data) => {
        let obj = data.filter((obj: profile) => obj.uid === this.uid)
        if (obj.length != 0) {
          this.formProfile = obj[0]
          // console.log(this.formProfile)
          this.skilList = this.formProfile.skil
          this.work_experience_list = this.formProfile.work_experience
          this.educationlist = this.formProfile.education
          this.awadsList = this.formProfile.award
          this.profileid = obj[0].id
          this.getTransactionapi()
        }
        else {
          console.log('no profile found')
        }
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      },

    })
  }
  changePasswordapi(oldPassword: string, newPassword: string, confirmPassword: string): void {
    if (oldPassword != "" && newPassword != "" && confirmPassword != "") {
      this.auth.changePasswordWithConfirmation(oldPassword, newPassword, confirmPassword)
        .subscribe(success => {
          if (success) {
            // Password changed successfully, do something
            this.toster.success('Password changed successfully');
          } else {
            // Failed to change password, handle error
            this.toster.error('Failed to change password');
          }
        });
    }
    else {
      this.toster.error("Empty Password Filed")
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.collectionservice.uploadFile(file, 'users/' + this.uid + '/profile').subscribe(
        (progress) => {
          // this.uploadProgress = progress;
          console.log('Upload progress:', progress);
        },
        (error) => {
          console.error('Upload error:', error);
        },
        () => {
          console.log('Upload complete');
          this.collectionservice.getDownloadUrl('users/' + this.uid + '/profile/' + file.name).subscribe(
            (url) => {
              this.formProfile.image = url;
              console.log('Download URL:', url);
              if (this.profileid != '') {
                this.updateprofileapi(this.formProfile, this.profileid)
              }
            },
            (error) => {
              console.error('Error getting download URL:', error);
            }
          );
        }
      );
    }
  }
  onDeleteFile(filePath: string) {
    this.collectionservice.deleteFile(filePath).subscribe(
      () => {
        console.log('File deleted successfully');
        this.formProfile.image = '';
        if (this.profileid != '') {
          this.updateprofileapi(this.formProfile, this.profileid)
        }
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
  private getTransactionapi() {
    this.collectionservice.getData('transaction').subscribe({
      next: (data: Transaction_detail[]) => {

        this.transactions = data
        this.formProfile = this.updateFreelancerTier(this.formProfile, this.transactions);
        let transaction_rewards_count = data.filter((item: Transaction) => (item.to_id === this.uid && item.type === 'project')).reduce((sum, item: Transaction) => sum + item.amount, 0) / 10000;
        if (this.formProfile.transaction_rewards < transaction_rewards_count) {
          this.formProfile.transaction_rewards = transaction_rewards_count
          this.addTransactionapi({
            from_uid: 'Auto',
            type: 'transaction_reward',
            to_id: this.uid,
            utr: '',
            amount: 100 * 0.20,
            description: 'Transaction reward Above 10000',
            login_user: this.uid,
            payment: {
              mode: 'transaction_reward',
              status: 'complated'
            },
            createdTime: new Date().toString()
          });
        }
        else {
          console.error('No transaction_rewards_count is not greater', this.formProfile.transaction_rewards, transaction_rewards_count)
        }
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }
  private addTransactionapi(datat: Transaction) {

    this.collectionservice.addDocumentWithId('transaction', datat.utr, datat).subscribe({
      next: (data: any) => {
        // console.log(data)
        if (datat.type === 'Online') {
          // this.formProfile.cash = this.formProfile.cash + datat.amount
          this.makePayment(this.formProfile.phone.toString(), datat.amount, datat.utr, this.profileid)
          // console.log(this.formProfile)
          // this.updateprofileapi(this.formProfile, this.profileid)
        }
        else {
          this.updateprofileapi(this.formProfile, this.profileid)
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
  private trigertrefreshnavbar() {
    this.sharedservice.triggerFunction();
  }
  private calculateTotalTransactionAmount(uid: string, transactions: Transaction[]): number {
    let totalAmount = 0;
    for (const transaction of transactions) {
      if (transaction.to_id === uid) {
        totalAmount += transaction.amount;
      }
    }
    return totalAmount;
  }
  private determineTier(workValue: number): string {
    if (Number(workValue) >= 4000000) {
      console.log(workValue)
      return 'Tier I';
    } else if (Number(workValue) >= 2000000) {
      console.log(workValue)
      return 'Tier II';
    } else if (Number(workValue) >= 1000000) {
      console.log(workValue)
      return 'Tier III';
    } else {
      return 'No Tier';
    }
  }
  private updateFreelancerTier(freelancer: profile, transactions: Transaction[]): profile {
    const totalWorkValue = this.calculateTotalTransactionAmount(freelancer.uid, transactions);
    freelancer.trie = this.determineTier(totalWorkValue);
    return freelancer;
  }
  private generateTransactionId(): string {
    let id = uuidv4();
    return id
  }
}
