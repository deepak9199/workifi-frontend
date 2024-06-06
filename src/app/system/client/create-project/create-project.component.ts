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
    const user = this.token.getUser();
    if (user && user.uid) {
      console.log(this.formcreateproject)
      this.formcreateproject.uid = user.uid
      this.formcreateproject.status = 'pending'
      console.log(this.formcreateproject)
      this.createProjectApi(this.formcreateproject)
    } else {
      console.error('User or UID is null');
    }
  }
  createPubliceproject() {
    const user = this.token.getUser();
    if (user && user.uid) {
      console.log(this.formcreateproject)
      this.formcreateproject.uid = user.uid;
      this.formcreateproject.status = 'posted'
      this.createProjectApi(this.formcreateproject)
    } else {
      console.error('User or UID is null');
    }


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
