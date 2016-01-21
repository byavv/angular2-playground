import {Component, ViewQuery, QueryList, ElementRef, forwardRef, Inject, Injectable} from 'angular2/core';
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
    constructor( @Inject(forwardRef(() => CommunicationService)) private comp: CommunicationService) { }

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
        {{val}}
    </div>
    `,
    directives: [CORE_DIRECTIVES]
})

export class Component2 {
    val: string;
    constructor( @Inject(forwardRef(() => CommunicationService)) private comp: CommunicationService) {
        comp.subject
            .debounceTime<string>(500)
            .map(value=> value.toUpperCase())
            .subscribe((val) => {
                this.val = val;
            })
    }
}

@Component({
    selector: 'subj-communication',
    template: `    
    <div class="row">   
        <component1></component1>
        <component2></component2>
    </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, Component1, Component2]
})

export class SubjectsComponent {
    constructor() { }
}

@Injectable()
export class CommunicationService {
    subject: Rx.Subject<any> = new Rx.Subject<any>();
    _myObj: any;
    constructor() {
        this._myObj = null;
        this.subject.share()
    }

    get myObj() {
        return this._myObj;
    }
    set myObj(value) {
        this._myObj = value;
        this.subject.next(value);
    }
}




  