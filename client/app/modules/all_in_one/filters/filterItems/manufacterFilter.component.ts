import {Component, EventEmitter, Input, Output, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {FORM_DIRECTIVES, Control} from 'angular2/common';
import {FilterService, FilterModel} from '../../filterController.service';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {ApiService} from '../../../../services/api.service.ts';
import * as rx from 'rxjs';
import {Filter, convert} from "../../decorators/decorators";

@Component({
    selector: 'manufacterWrapper',
    template: `
    <div class="form-group">
        <div class='row'>
            <div class="col-md-12">    
                <div><strong>{{viewValue}}</strong></div>
                <span class="link" (click)="resetFilter()">Reset</span>
                <span class="link" (click)="openFilter()">Change</span>               
            </div>    
            <div [class.hidden] = '!opened' class="openFilter">
                <form #f="ngForm">
                    <div class="col-md-12">
                    <div class="form-group">
                        <label for="manufacter">Made by</label>
                        <select class="form-control" #man="ngForm" [(ngModel)]="filterValue.manufacter" [ngFormControl]='manufacter' name="manufacter"
                        id="manufacter">               
                            <option *ngFor="#manufacter of carManufacters" [value]="manufacter.name">{{manufacter.name}}</option>
                        </select>
                    </div>
                        <div class="form-group">
                        <label for="manufacter">Model</label>
                        <select [disabled]="!man.value||loading" class="form-control" [(ngModel)]="filterValue.model" [ngFormControl]='model' name="model"
                        id="model">
                            <option *ngFor="#model of models" [value]="model.name">{{model.name}}</option>
                        </select>
                    </div> 
                    <button class="btn btn-default" (click)="applyFilter()">Apply</button>
                    <button class="btn btn-default" (click)="closeFilter()">Cancel</button>
                    </div>                
                </form> 
            </div>  
      </div>   
  </div>`,
    styles: [` 
    .link{
        color: #337ab7;
        text-decoration: underline;
        cursor: pointer;
        font-size:14px;
    }
    `],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})

@Filter({ filterName: "manufacter", params: ['manufacter'] })
export class ManufacterFilterComponent implements AfterViewInit {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {
        manufacter: '',
        model: ''
    };
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    manufacter: Control;
    model: Control;

    carManufacters: any[];
    models: any[];
    loading: boolean = false;
    opened: boolean = false;
    valueView: string;
    oldValue: any;
    subscription: rx.Subscription<any>;

    constructor(private apiService: ApiService) {
        this.manufacter = new Control(this.filterValue.manufacter);
        this.model = new Control(this.filterValue.model);
    }

    ngAfterViewInit() {
        this.manufacter
            .valueChanges
            .filter((value) => !!value)
            .do((value) => {
                this.loading = true;
            })
            .flatMap(value=> {                                      // and require new model to fill select
                return this.apiService
                    .getCarsByManufacter({ manufacter: value });
            })
            .subscribe((value: any) => {
                this.loading = false;
                if (value && value.models) {
                    this.models = value.models;                     // set manufacter models taken from server
                    if (!this.models.some(model=> model.name === this.filterValue.model)) {
                        this.model.updateValue(null);               // if manufacter changed, reset current value
                        this.filterValue.model = null;
                    }
                }
            });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    @convert
    get viewValue() {
        return this.filterValue;
    }

    openFilter() {
        this.manufacter.updateValue(this.filterValue.manufacter);
        this.model.updateValue(this.filterValue.model);
        this.opened = true;
        this.oldValue = Object.assign({}, this.filterValue);
        if (!this.carManufacters) {
            this.subscription = this.apiService
                .initCarsDefaults()
                .subscribe((value: any) => {
                    if (value && value.manufacters)
                        this.carManufacters = value.manufacters;
                })
        }
    }

    applyFilter() {
        this.changed.next({
            model: this.filterValue.model,
            manufacter: this.filterValue.manufacter
        });
        this.opened = false;
    }

    closeFilter() {
        this.filterValue = this.oldValue;
        this.opened = false;
    }

    resetFilter() {
        this.filterValue.model = null;
        this.filterValue.manufacter = null;
        this.changed.next({
            model: this.filterValue.model,
            manufacter: this.filterValue.manufacter
        })
    }
}