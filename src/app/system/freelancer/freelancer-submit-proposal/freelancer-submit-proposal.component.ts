import { Component } from '@angular/core';
import { Project, proposal } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';

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
    proposals: [],
    uid: ''
  }
  formProposals: proposal = {
    uid: '',
    hourly_price: 0,
    Estimated_Hours: '',
    cover_letter: ''
  }
  constructor(
    private collectionservice: CollectionService,
    private sharedservice: SharedService,
    private router: Router,
    private toster: ToastrService,
    private token: TokenStorageService
  ) { }
  ngOnInit() {
    this.callshareddata()
  }
  submitproposal() {
    this.formProposals.uid = this.token.getUser().uid
    this.finalsubmit(this.formProposals)
  }
  submitaproposal() {
    let proposal: proposal = {
      uid: this.token.getUser().uid,
      hourly_price: this.projects.cost,
      Estimated_Hours: this.projects.projectduration,
      cover_letter: ''
    }
    this.finalsubmit(proposal)
  }

  finalsubmit(data: proposal) {
    let proposals: proposal[] = []
    proposals = this.projects.proposals
    let index: number = proposals.findIndex((item: proposal) => item.uid === this.token.getUser().uid)
    if (index > -1) {
      proposals[index] = data
    }
    else {
      proposals.push(data)
    }
    this.projects.proposals = proposals
    this.updateprojectapi(this.projects.id, this.projects)
  }
  callshareddata() {
    if (this.ValidatorChecker(this.sharedservice.getdata())) {
      const jsonData = this.sharedservice.getdata();
      if (jsonData !== null) {
        this.projects = JSON.parse(jsonData);
      } else {
        this.toster.error("Received null data from shared service.");
      }
    }
    else {
      this.router.navigate(['/freelancer/projectlist'])
    }
  }
  private updateprojectapi(id: string, data: Project) {
    this.loading = true
    this.collectionservice.updateDocument('projects', id, data).subscribe(() => {
      this.toster.success("Your proposal is submited successfully")
      this.loading = false
    },
      (error) => {
        console.error(error)
        this.loading = false
      })
  }
  route(data: Project) {
    this.sharedservice.savedata(JSON.stringify(data))
    this.router.navigate(['/freelancer/proposals'])
  }
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
}
