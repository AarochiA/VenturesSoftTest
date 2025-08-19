import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedInstCoupons } from './featured-inst-coupons';

describe('FeaturedInstCoupons', () => {
  let component: FeaturedInstCoupons;
  let fixture: ComponentFixture<FeaturedInstCoupons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedInstCoupons],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedInstCoupons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
