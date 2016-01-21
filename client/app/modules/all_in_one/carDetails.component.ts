import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ApiService} from '../../services/api.service.ts';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

@Component({
    selector: 'carDetails',
    template: require("./carDetails.component.html"),

    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class CarDetailsComponent implements OnInit {
    car: any = {
        images: []
    };
    constructor(private apiService: ApiService, private params: RouteParams) {
    }

    ngOnInit() {
        this.apiService
            .getCar(this.params.get('id'))
            .subscribe((result: any) => {
                this.car = result.car;
            })
    }
}