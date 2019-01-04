import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradientDescentComponent } from './gradient-descent/gradient-descent.component';
import { PolynomialRegressionComponent } from './polynomial-regression/polynomial-regression.component';

const routes: Routes = [
  { path: 'gradient', component: GradientDescentComponent },
  { path: 'polynomial', component: PolynomialRegressionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
