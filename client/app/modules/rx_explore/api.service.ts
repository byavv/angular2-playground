
import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import * as rx from 'rxjs';


@Injectable()
export class ApiService {
    headers: Headers;
    constructor(private http: Http) {
        this.headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    public searchManufacters(value): rx.Observable<any> {
        return this.http
            .post("/api/searchManufacters", JSON.stringify({ query: value }), { headers: this.headers })
            .map((res: Response) => res.json())
    }

}

export const API_SERVICE_BINDINGS = [
    ApiService
];
