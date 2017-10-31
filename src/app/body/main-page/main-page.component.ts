import { Component, Inject, OnInit } from '@angular/core';
import { MainSearchComponent } from './search/main-search.component';
import { HttpService } from 'app/services/http.service';
import { CurrentCountryService } from 'app/services/current-country.service';

@Component({
    selector: 'main-page',
    templateUrl: 'main-page.component.html',
    styleUrls: ['main-page.component.scss'],
    providers: [HttpService]
})
export class MainPageComponent implements OnInit {
    currentCountry: Object = {};
    countriesList: Object[];

    constructor(@Inject(HttpService) private httpService: HttpService,
                private currCountryService: CurrentCountryService) {}

    ngOnInit(): void {
        this.currentCountry = this.currCountryService.currentCountry;

        this.httpService.getListOfCountries()
            .subscribe(data => {
                this.countriesList = data;
            })
    }

    private setCurrentCountry(country: Object) {
        this.currentCountry = country;
        this.currCountryService.currentCountry = country;
    }
}
