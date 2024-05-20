import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerManageJobsComponent } from './freelancer-manage-jobs.component';

describe('FreelancerManageJobsComponent', () => {
  let component: FreelancerManageJobsComponent;
  let fixture: ComponentFixture<FreelancerManageJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerManageJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerManageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
