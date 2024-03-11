import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDialogComponent } from './prize-dialog.component';

describe('PrizeDialogComponent', () => {
  let component: PrizeDialogComponent;
  let fixture: ComponentFixture<PrizeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrizeDialogComponent]
    });
    fixture = TestBed.createComponent(PrizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
