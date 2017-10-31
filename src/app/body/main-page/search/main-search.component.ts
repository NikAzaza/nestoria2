import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject,
     OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/services/local-storage.service';
import { HttpService } from 'app/services/http.service';
import { RSearchComponent } from 'app/components/r-search.component';

@Component({
    selector: 'main-search',
    templateUrl: 'main-search.component.html',
    providers: [LocalStorageService, HttpService],
    styles: ['.input-group-btn {margin-top: 24px;}']
})

export class MainSearchComponent implements OnInit, OnChanges, OnDestroy {
    @Input() currentCountry;
    @ViewChild(RSearchComponent) searchComponent: RSearchComponent;
    isFormInvalid: boolean;
    searchString = '';

    data: string[];

    subOnHttp: any;
    constructor(@Inject(LocalStorageService) private locStorage: LocalStorageService,
                @Inject(HttpService) private httpService: HttpService,
                private router: Router) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.httpService) {
            this.subOnHttp = this.httpService
            .getCities(changes.currentCountry.currentValue.name)
            .subscribe((data) => {
                this.data = data;
            });
        }
    }

    ngOnInit(): void {
       /* this.httpService.getCities(this.currentCountry.name)
            .subscribe((data) => {
                this.data = data;
            });*/
    }

    private addSearchResult() {
        const results = this.locStorage.getSearchResults();
        results.push(this.searchString);
        this.locStorage.setSearchResults(results);
        this.router.navigate([
                this.currentCountry.country,
                'search',
                this.searchString]);

        this.searchComponent.clearForm();
    }
    private addSearchResultFromHint(city) {
        const results = this.locStorage.getSearchResults();
        results.push(city);
        this.locStorage.setSearchResults(results);

        this.router.navigate([
            this.currentCountry.country,
            'search',
            city]);
    }

    private setSearchString(str) {
        this.searchString = str;
    }

    private setStateOfForm(formStatus) {
        this.isFormInvalid = formStatus;
    }

    ngOnDestroy(): void {
        this.subOnHttp.unsubscribe();
    }
}
