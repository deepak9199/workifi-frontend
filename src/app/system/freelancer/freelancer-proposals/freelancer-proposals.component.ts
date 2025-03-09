import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { TokenStorageService } from '../../../shared/_service/token-storage.service';
import { profile } from '../../../model/profile';

@Component({
  selector: 'app-freelancer-proposals',
  templateUrl: './freelancer-proposals.component.html',
  styleUrl: './freelancer-proposals.component.css'
})
export class FreelancerProposalsComponent {
  loading: boolean = false
  profile: profile[] = []
  private uid: string = ''
  constructor(
    private collectionservice: CollectionService,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
    const user = this.token.getUser()
    if (user && user.uid) {
      this.uid = user.uid
      this.getproposalsapi()
    }
    else {
      console.error('Uid is null')
    }
    this.scrollToTop()
  }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getproposalsapi() {
    this.loading = true
    this.collectionservice.getData('profile').subscribe({
      next: (data: profile[]) => {
        this.loading = false
        // console.log(data)
        this.profile = data.filter((item: profile) => item.proposals.length != 0 && item.uid === this.uid)
        // console.log(this.profile)
      }
      , error: (err) => {
        this.loading = false
        console.error(err)
      }
    })
  }
}
