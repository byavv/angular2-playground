import {Component, provide, Host, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {Http, ConnectionBackend, XHRBackend, BaseRequestOptions,HTTP_PROVIDERS} from 'angular2/http';

import {ExtHttp} from "./extHttp"
import {Loader} from "./loader.component"
import {Some} from "./some.component"


@Component({
    selector: 'http',
    template: `
    <div loader></div>
    <div>    
        <button (click)="onClick()" class="btn btn-default">Add http item</button>
        <button (click)="onErrClick()" class="btn btn-default">Make error request</button>
        <button (click)="onPostClick()" class="btn btn-default">Make post request</button>
        <span>{{info}}</span>
        <div class="some-container">
            <some *ngFor="#i of someArray"></some>
        </div>
    </div>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, Loader, Some],    
     styles:[`
        .cmn-t-underline {
            position: relative;
            color: #ff3296; 
            height: 5px;           
        }
        .cmn-t-underline:after {
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 0;
            height: 3px;
            background-color: #98004a;
            content: "";            
            width: 100%;
        }
        .some-container{            
            margine-top:5px;           
        }
          
    `],     
    // This is not very convince, you should do it in bootstrap 
    // if you want this service to be injectable throughout all the app.
   providers:[HTTP_PROVIDERS, XHRBackend, BaseRequestOptions, provide(Http, {useFactory:
      function(backend, defaultOptions) {
        return new ExtHttp(backend, defaultOptions);
      },
      deps: [XHRBackend, BaseRequestOptions]})]
      
})

export class HttpExplore implements OnInit{
    http: ExtHttp;
    someArray: Array<any> = [42,42,42,42,42]; 
    info: string;
    constructor(http:Http) {       
        this.http = <ExtHttp>http; 
        this.http.error.subscribe((value)=>{
             //(1) catch it here or whereever you need error notification 
            this.info = "Received " + value.status + " code"
        })
    }
    ngOnInit(){
       
    }
    onClick(){
      this.someArray.push(42);
    }
    onErrClick(){
        this.http.post("/test/errpost",JSON.stringify({myData:"test data"})).subscribe(()=>{
            //do smth
        },(err)=>{
            //(2) and catch it here
            console.log(err)
        })
    }
    onPostClick(){
         this.http.post("/test/post",JSON.stringify({query:"test query"})).subscribe((value)=>{
          this.info = "Received: Your auth token is: " + value.authHeader;
        },(err)=>{            
            console.log(err)
        })
    }
}







