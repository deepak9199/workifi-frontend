import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';

@Component({
  selector: 'app-freelancer-proposals',
  templateUrl: './freelancer-proposals.component.html',
  styleUrl: './freelancer-proposals.component.css'
})
export class FreelancerProposalsComponent {
  loading: boolean = false
  projects: Project[] = []
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService
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
        console.log(this.projects)
      }
      , error: (err) => {
        this.loading = false
        console.error(err)
      }
    })
  }
}
