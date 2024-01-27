import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesHistoryComponent } from './moves-history.component';

describe('MovesHistoryComponent', () => {
  let component: MovesHistoryComponent;
  let fixture: ComponentFixture<MovesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
