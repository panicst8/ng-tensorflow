import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GradientDescentComponent } from './gradient-descent/gradient-descent.component';
import { PolynomialRegressionComponent } from './polynomial-regression/polynomial-regression.component';

@NgModule({
  declarations: [
    AppComponent,
    GradientDescentComponent,
    PolynomialRegressionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
