import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request, Connection, ConnectionBackend} from 'angular2/http';
import * as Rx from 'rxjs';


export enum Action { QueryStart, QueryStop };

@Injectable()
export class ExtHttp extends Http {
    process: Rx.Subject<any> = new Rx.Subject<any>();
    error: Rx.Subject<any> = new Rx.Subject<any>();
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
    }

    private _createHeaders(): Headers {
        let authData = { token: `abracadabra` };
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        if (!!authData && authData.token) {
            headers.append('Authorization', `Bearer ${authData.token}`)
        }
        return headers;
    }


    public get(url: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Get, url, null, options);
    }

    public post(url: string, body: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Post, url, body, options);
    }

    public put(url: string, body: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Put, url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Delete, url, null, options);
    }

    private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Rx.Observable<any> {
        let requestOptions = new RequestOptions(Object.assign({
            method: method,
            url: url,
            body: body,
            headers: this._createHeaders()
        }, options));
        
        return Rx.Observable.create((observer) => {
            this.process.next(Action.QueryStart);
            super.request(new Request(requestOptions))
                .map(res=> res.json())
                .finally(() => {
                    this.process.next(Action.QueryStop);
                })
                .subscribe(
                (res) => { 
                    observer.next(res);
                    observer.complete();
                },
                (err) => {
                    switch (err.status) {
                        case 401:
                            //intercept 401 
                            this.error.next(err);
                            observer.error(err);                            
                            break;
                        case 500:
                            //intercept 500
                            this.error.next(err)
                            observer.error(err);                            
                            break;
                        default:
                            this.error.next(err)
                            observer.error(err);
                            break;
                    }
                })
        })
    }
    //todo: add caching
}

export var EXTHTTPPROVIDERS: Array<any> = [
    Action, ExtHttp
];