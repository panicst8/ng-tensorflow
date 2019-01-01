import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientDescentComponent } from './gradient-descent.component';

describe('GradientDescentComponent', () => {
  let component: GradientDescentComponent;
  let fixture: ComponentFixture<GradientDescentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientDescentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientDescentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
