import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalToFreelancerComponent } from './proposal-to-freelancer.component';

describe('ProposalToFreelancerComponent', () => {
  let component: ProposalToFreelancerComponent;
  let fixture: ComponentFixture<ProposalToFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProposalToFreelancerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposalToFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
