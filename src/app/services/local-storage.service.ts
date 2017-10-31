import { Injectable } from '@angular/core';
import * as contants from './../interfaces/local-storage-constants.interface';

@Injectable()
export class LocalStorageService {

    constructor() {  }

    public getSearchResults() {
        return JSON.parse(localStorage.getItem(contants.SEARCH_RESULTS)) || new Array();
    }

    public setSearchResults(results) {
        localStorage.setItem(contants.SEARCH_RESULTS, JSON.stringify(results));
    }
}
