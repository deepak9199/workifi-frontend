import { Component } from '@angular/core';
import { Project } from '../../../model/projects';
import { CollectionService } from '../../../shared/_service/collection.service';
import { SharedService } from '../../../shared/_service/shared.service';
import { Router } from '@angular/router';
import { profile } from '../../../model/profile';

@Component({
  selector: 'app-freelancer-project-list',
  templateUrl: './freelancer-project-list.component.html',
  styleUrl: './freelancer-project-list.component.css'
})
export class FreelancerProjectListComponent {
  loading: boolean = false
  projects: Project[] = []
  globleprojects: Project[] = []
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
        this.projects = data.filter((obj: Project) => obj.status === 'posted')
        this.projects = this.sortByDate(this.projects)
        this.globleprojects = this.projects
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
  sortByDate(array: Project[]): any[] {
    return array.sort((a, b) => {
      const date1 = new Date(a.creatdatetime);
      const date2 = new Date(b.creatdatetime);
      return date1.getTime() - date2.getTime();
    });
  }
  // Method to filter items based on search query
  filterItems(searchQuery: string) {
    if (!searchQuery.trim()) {
      // If search query is empty, show all items
      this.projects = this.globleprojects;
      return;
    }
    // console.log(this.filteredItems)
    this.projects = this.globleprojects.filter(item => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key as keyof Project]; // Asserting key as keyof Item
          if (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });
    // console.log(this.filteredItems)
  }
}
