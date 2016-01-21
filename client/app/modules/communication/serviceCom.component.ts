import {Component, ViewQuery, QueryList, ElementRef, forwardRef, Inject, Injectable, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import * as Rx from 'rxjs';

@Component({
    selector: 'component1',
    template: `    
    <div>  
    COMPONENT 1   
        <input (keyup)="setValue($event.target.value)"/> 
        <button class="btn btn default" (click)="click()">Reset</button>    
    </div>
    `,
    directives: [CORE_DIRECTIVES]
})

export class Component1 {
    objValue: string;
    constructor( 
        @Inject(forwardRef(() => SimpleCommunicationService)) private comp: SimpleCommunicationService) {}

    setValue(value) {
        this.comp.myObj = value;
    }
    click() {
        this.comp.myObj = "";
    }
}


@Component({
    selector: 'component2',
    template: `    
    <div>
    COMPONENT 2   
        {{value}}
    </div>
    `,
    directives: [CORE_DIRECTIVES]
})

export class Component2 {
    @Input() value: string;
    constructor() {}
}

@Component({
    selector: 'serv-communication',
    template: `    
    <div class="row">   
        <component1></component1>
        <component2 [value]="comp.myObj"></component2>
    </div>
    `,
    directives: [CORE_DIRECTIVES, Component1, Component2]    
})

export class ServiceComComponent {
    constructor(@Inject(forwardRef(() => SimpleCommunicationService)) private comp: SimpleCommunicationService) { }    
}



/////////////////////////////////////////////
@Injectable()
export class SimpleCommunicationService {
    _myObj: any;
    constructor() {
        this._myObj = null;        
    }

    get myObj() {        
        return this._myObj;
    }
    set myObj(value) {        
        this._myObj = value;
    }
}




  
