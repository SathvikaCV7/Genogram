import { TestBed } from '@angular/core/testing';

import { ChildDetailsService } from './child-details.service';

describe('ChildDetailsService', () => {
  let service: ChildDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
