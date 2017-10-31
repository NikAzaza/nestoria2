import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-list',
    template: `
            <h3 class="text-center">History</h3>
            <div class="row">
                <div class="col-md-4"></div>

                <div class="col-md-4">
                    <div class="list-container">
                        <ul class="list-group">
                            <li class="list-group-item justify-content-between" *ngFor="let item of list; index as i">
                                {{item}}
                                <span class="badge badge-default badge-pill">{{i}}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  class="col-md-4"></div>
            </div>
        `,
    styles: ['.list-container {max-height: 200px; overflow-y: scroll;}'],
    // templateUrl: 'search-history-list.component.html',
    changeDetection:  ChangeDetectionStrategy.OnPush
})
export class ListComponent {
    @Input() list: any;
}
