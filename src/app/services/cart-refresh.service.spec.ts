import { TestBed } from '@angular/core/testing';

import { CartRefreshService } from './cart-refresh.service';

describe('CartRefreshService', () => {
  let service: CartRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
