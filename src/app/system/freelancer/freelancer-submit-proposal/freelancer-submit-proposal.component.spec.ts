import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerSubmitProposalComponent } from './freelancer-submit-proposal.component';

describe('FreelancerSubmitProposalComponent', () => {
  let component: FreelancerSubmitProposalComponent;
  let fixture: ComponentFixture<FreelancerSubmitProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerSubmitProposalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerSubmitProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
