import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogElements } from './dialog-elements';

describe('DialogElements', () => {
  let component: DialogElements;
  let fixture: ComponentFixture<DialogElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogElements],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
