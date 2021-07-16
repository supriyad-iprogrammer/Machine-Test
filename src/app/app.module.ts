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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VastuScoreCheckComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule


  ],
  providers: [Dataservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
