import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { users } from '../../../model/user';
import { profile } from '../../../model/profile';
import { subscribe } from 'diagnostics_channel';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.css'
})
export class ManageProjectComponent {

  loading: boolean = false
  postedprojects: boolean = false
  pendingprojects: boolean = false
  expiredprojects: boolean = false
  completedprojects: boolean = false
  outgoingprojects: boolean = false
  cancelprojects: boolean = false
  globalprojects: Project[] = []
  profile: profile = {
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
    proposals: []
  }
  projects: Project[] = []
  activeTab: string = '';
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService,
    private toster: ToastrService
  ) { }
  ngOnInit() {
    const user = this.token.getUser()
    if (user && user.uid) {
      this.getuserprofile(user.uid)
    }
    else {
      console.error('User Id is null')
    }
  }
  private getprojectsapi() {
    this.loading = true
    this.collectionservice.getData("projects").subscribe({
      next: (data: Project[]) => {
        this.globalprojects = data
        console.log(this.globalprojects)
        this.projecttabtab('posted')
        this.loading = false
      },
      error: (error) => {
        console.error('Error fetching data:', error)
        this.loading = false
      },
      complete: () => {
      },
    });
  }
  projecttabtab(type: string) {
    this.activeTab = type;
    switch (type) {
      case 'posted': {
        this.postedprojects = true
        this.pendingprojects = false
        this.expiredprojects = false
        this.completedprojects = false
        this.outgoingprojects = false
        this.cancelprojects = false
        this.projects = this.globalprojects.filter((item: Project) => item.status === 'posted')
        break;
      }
      case 'pending': {
        this.postedprojects = false
        this.pendingprojects = true
        this.expiredprojects = false
        this.completedprojects = false
        this.outgoingprojects = false
        this.cancelprojects = false
        this.projects = this.globalprojects.filter((item: Project) => item.status === 'pending')
        break;
      }
      case 'completed': {
        this.postedprojects = false
        this.pendingprojects = false
        this.expiredprojects = false
        this.completedprojects = true
        this.outgoingprojects = false
        this.cancelprojects = false
        this.projects = this.globalprojects.filter((item: Project) => item.status === 'completed')
        break;
      }
      case 'expired': {
        this.postedprojects = false
        this.pendingprojects = false
        this.expiredprojects = true
        this.completedprojects = false
        this.outgoingprojects = false
        this.cancelprojects = false
        this.projects = this.globalprojects.filter((item: Project) => item.status === 'expired')
        break;
      }
      case 'ongoing': {
        this.postedprojects = false
        this.pendingprojects = false
        this.expiredprojects = false
        this.completedprojects = false
        this.outgoingprojects = true
        this.cancelprojects = false
        this.projects = this.globalprojects.filter((item: Project) => item.status === 'ongoing')
        break;
      }
      case 'canceled': {
        this.postedprojects = false
        this.pendingprojects = false
        this.expiredprojects = false
        this.completedprojects = false
        this.outgoingprojects = false
        this.cancelprojects = true
        this.projects = this.globalprojects.filter((item: Project) => item.status === 'canceled')
        break;
      }
      default: {
        this.toster.error('Tab Option Selection is Wrong')
        this.projects = []
        break;
      }
    }
  }
  conform(index: number) {
    if (this.checkbalancetranscation()) {
      this.globalprojects[index].submit_status = 'confromed'
      this.globalprojects[index].status = 'completed'
      this.updateproject(this.globalprojects[index])
    }
    else {
      this.toster.error('error in transation')
    }
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
  checkbalancetranscation(): boolean {
    return false
  }
  getuserprofile(uid: string) {
    this.loading = true
    this.collectionservice.getDocumentById('profile', uid).subscribe({
      next: (data: any) => {
        console.log(data)
        this.profile = data
        this.getprojectsapi()
      },
      error: err => {
        console.error(err.message)
        this.loading = false
      }
    })
  }
}
