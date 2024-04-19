import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-freelancer-submit-proposal',
  templateUrl: './freelancer-submit-proposal.component.html',
  styleUrl: './freelancer-submit-proposal.component.css'
})
export class FreelancerSubmitProposalComponent {
  loading: boolean = false
  projects: Project = {
    id: '',
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
    proposals: []
  }
  constructor(
    private collectionservice: CollectionService,
    private sharedservice: SharedService,
    private router: Router,
    private toster: ToastrService
  ) { }
  ngOnInit() {

  }
  private updateproject(id: string, data: Project) {
    this.loading = true
    this.collectionservice.updateDocument('projects', id, data).subscribe(() => {
      this.toster.success("Your proposal is submited successfully")
    },
      (error) => {
        console.error(error)
      })
  }
  route(data: Project) {
    this.sharedservice.savedata(JSON.stringify(data))
    this.router.navigate(['/freelancer/proposals'])
  }
}
