import { Component, OnInit, Input, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ListComponent } from 'app/components/list.component';
import { LocalStorageService } from 'app/services/local-storage.service';


@Component({
    selector: 'search-list',
    templateUrl: 'search-history-list.component.html',
    providers: [LocalStorageService],
})
export class SearchHistoryListComponent implements OnInit {

    @Input() historyList: Array<string> = [];

    constructor(private locStorage: LocalStorageService) {}

    ngOnInit(): void {
        this.historyList = this.locStorage.getSearchResults();
    }
}
