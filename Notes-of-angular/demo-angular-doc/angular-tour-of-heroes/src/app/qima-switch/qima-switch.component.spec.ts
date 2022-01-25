import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QimaSwitchComponent } from './qima-switch.component';

describe('QimaSwitchComponent', () => {
  let component: QimaSwitchComponent;
  let fixture: ComponentFixture<QimaSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QimaSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QimaSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
