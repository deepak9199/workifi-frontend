import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';

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
  projects: Project[] = []
  activeTab: string = '';
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService
  ) { }

  ngOnInit() {
    this.getprojectsapi()
  }

  // api call for workinghours
  private getprojectsapi() {
    this.collectionservice.getData("projects").subscribe({
      next: (data: Project[]) => {
        this.globalprojects = data
        this.projecttabtab('posted')
      },
      error: (error) => {
        console.error('Error fetching data:', error)
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

}
