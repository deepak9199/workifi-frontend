import { Component } from '@angular/core';
import { CollectionService } from '../../../shared/_service/collection.service';
import { Project, proposal } from '../../../model/projects';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { error } from 'console';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.css'
})
export class ProposalsComponent {
  loading: boolean = false
  projects: Project[] = []
  porposal_list: proposal[] = []
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
  setPorposal(data: proposal[]) {
    this.porposal_list = data
  }
}
