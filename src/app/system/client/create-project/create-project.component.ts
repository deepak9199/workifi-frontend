import { Component } from '@angular/core';
import { CollectionService } from '../../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { createProject } from '../../../model/projects';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { proposal } from '../../../model/profile';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  loading: boolean = false
  formcreateproject: createProject = {
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
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService,
    private token: TokenStorageService
  ) { }
  ngOnInit() {

  }
  createproject() {
    console.log(this.formcreateproject)
    this.formcreateproject.uid = this.token.getUser().uid
    this.formcreateproject.status = 'pending'
    console.log(this.formcreateproject)
    this.createProjectApi(this.formcreateproject)
  }
  createPubliceproject() {
    console.log(this.formcreateproject)
    this.formcreateproject.uid = this.token.getUser().uid
    this.formcreateproject.status = 'posted'
    this.createProjectApi(this.formcreateproject)
  }
  private createProjectApi(data: createProject) {
    this.loading = true
    this.collectionservice.addDocumnet('projects', data).subscribe({
      next: (response) => {

        this.toster.success('Project Save Successfully')
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      }
    })
  }
}
