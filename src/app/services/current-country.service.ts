import { Injectable } from '@angular/core';

@Injectable()
export class CurrentCountryService {
    _currentCountry: Object = {
        'name': 'UK',
        'lang': 'en',
        'country': 'uk',
        'server': 'https://api.nestoria.co.uk',
        'localeName': 'Choose a country..'};

    constructor() {}

    public get currentCountry(): Object {
        return this._currentCountry;
    }

    public set currentCountry(newCountry: Object) {
        this._currentCountry = newCountry;
    }
}
