import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

import { MainPageComponent } from './body/main-page/main-page.component';
import { FilterPageComponent } from './body/filter-page/filter-page.component';
import { MainSearchComponent } from './body/main-page/search/main-search.component';
import { SearchHistoryListComponent } from 'app/body/main-page/history/search-history-list.component';

import { FilterComponent } from 'app/body/filter-page/filter/filter.component';
import { ResultPageComponent } from 'app/body/filter-page/results/result-page.component';

import { RSearchComponent } from './components/r-search.component';
import { ListComponent } from './components/list.component';
import { ResultComponent } from './components/result.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { HttpService } from './services/http.service';
import { CurrentCountryService } from './services/current-country.service';

describe('AppComponent.component.spec.ts', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        BodyComponent,
        MainPageComponent,
        FilterPageComponent,
        MainSearchComponent,
        SearchHistoryListComponent,
        FilterComponent,
        ResultPageComponent,
        RSearchComponent,
        ListComponent,
        ResultComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpModule,
        JsonpModule
      ],
      providers: [
        HttpService,
        CurrentCountryService
      ]
    }).compileComponents();
  }));

  it('It should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
