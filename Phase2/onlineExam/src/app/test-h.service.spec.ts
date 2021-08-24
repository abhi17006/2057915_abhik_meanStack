import { TestBed } from '@angular/core/testing';

import { TestHService } from './test-h.service';

describe('TestHService', () => {
  let service: TestHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
