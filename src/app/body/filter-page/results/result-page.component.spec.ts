import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ResultPageComponent } from './result-page.component';

import { RSearchComponent } from 'app/components/r-search.component';

import { ResultComponent } from 'app/components/result.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpService } from 'app/services/http.service';

import { HttpModule, JsonpModule } from '@angular/http';
import { CurrentCountryService } from 'app/services/current-country.service';

describe('Result-page.component.spec.ts', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultPageComponent,
        RSearchComponent,
        ResultComponent ],
      imports: [
        ReactiveFormsModule,
        HttpModule,
        JsonpModule
      ],
      providers: [
        HttpService,
        CurrentCountryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([HttpService], (injectService: HttpService) => {
      const testHttpService = TestBed.get(HttpService);
      expect(injectService).toBe(testHttpService);
    })
  );

  it('Testing call of httpGet', () => {
    const testHttpService = TestBed.get(HttpService);
    const testCountryService = TestBed.get(CurrentCountryService);

    spyOn(testHttpService, 'getCities');
    testHttpService.getCities(testCountryService.currentCountry.name);
    expect(testHttpService.getCities).toHaveBeenCalled()
  });

  it('testing testFunction()', () => {
      expect(component.testFunction(1, 2)).toBe(3);
  });
});
