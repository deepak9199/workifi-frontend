import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOverVireComponent } from './company-over-vire.component';

describe('CompanyOverVireComponent', () => {
  let component: CompanyOverVireComponent;
  let fixture: ComponentFixture<CompanyOverVireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyOverVireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyOverVireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
