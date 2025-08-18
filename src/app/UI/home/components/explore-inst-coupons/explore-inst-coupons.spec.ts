import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreInstCoupons } from './explore-inst-coupons';

describe('ExploreInstCoupons', () => {
  let component: ExploreInstCoupons;
  let fixture: ComponentFixture<ExploreInstCoupons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreInstCoupons],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreInstCoupons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
