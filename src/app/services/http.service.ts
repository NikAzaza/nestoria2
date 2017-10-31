import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers, Jsonp} from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    constructor(private http: Http,
                private jsonp: Jsonp) { }

    public getCities(country: string):  Observable<string[]> {
        let cities = [];
        return this.http.get('assets/allCities.json')
            .map((resp: Response) => {
                cities = resp.json()[country];
                return cities || [];
            })
    }

    public getCountriesArray(): Observable<Object[]> {
        let countries = [];
        return this.http.get('assets/countries.json')
            .map((resp: Response) => {
                countries = resp.json()['countries'];
                return countries;
            });

    }
    public getListOfCountries(): Observable<Object[]> {
        const countriesList = [];
        return this.http.get('assets/countries.json')
            .map((resp: Response) => {
                const arrayWithCountries = resp.json()['countries'];

                console.log(arrayWithCountries);
                arrayWithCountries.forEach(element => {
                   /* countriesList.push({'name': element['name'],
                                        'localeName': element['localeName'],
                                        '':element['']});*/
                    countriesList.push(element);
                });
                return countriesList;
            });
    }

    public sendRequest(options, server) {
        const requestOptions = new RequestOptions();
        // const server = 'https://api.nestoria.co.uk/api';
        server = server += '/api';
        requestOptions.headers = this.getHeaders();
        requestOptions.params = this.getURLParameters(options);

        return this.jsonp.get(server, {params: this.getURLParameters(options), headers: this.getHeaders()})
            .map((resp: Response) => {
                return resp.json();
            });
    }

    private getURLParameters(options: Object): URLSearchParams {
        const params = new URLSearchParams();
        for (const parameterName in options) {
            if (options.hasOwnProperty(parameterName)) {
                params.set(parameterName, options[parameterName]);
            }
        }
        return params;
    }

    private getHeaders(): Headers {
        const headers = new Headers();

        headers.set('Accept', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Headers', '*');
        headers.set('X-Content-Type-Options', 'nosniff');
        return headers;
    }
}
