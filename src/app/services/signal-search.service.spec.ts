import { TestBed } from '@angular/core/testing';

import { SignalSearchService } from './signal-search.service';

describe('SignalSearchService', () => {
  let service: SignalSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
