
import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import * as Rx from 'rxjs';


@Injectable()
export class ApiService {
    headers: Headers;
    constructor(private http: Http) {
        this.headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    public initCarsDefaults(): Rx.Observable<Response> {
        return this.http
            .post("/api/initcarsdefaults", null, { headers: this.headers })
            //.map(res => res.json()) // uncomment if you use regular http service

    }
    public getCarsCount(query): Rx.Observable<Response> {
        return this.http
            .post("/api/getcount", JSON.stringify(query), { headers: this.headers })
            //.map(res => res.json())

    }

    public getCarsByManufacter(query): Rx.Observable<Response> {
        return this.http
            .post("/api/getmanufactermodels", JSON.stringify(query), { headers: this.headers })
            //.map(res => res.json())

    }
    public seachCars(query): Rx.Observable<Response> {
        return this.http
            .post("/api/seachcars", JSON.stringify(query), { headers: this.headers })
            //.map(res => res.json())
    }

    public getCar(id): Rx.Observable<Response> {
        return this.http
            .get(`/api/getcar/${id}`, { headers: this.headers })
            //.map(res => res.json())
    }

}

export const API_SERVICE_PROVIDERS = [
    ApiService
];
