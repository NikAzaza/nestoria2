import { Component, OnInit , Inject, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RequestOptions } from 'app/interfaces/request-options.interface';
import { HttpService } from 'app/services/http.service';


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    providers: [HttpService]
})

export class FilterComponent implements OnInit {
    filterForm: FormGroup;
    queryParameters: Object;
    @Output() filter = new EventEmitter<Object>();
    arrayOfSortTypes = [
    'relevancy',
    'bedroom_lowhigh',
    'bedroom_highlow',
    'price_lowhigh',
    'price_highlow',
    'newest',
    'oldest',
    'random',
    'distance'];
    constructor(private fb: FormBuilder,
                @Inject(HttpService) private httpService) {

        this.createForm();

        this.filterForm.valueChanges
            .subscribe(changes => {
                console.log(this.transformFiltres(changes));
                this.queryParameters = this.transformFiltres(changes);
                this.filter.emit(this.queryParameters);
            }
        );
    }

    ngOnInit() { }

    private createForm() {
        this.filterForm = this.fb.group({
            listing_type: 'buy',
            price: this.fb.group({
                1: '',
                2: ''
            }),
            bedroom: this.fb.group({
                0: '',
                1: '',
                2: '',
                3: '',
                4: ''
            }),
            bathroom: this.fb.group({
                1: '',
                2: '',
                3: '',
                4: ''
            }),
            number_of_results: 50,
            sort: {}
        });
    }

    private transformFiltres(filter: Object): Object {
        const options: Object = { action: 'search_listings', encoding: 'json', callback: 'JSONP_CALLBACK'};

        for (const property in filter) {
            if (filter.hasOwnProperty(property)) {
                const propValue = filter[property];

                if (propValue instanceof Object) {
                    const minMaxObject = this.getMinAndMax(propValue, property);

                    for (const prop in minMaxObject) {
                        if (minMaxObject.hasOwnProperty(prop)) {
                            options[prop] = minMaxObject[prop];
                        }
                    }
                } else {
                    options[property] = propValue;
                }
            }
        }
        return options;
    }

    private getMinAndMax(obj: Object, propName: string) {
        const arr = [];

        for (const propertyName in obj) {
            if (obj.hasOwnProperty(propertyName) && obj[propertyName]) {
                if (propName === 'price') {
                    arr.push(obj[propertyName]);
                } else {
                    arr.push(propertyName);
                }
            }
        }
        if (!arr.length) {
            return {};
        }
        const max =  Math.max.apply(Math, arr),
              min = Math.min.apply(Math, arr),
              minName = propName.concat('_min'),
              maxName = propName.concat('_max'),
              returnedObj = {};

        returnedObj[minName] = min;
        if (min !== max) {
            returnedObj[maxName] = max;
        }
        return returnedObj;
    }

}
