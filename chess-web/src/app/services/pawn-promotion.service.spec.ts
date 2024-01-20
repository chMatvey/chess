import { TestBed } from '@angular/core/testing';

import { PawnPromotionService } from './pawn-promotion.service';

describe('PawnPromotionService', () => {
  let service: PawnPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawnPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
