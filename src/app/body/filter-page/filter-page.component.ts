import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { HttpService } from 'app/services/http.service';
import { CurrentCountryService } from 'app/services/current-country.service';

@Component({
    selector: 'app-filter-page',
    templateUrl: 'filter-page.component.html',
    styleUrls: ['filter-page.component.scss'],
    providers: [HttpService]
})

export class FilterPageComponent implements OnInit, OnDestroy {

    queryParamsFromMainPage: Object;
    queryParameters: Object = {};
    respond: Array<Object>;
    currentCountry: Object;

    subOnRouter: any;
    subOnInit: any;
    subOnHttp: any;

    constructor(@Inject(HttpService) private httpService,
                @Inject(CurrentCountryService) private currCountry,
                private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.currentCountry = this.currCountry.currentCountry;

        this.subOnRouter = this.router.params
            .subscribe(filter => {
                console.log('PARAMETERS:');
                console.log(filter);
                this.queryParamsFromMainPage = {
                    action: 'search_listings',
                    encoding: 'json',
                    place_name: filter['place'],
                    country: filter['country'],
                    callback: 'JSONP_CALLBACK'};
            });

        this.subOnInit = this.httpService
            .sendRequest(this.queryParamsFromMainPage, this.currentCountry['server'])
            .subscribe(data => {
               this.respond = data['response']['listings'];
            });
    }

    private sendRequestToServer() {
        this.subOnHttp = this.httpService
            .sendRequest(this.queryParameters, this.currentCountry['server'])
            .subscribe((data: Object) => {
                console.log(data);
                console.log(data['response']['listings']);

                this.respond = data['response']['listings'];
            });
    }

    private refreshFilter(currFilter) {
        this.queryParameters = currFilter;
        this.queryParameters['place_name'] = this.queryParamsFromMainPage['place_name'];
        this.queryParameters['country'] = this.queryParamsFromMainPage['country'];
    }

    ngOnDestroy(): void {
        this.subOnRouter.unsubscribe();
        this.subOnInit.unsubscribe();
        this.subOnHttp.unsubscribe();
    }
}
