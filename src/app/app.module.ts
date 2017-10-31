import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { BodyComponent } from './body/body.component';
import { MainPageComponent } from './body/main-page/main-page.component';
import { MainSearchComponent } from './body/main-page/search/main-search.component';
import { SearchHistoryListComponent } from './body/main-page/history/search-history-list.component';

import { FilterPageComponent } from './body/filter-page/filter-page.component';
import { FilterComponent } from './body/filter-page/filter/filter.component';
import { ResultPageComponent } from './body/filter-page/results/result-page.component';

import { HeaderComponent } from './header/header.component';

import { ListComponent } from './components/list.component';
import { RSearchComponent } from './components/r-search.component';
import { ResultComponent } from './components/result.component';

import { CurrentCountryService } from './services/current-country.service';
import { MyServiceService } from './services/my-service.service';

import { appRoutes } from './interfaces/routes.interface';

@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    AppComponent,
    MainSearchComponent,
    SearchHistoryListComponent,
    MainPageComponent,
    RSearchComponent,
    ListComponent,
    FilterPageComponent,
    FilterComponent,
    ResultPageComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CurrentCountryService, MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
