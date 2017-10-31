import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-r-search',
    styles: ['.list-container {max-height: 150px; overflow-y: scroll;}',
             '.list-group-item {padding: 5px 10px; cursor: pointer;}',
             '.center-block {width: 100%;}',
             ':host {width: 100%;}',
             '.form-control {width: 100%}',
             '.list-container {position: absolute; z-index: 1000; width: 100%; top: 60px;}',
             '.clear-search {display: inline-block; width: 36px; height: 36px; background: black; color: red; position: absolute; right: 0; bottom: 54px; top: 25px; z-index: 10;}'],
    template: `
            <form [formGroup]="inputForm">
                <div class="form-group">
                    <label class="center-block">Name:
                        <input class="form-control" formControlName="search" id="search" autocomplete="off">
                        <button class="clear-search"
                                *ngIf="inputForm.get('search').value.length > 0"
                                (click)="clearForm()">
                            X
                        </button>
                    </label>

                    <div class="list-container" *ngIf="inputForm.get('search').valid">
                        <div class="list-group" *ngIf="selectedData.length">
                            <a class="list-group-item"
                                        *ngFor="let element of selectedData; index as i"
                                        (click)="getCityFromHint(element)">
                                {{element}}
                            </a>
                        </div>

                        <p *ngIf="!selectedData.length">
                            Cities not found !
                        </p>
                    </div>

                    <div *ngIf="inputForm.get('search').touched && inputForm.get('search').invalid && inputForm.get('search').value.length !== 0">
                        <div *ngIf="inputForm.get('search').errors.required">
                            Please, enter text
                        </div>

                        <div *ngIf="inputForm.get('search').errors.minlength">
                            minimal length of search - 3 symbols
                        </div>
                    </div>
                </div>
            </form>
    `,
    // templateUrl: 'name.component.html'
})

export class RSearchComponent implements OnInit, AfterViewInit {
    @Input() data: Array<any>;
    @Output() currentValue = new EventEmitter<string>();
    @Output() searchFromHint = new EventEmitter<string>()
    selectedData: Array<any>;
    inputForm: FormGroup;

    constructor(private fb: FormBuilder) {
         this.createForm();
    }

    ngOnInit() {
        this.filterData();
    }

    ngAfterViewInit(): void {
       // this.filterData();
    }

    private filterData() {
        this.inputForm.get('search').valueChanges.subscribe((value: string) => {
            this.currentValue.emit(value);

            this.selectedData = this.data.filter((element: string) => {
                return (element.toLowerCase().indexOf(value.toLowerCase()) >= 0);
            }) || [];
        });

    }
    private getCityFromHint(city: string) {
        this.currentValue.emit(city);
        this.searchFromHint.emit(city);
        this.inputForm.get('search').setValue(city);
    }

    public clearForm() {
        this.inputForm.get('search').setValue('');
    }

    private createForm() {
        this.inputForm = this.fb.group({
            search: ['', [Validators.required,
                          Validators.minLength(3)]]
        });
    }
}
