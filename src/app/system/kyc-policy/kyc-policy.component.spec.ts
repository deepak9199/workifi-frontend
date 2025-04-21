import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycPolicyComponent } from './kyc-policy.component';

describe('KycPolicyComponent', () => {
  let component: KycPolicyComponent;
  let fixture: ComponentFixture<KycPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
