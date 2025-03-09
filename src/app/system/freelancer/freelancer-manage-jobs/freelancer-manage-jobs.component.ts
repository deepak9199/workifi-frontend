import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { Token } from '@angular/compiler';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';

@Component({
  selector: 'app-freelancer-manage-jobs',
  templateUrl: './freelancer-manage-jobs.component.html',
  styleUrl: './freelancer-manage-jobs.component.css'
})
export class FreelancerManageJobsComponent {

  loading: boolean = false
  postedprojects: boolean = false
  pendingprojects: boolean = false
  expiredprojects: boolean = false
  completedprojects: boolean = false
  outgoingprojects: boolean = false
  cancelprojects: boolean = false
  globalprojects: Project[] = []
  projects: Project[] = []
  activeTab: string = '';
  private uid: string = ''
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
    const user = this.token.getUser()
    if (user && user.uid) {
      this.uid = user.uid
      this.getprojectsapi()
    }
    else {
      console.error('uId is null')
    }
    this.scrollToTop()
  }



  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // api call for workinghours
  private getprojectsapi() {
    this.loading = true
    this.collectionservice.getData("projects").subscribe({
      next: (data: Project[]) => {
        this.globalprojects = data.filter((item: Project) => item.assign_to === this.uid)
        console.log(this.globalprojects)
        this.projecttabtab('ongoing')
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
  submit(index: number) {
    this.globalprojects[index].submit_status = 'submit'
    this.updateproject(this.globalprojects[index])
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
}
