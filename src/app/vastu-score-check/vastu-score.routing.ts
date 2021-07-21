import { VastuScoreModule } from './vastu-score.module';
import { VastuScoreToolComponent } from './vastu-score-tool/vastu-score-tool.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VastuScoreCheckComponent } from './vastu-score-check.component';

const route: Routes = [{ path: '', component: VastuScoreCheckComponent }];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class VastuRoutingModule {}
