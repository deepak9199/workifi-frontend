import { Component } from '@angular/core';
import { CollectionService } from '../../../shared/_service/collection.service';
import { Project, proposal } from '../../../model/projects';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { error } from 'console';
import { subscribe } from 'diagnostics_channel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Conversation, Conversation_detail } from '../../../model/message.';
import { users, users_detail } from '../../../model/user';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.css'
})
export class ProposalsComponent {
  loading: boolean = false
  projects: Project[] = []
  selected_project: Project = {
    id: '',
    uid: '',
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
    assign_to: '',
    proposals: [],
    submit_status: '',
    subscribe: '',
    creatdatetime: ''
  }
  private uid: string = ''
  private userlist: users_detail[] = []
  private conversationlist: Conversation_detail[] = []
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService,
    private toster: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.token.getUser()
    if (user && user.uid) {
      this.uid = user.uid
      this.getuser()
    }
    else {
      console.error('Uid is null')
    }
    this.scrollToTop()
  }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getproposalsapi() {
    this.loading = true
    this.collectionservice.getData('projects').subscribe({
      next: (data: Project[]) => {
        this.loading = false
        this.projects = data.filter((item: Project) => item.proposals.length != 0 && item.uid === this.uid)
        // console.log(this.projects)
      }
      , error: (err) => {
        this.loading = false
        console.error(err)
      }
    })
  }
  setPorposal(data: Project) {
    this.selected_project = data
  }
  assignto(data: Project, assignto: string) {
    data.assign_to = assignto
    data.status = 'ongoing'
    data.proposals = []
    this.updateproject(data)
  }
  updateproject(data: Project) {
    this.loading = true
    this.collectionservice.updateDocument('projects', data.id, data).subscribe({
      next: (data) => {
        this.toster.success('Accepted')
        this.loading = false
      },
      error: (err) => {
        this.toster.error(err)
        this.loading = false
      }
    })
  }
  chat(data: proposal) {
    // console.log({ cid: data.uid, cname: this.getname(data.uid, this.userlist).name, lastmessagedatetime: '', messages: [], phoneno: this.getname(data.uid, this.userlist).phone, uid: this.token.getUser().uid })
    const user = this.token.getUser();

    if (user && user.uid) {
      const uid = user.uid;
      const conversationData = {
        cid: data.uid,
        cname: this.getname(data.uid, this.userlist).name,
        lastmessagedatetime: '',
        messages: [],
        phoneno: this.getname(data.uid, this.userlist).phone,
        uid: uid
      };

      // Assuming this.addconverstaionapi and this.getname return promises
      Promise.all([
        this.getname(data.uid, this.userlist),
        this.addconverstaionapi(conversationData)
      ]).then(([nameData, response]) => {
        this.router.navigate(['/message']);
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.error('User or UID is null');
    }

  }
  private addconverstaionapi(data: Conversation) {
    let checkconversation: Conversation_detail[] = this.conversationlist.filter((obj: Conversation_detail) => obj.uid === data.uid)
    if (checkconversation.length == 0) {
      this.collectionservice.addDocumnet('conversation', data).subscribe({
        next: data => {
          console.log('Conversation is added successfuly')
        },
        error: err => {
          console.error(err.message)
        }
      })
    }
    else {
      console.error('conversation already exist')
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
        this.getproposalsapi()
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }
}
