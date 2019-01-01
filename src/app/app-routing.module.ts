import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradientDescentComponent } from './gradient-descent/gradient-descent.component';

const routes: Routes = [
  { path: 'gradient', component: GradientDescentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
