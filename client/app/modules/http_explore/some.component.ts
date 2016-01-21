import {Component, provide, Host, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {Http, ConnectionBackend, XHRBackend, BaseRequestOptions, HTTP_PROVIDERS} from 'angular2/http';

import {ExtHttp} from "./extHttp"

@Component({
    selector: 'some',
    template: `
    <div class="someCss">
        <span>State: {{state}}</span>        
    </div>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [`
        .someCss {
            width: 120px;
            color: white;             
            background: #6B4717;
            margin: 5px;
            display: inline-block;
            padding: 15px; 
            min-height: 50px;  
        } 
    `]
})

export class Some implements OnInit {
    http: ExtHttp;
    state: string;
    constructor(http: Http) {
        this.http = <ExtHttp>http;
        this.state = "Getting data";
    }
    ngOnInit() {
        this.http.get('/test/get')           
            .subscribe((value) => {
                this.state = value.data;               
            })
    }

}







