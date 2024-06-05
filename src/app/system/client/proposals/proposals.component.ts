import { Component } from '@angular/core';
import { CollectionService } from '../../../shared/_service/collection.service';
import { Project, proposal } from '../../../model/projects';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { error } from 'console';
import { subscribe } from 'diagnostics_channel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService,
    private toster: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getproposalsapi()
  }
  getproposalsapi() {
    this.loading = true
    this.collectionservice.getData('projects').subscribe({
      next: (data: Project[]) => {
        this.loading = false
        this.projects = data.filter((item: Project) => item.proposals.length != 0 && item.uid === this.token.getUser().uid)
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
  chat() {
    this.router.navigate(['/message'])
  }
}
