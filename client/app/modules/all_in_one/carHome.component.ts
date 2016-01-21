import {Component, OnInit, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup} from 'angular2/common';

import {ROUTER_DIRECTIVES, Location, Router, RouteParams} from 'angular2/router';
import {ApiService} from '../../services/api.service.ts';
import * as rx from 'rxjs';
import {FilterService} from './filterController.service'

@Component({
    selector: 'carForm',
    template: require('./carHome.component.html'),
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    outputs: ["onSeach"],
})
export class CarsHomeComponent {
    carFormModel: any;
    carForm: ControlGroup;
    carManufacters: Array<any> = [];
    carModels: Array<any> = [];
    carCount: number;
    yearFroms: Array<number> = [];
    loading: boolean = true;
    onSeach: EventEmitter<any> = new EventEmitter();

    manufacter: Control;
    model: Control;
    yearFrom: Control;
    priceUp: Control;

    constructor(builder: FormBuilder, private params: RouteParams,
        private apiService: ApiService, private location: Location, private router: Router, seachState: FilterService) {
        this.carFormModel = {}
        this.manufacter = new Control();
        this.model = new Control();
        this.yearFrom = new Control();
        this.priceUp = new Control();

        this.apiService
            .initCarsDefaults()
            .subscribe((res: any) => {
                this.carManufacters = res.manufacters;
                let currentYearFrom = new Date().getFullYear();
                let startYearFrom = res.minYearFrom || 1980;
                for (let i = startYearFrom; i <= currentYearFrom; i++) {
                    this.yearFroms.push(i);
                }
                this.loading = false;
            }, (err) => {
                console.error(err);
            })

        this.manufacter
            .valueChanges
            .do(() => { this.loading = true })
            .map(newValue=> Object.assign({}, this.carFormModel, { manufacter: newValue }))
            .flatMap((form) => {
                return this.apiService.getCarsByManufacter(form);
            })
            .subscribe((val: any) => {
                this.carModels = val.models;
                this.carCount = val.count;
                this.loading = false;
            })

        this.model
            .valueChanges
            .map(newValue=> Object.assign({}, this.carFormModel, { model: newValue }))
            .flatMap((form) => {
                return this.apiService.getCarsCount(form);
            })
            .subscribe((val: any) => {
                this.carCount = val.count;
                this.loading = false;
            })

        this.yearFrom
            .valueChanges
            .map(newValue=> Object.assign({}, this.carFormModel, { yearFrom: newValue }))
            .flatMap((form) => {
                return this.apiService.getCarsCount(form);
            })
            .subscribe((val: any) => {
                this.carCount = val.count;
                this.loading = false;
            })

        this.priceUp
            .valueChanges
            .do(() => { this.loading = true })
            .debounceTime(500)
            .map(newValue=> Object.assign({}, this.carFormModel, { priceUp: newValue }))
            .flatMap((form) => {
                return this.apiService.getCarsCount(form);
            })
            .subscribe((val: any) => {
                this.carCount = val.count;
                this.loading = false;
            })
    }

    submit() {
        console.log(this.carFormModel.model)
        this.router.navigate(['SearchList', {
            manufacter: `${this.carFormModel.manufacter || 'any'},${this.carFormModel.model || ''}`,
            price: `any..${this.carFormModel.priceUp || ''}`,
            year: `${this.carFormModel.yearFrom || 'any'}..`,
        }])
    }
}