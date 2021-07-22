import { VastuScoreToolComponent } from './vastu-score-tool/vastu-score-tool.component';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VastuScoreCheckComponent } from './vastu-score-check.component';
import { BreadcrumbComponent } from '../common_layout/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { VastuRoutingModule } from '../vastu-score-check/vastu-score.routing';


@NgModule({
  declarations: [
    VastuScoreToolComponent,
    VastuScoreCheckComponent,
    BreadcrumbComponent,

  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    VastuRoutingModule,
  ],
  exports: [
    VastuScoreToolComponent,
    VastuScoreCheckComponent,
    BreadcrumbComponent,
  ],
})
export class VastuScoreModule {}
