import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkYourCard } from './link-your-card';

describe('LinkYourCard', () => {
  let component: LinkYourCard;
  let fixture: ComponentFixture<LinkYourCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkYourCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkYourCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
