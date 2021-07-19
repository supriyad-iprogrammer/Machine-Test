import { VastuScoreCheckComponent } from './vastu-score-check/vastu-score-check.component';

import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full' },
{path:'home', component:HomeComponent},
{path:'vastuScore', component:VastuScoreCheckComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
