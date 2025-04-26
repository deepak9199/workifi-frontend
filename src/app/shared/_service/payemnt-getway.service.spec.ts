import { TestBed } from '@angular/core/testing';

import { PayemntGetwayService } from './payemnt-getway.service';

describe('PayemntGetwayService', () => {
  let service: PayemntGetwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayemntGetwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
