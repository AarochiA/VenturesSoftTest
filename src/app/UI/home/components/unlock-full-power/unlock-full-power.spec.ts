import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockFullPower } from './unlock-full-power';

describe('UnlockFullPower', () => {
  let component: UnlockFullPower;
  let fixture: ComponentFixture<UnlockFullPower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlockFullPower],
    }).compileComponents();

    fixture = TestBed.createComponent(UnlockFullPower);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
