import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { VastuScoreToolComponent } from './vastu-score-check/vastu-score-tool/vastu-score-tool.component';
import { VastuScoreCheckComponent } from './vastu-score-check/vastu-score-check.component';

import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/vastuCheck', pathMatch: 'full' },
  { path: 'vastuCheck', component: HomeComponent },
  {
    path: 'vastuScore',
    loadChildren: () =>
      import('./vastu-score-check/vastu-score.module').then(
        (m) => m.VastuScoreModule
      ),
  },
  // { path: 'vastuScore', component: VastuScoreCheckComponent },

  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
