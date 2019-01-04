import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PolynomialRegressionComponent } from './polynomial-regression.component';

describe('GradientDescentComponent', () => {
  let component: PolynomialRegressionComponent;
  let fixture: ComponentFixture<PolynomialRegressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolynomialRegressionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolynomialRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
