import { Component } from '@angular/core';
import { Project, proposal } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { profile } from '../../../model/profile';
import { Conversation, Conversation_detail } from '../../../model/message.';
import { users_detail } from '../../../model/user';

@Component({
  selector: 'app-freelancer-submit-proposal',
  templateUrl: './freelancer-submit-proposal.component.html',
  styleUrl: './freelancer-submit-proposal.component.css'
})
export class FreelancerSubmitProposalComponent {
  loading: boolean = false
  projects: Project = {
    id: '',
    title: '',
    category: '',
    freelancertype: '',
    pricetype: '',
    cost: 0,
    projectduration: '',
    level: '',
    country: '',
    city: '',
    language: '',
    languageslevel: '',
    skills: '',
    projectdetail: '',
    status: '',
    upload: '',
    proposals: [],
    uid: '',
    assign_to: '',
    submit_status: '',
    subscribe: '',
    creatdatetime: ''
  }
  client: profile = {
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
    subscribe: { plan: '', datetime: '' },
    trie: '',
    cash: 0,
    bonus: 0
  }
  formProposals: proposal = {
    uid: '',
    hourly_price: 0,
    Estimated_Hours: '',
    cover_letter: '',
    creatdatetime: ''
  }
  private userlist: users_detail[] = []
  private conversationlist: Conversation_detail[] = []
  constructor(
    private collectionservice: CollectionService,
    private sharedservice: SharedService,
    private router: Router,
    private toster: ToastrService,
    private token: TokenStorageService
  ) { }
  ngOnInit() {
    this.callshareddata()
  }
  submitproposal() {
    this.formProposals.uid = this.token.getUser().uid
    this.formProposals.creatdatetime = new Date().toString()
    this.finalsubmit(this.formProposals)
  }
  submitaproposal() {
    let proposal: proposal = {
      uid: this.token.getUser().uid,
      hourly_price: this.projects.cost,
      Estimated_Hours: this.projects.projectduration,
      cover_letter: '',
      creatdatetime: ''
    }
    this.finalsubmit(proposal)
  }
  finalsubmit(data: proposal) {
    let proposals: proposal[] = []
    proposals = this.projects.proposals
    let index: number = proposals.findIndex((item: proposal) => item.uid === this.token.getUser().uid)
    if (index > -1) {
      proposals[index] = data
    }
    else {
      proposals.push(data)
    }
    this.projects.proposals = proposals
    this.updateprojectapi(this.projects.id, this.projects)
  }
  callshareddata() {
    if (this.ValidatorChecker(this.sharedservice.getdata())) {
      const jsonData = this.sharedservice.getdata();
      if (jsonData !== null) {
        this.projects = JSON.parse(jsonData);
        this.getuser()
      } else {
        this.toster.error("Received null data from shared service.");
      }
    }
    else {
      this.router.navigate(['/freelancer/projectlist'])
    }
  }
  private updateprojectapi(id: string, data: Project) {
    this.loading = true
    this.collectionservice.updateDocument('projects', id, data).subscribe(() => {
      this.toster.success("Your proposal is submited successfully")
      this.loading = false
    },
      (error) => {
        console.error(error)
        this.loading = false
      })
  }
  route(data: Project) {
    this.sharedservice.savedata(JSON.stringify(data))
    this.router.navigate(['/freelancer/proposals'])
  }
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
  private getprofileapi() {
    this.loading = true
    this.collectionservice.getData('profile').subscribe({
      next: (data) => {
        let obj = data.filter((obj: profile) => obj.uid === this.projects.uid)
        if (obj.length != 0) {
          this.client = obj[0]
          // console.log(this.client)
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
  chat(data: Project) {
    // console.log({ cid: data.uid, cname: this.getname(data.uid, this.userlist).name, lastmessagedatetime: '', messages: [], phoneno: this.getname(data.uid, this.userlist).phone, uid: this.token.getUser().uid })
    this.addconverstaionapi({ cid: this.token.getUser().uid, cname: this.getname(this.token.getUser().uid, this.userlist).name, lastmessagedatetime: '', messages: [], phoneno: this.getname(this.token.getUser().uid, this.userlist).phone, uid: this.projects.uid })
    this.router.navigate(['/message'])
  }
  private addconverstaionapi(data: Conversation) {
    const user = this.token.getUser();

    if (user && user.role && user.uid) {
      let checkconversation: Conversation_detail[] = this.conversationlist.filter((obj: Conversation_detail) =>
        user.role === 'freelancer' ? obj.cid === user.uid : obj.uid === user.uid
      );

      if (checkconversation.length === 0) {
        this.collectionservice.addDocumnet('conversation', data).subscribe({
          next: data => {
            console.log('Conversation is added successfully');
          },
          error: err => {
            console.error(err.message);
          }
        });
      } else {
        console.error('Conversation already exists');
      }
    } else {
      console.error('User, role, or UID is null');
    }


  }
  private getuser() {
    this.loading = true
    this.collectionservice.getData('users').subscribe({
      next: (data: users_detail[]) => {
        // console.log(data)
        this.userlist = data
        this.getuserconversation()
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }
  getname(id: string, list: users_detail[]) {
    let result = {
      name: '',
      phone: ''
    }
    let finddata: users_detail[] = list.filter((obj: users_detail) => obj.uid === id)
    if (finddata.length != 0) {
      result.name = finddata[0].name
      result.phone = finddata[0].contact
    }
    else {
      console.error('user not found')
    }
    return result
  }
  private getuserconversation() {
    this.loading = true
    this.collectionservice.getData('conversation').subscribe({
      next: (data: Conversation_detail[]) => {
        // console.log(data)
        this.conversationlist = data
        this.getprofileapi()
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }
}
