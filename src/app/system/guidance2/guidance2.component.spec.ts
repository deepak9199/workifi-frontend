import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guidance2Component } from './guidance2.component';

describe('Guidance2Component', () => {
  let component: Guidance2Component;
  let fixture: ComponentFixture<Guidance2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Guidance2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Guidance2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
