import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freelancer-project-list',
  templateUrl: './freelancer-project-list.component.html',
  styleUrl: './freelancer-project-list.component.css'
})
export class FreelancerProjectListComponent {
  loading: boolean = false
  projects: Project[] = []
  constructor(
    private collectionservice: CollectionService,
    private sharedservice: SharedService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getprojectapi()
  }
  private getprojectapi() {
    this.loading = true
    this.collectionservice.getData('projects').subscribe({
      next: (data: Project[]) => {
        this.projects = data
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      }
    })
  }
  route(data: Project) {
    this.sharedservice.savedata(JSON.stringify(data))
    this.router.navigate(['/freelancer/proposals'])
  }
}
