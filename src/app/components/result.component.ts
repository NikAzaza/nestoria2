import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-respond-item',
    template: `
        <div class="card border-info mb-3">
            <div class="card-header">
                <h5>
                    {{result.datasource_name}}
                    <span class="badge badge-success">{{result.updated_in_days_formatted}}</span>
                </h5>
            </div>
             <div class="card-body text-info">
                 <img class="card-img-top" src="{{result.img_url}}" alt="{{result.title}}">
                <h6 class="card-title">{{result.title}}</h6>
                <p class="card-text">
                    {{result.summary}}>
                    <a href="{{result.lister_url}}" target="_blank">Read more</a>
                </p>
            </div>

            <div class="card-footer bg-transparent border-info">
                <p>Updated in {{result.updated_in_days}} days</p>
                <span>{{result.price_formatted}}</span>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent implements OnInit {
    @Input() result: Object;
    constructor() { }

    ngOnInit() { }
}