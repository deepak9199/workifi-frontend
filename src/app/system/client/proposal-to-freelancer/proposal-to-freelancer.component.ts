import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { proposal, Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { profile } from '../../../model/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal-to-freelancer',
  templateUrl: './proposal-to-freelancer.component.html',
  styleUrl: './proposal-to-freelancer.component.css'
})
export class ProposalToFreelancerComponent {
  loading: boolean = false
  profile: profile = {
    points: 0,
    uid: '',
    created_date_time: '',
    updated_date_time: '',
    image: '',
    username: '',
    email: '',
    phone: 0,
    tagline: '',
    hourly_rate: '',
    gender: '',
    specialization: '',
    type: '',
    country: '',
    city: '',
    language: '',
    language_level: '',
    introduce_yourself: '',
    skil: [],
    education: [],
    work_experience: [],
    award: []
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
      hourly_price: Number(this.profile.hourly_rate.toString()),
      Estimated_Hours: this.profile.hourly_rate,
      cover_letter: ''
    }
    this.finalsubmit(proposal)
  }

  finalsubmit(data: proposal) {
    let proposals: proposal[] = []
    // proposals = this.profile.proposals
    let index: number = proposals.findIndex((item: proposal) => item.uid === this.token.getUser().uid)
    if (index > -1) {
      proposals[index] = data
    }
    else {
      proposals.push(data)
    }
    // this.profile.proposals = proposals
    // this.updateprojectapi(this.profile.id, this.profile)
  }
  callshareddata() {
    if (this.ValidatorChecker(this.sharedservice.getdata())) {
      const jsonData = this.sharedservice.getdata();
      if (jsonData !== null) {
        this.profile = JSON.parse(jsonData);
        console.log(this.profile)
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
    this.collectionservice.updateDocument('profile', id, data).subscribe(() => {
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
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
}
