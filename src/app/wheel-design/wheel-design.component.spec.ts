import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelDesignComponent } from './wheel-design.component';

describe('WheelDesignComponent', () => {
  let component: WheelDesignComponent;
  let fixture: ComponentFixture<WheelDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WheelDesignComponent]
    });
    fixture = TestBed.createComponent(WheelDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
