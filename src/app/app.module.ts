import { VastuScoreToolComponent } from './vastu-score-check/vastu-score-tool/vastu-score-tool.component';
import { Dataservice } from './service/data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VastuScoreCheckComponent } from './vastu-score-check/vastu-score-check.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './common_layout/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './common_layout/header/header.component';
import { FooterComponent } from './common_layout/footer/footer.component';
import { VastuScoreModule } from './vastu-score-check/vastu-score.module';


import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponentComponent,

  ],
  imports: [VastuScoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,


  ],
  providers: [Dataservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
