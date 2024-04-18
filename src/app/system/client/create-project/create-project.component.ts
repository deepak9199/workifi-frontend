import { Component } from '@angular/core';
import { CollectionService } from '../../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { createProject } from '../../../model/projects';

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
    upload: ''
  }
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService
  ) { }
  ngOnInit() {

  }
  createproject() {
    console.log(this.formcreateproject)
    this.formcreateproject.status = 'pending'
    this.createProjectApi(this.formcreateproject)
  }
  private createProjectApi(data: createProject) {
    this.collectionservice.addDocumnet('projects', data).subscribe({
      next: (response) => {

        this.toster.success('Project Save Successfully')
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}
