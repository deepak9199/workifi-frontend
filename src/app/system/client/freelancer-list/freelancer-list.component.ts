import { Component } from '@angular/core';
import { getprofile, profile } from '../../../model/profile';
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
  profile: getprofile[] = []
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
      next: (data: getprofile[]) => {
        this.profile = data.filter((obj: getprofile) => obj.skil.length != 0)
        // console.log(this.profile)
        this.profile = this.getSortedUserData(this.profile)
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
  sortByDate(array: profile[]): any[] {
    return array.sort((a, b) => {
      const date1 = new Date(a.created_date_time);
      const date2 = new Date(b.created_date_time);
      return date1.getTime() - date2.getTime();
    });
  }
  private subscriptionPriority: { [key: string]: number } = {
    "": 3,        // Empty string has the lowest priority
    "Standard": 2,
    "Premium": 1  // Premium has the highest priority
  };
  private customSort(a: any, b: any): number {
    // Compare based on subscription plan priority
    if (this.subscriptionPriority[a.subscribe.plan] !== this.subscriptionPriority[b.subscribe.plan]) {
      return this.subscriptionPriority[a.subscribe.plan] - this.subscriptionPriority[b.subscribe.plan];
    }

    // If the subscription plans are the same, compare by created_date_time in ascending order
    const dateA = new Date(a.created_date_time);
    const dateB = new Date(b.created_date_time);

    return dateA.getTime() - dateB.getTime();
  }
  private getSortedUserData(data: any[]): any[] {
    return data.sort((a, b) => this.customSort(a, b));
  }

}
