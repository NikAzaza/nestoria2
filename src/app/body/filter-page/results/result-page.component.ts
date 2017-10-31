import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { RSearchComponent } from 'app/components/r-search.component';
import { HttpService } from 'app/services/http.service';
import { CurrentCountryService } from 'app/services/current-country.service';
import { ResultComponent } from 'app/components/result.component';

@Component({
    selector: 'app-result-page',
    templateUrl: 'result-page.component.html',
    providers: [HttpService],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultPageComponent implements OnInit {
    data: string[] = [];
    @Input() respond;

    constructor(@Inject(HttpService) private httpService: HttpService,
                private currCountry: CurrentCountryService) { }

    ngOnInit() {
        this.httpService.getCities(this.currCountry.currentCountry['name'])
            .subscribe((data) => {
                console.log(`COUNTRY:`);
                this.data = data;
                console.log(this.data);
            });
    }

    private setCurrentSearchValue(str) {
        console.log(`curr: ${str}` );
    }
    private addSearchResultFromHint(str) {
        console.log(`start search: ${str}`);
    }

    public testFunction(a, b) {
        return a + b;
    }
}
