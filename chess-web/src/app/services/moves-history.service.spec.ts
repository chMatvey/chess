import { TestBed } from '@angular/core/testing';

import { MovesHistoryService } from './moves-history.service';

describe('MovesHistoryService', () => {
  let service: MovesHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovesHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
