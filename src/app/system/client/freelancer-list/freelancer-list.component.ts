import { Component } from '@angular/core';
import { profile } from '../../../model/profile';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrl: './freelancer-list.component.css'
})
export class FreelancerListComponent {
  loading: boolean = false
  profile: profile[] = []
  constructor(
    private collectionservice: CollectionService,
    private sharedservice: SharedService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getprofileapi()
  }
  private getprofileapi() {
    this.loading = true
    this.collectionservice.getData('profile').subscribe({
      next: (data: profile[]) => {
        this.profile = data
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      }
    })
  }
  route(data: profile) {
    // console.log(data)
    this.sharedservice.savedata(JSON.stringify(data))
    this.router.navigate(['/client/proposalstofreelancer'])
  }
}
