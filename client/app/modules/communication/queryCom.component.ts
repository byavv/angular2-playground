import {Component,
ViewQuery,
QueryList,
ElementRef,
Input,
EventEmitter,
ViewChildren,
AfterViewInit,
OnInit,
DynamicComponentLoader
} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'component3',
    template: `    
    <div>  
    COMPONENT 3   
        <input (input)="setValue($event.target.value)"/> 
        <button class="btn btn default" (click)="click()">Reset</button>    
    </div>
    `,
    directives: [CORE_DIRECTIVES],
    outputs: ["changed"]
})
export class Component3 {
    objValue: string;
    changed: EventEmitter<string> = new EventEmitter();
    constructor() { }
    setValue(value) {
        this.objValue = value;
        this.changed.next(value);
    }
    click() {
        this.changed.next("");
    }
}

@Component({
    selector: 'component4',
    template: `    
    <div>  
    COMPONENT 4   
       {{value}}  
    </div>
    `,
    directives: [CORE_DIRECTIVES],

})
export class Component4 {
    // property can't be binded if it's not decorated by @Input decarator 
    // or defined in ComponentMetadata in "inputs" section
    @Input() value: string;
    constructor() { }
}

//*************************************
//--------OPTION 1.1 (One-way binding)---
//*************************************
/*@Component({
    selector: 'quer-communication',
    template: `    
    <div class="row">      
      <component3 #comp3></component3>
      <component4 [value]=comp3.objValue></component4>
    </div>
    `,
    directives: [CORE_DIRECTIVES, Component3, Component4],
    
})

export class QueryComComponent {       
    constructor() {      
    }      
}*/

//*************************************
//--------OPTION 1.2 (Events binding)---
//*************************************
/*
@Component({
    selector: 'quer-communication',
    template: `    
    <div class="row">      
      <component3 (changed)="comp4.value=$event"></component3>
      <component4 #comp4></component4>
    </div>
    `,
    directives: [CORE_DIRECTIVES, Component3, Component4],
    
})

export class QueryComComponent {       
    constructor() {      
    }      
}
*/
//****************************************************
//-OPTION 2.1 (Manually, via query components in view)--
//****************************************************

@Component({
    selector: 'quer-communication',
    template: `    
    <div class="row">      
      <component3 #comp3></component3>
      <div *ngFor="#i of [1,2,3]">
            <component4 #comp4></component4>
      </div>      
    </div>
    `,
    directives: [CORE_DIRECTIVES, Component3, Component4],
    
})

export class QueryComComponent implements AfterViewInit{       
    constructor(
        @ViewQuery("comp3") private comp3: QueryList<Component3>, 
        @ViewQuery("comp4") private comp4: QueryList<Component4>) { 
    }   
    
    ngAfterViewInit(){
         this.comp3.first.changed.subscribe((value)=>{
             this.comp4.toArray().forEach((comp)=>{
                 comp.value = value;
             })
         })
    }
}



//*******************************************************************
//------OPTION 2.2 Query components with @ViewChildren---------------
//*******************************************************************
/*
@Component({
    selector: 'quer-communication',
    template: `    
    <div class="row">      
      <component3 (changed)="setValue($event)"></component3>
      <div *ngFor="#i of [1,2,3]">
            <component4></component4>
      </div>     
    </div>
    `,
    directives: [CORE_DIRECTIVES, Component3, Component4],
})

export class QueryComComponent implements AfterViewInit {
    @ViewChildren(Component4) components: QueryList<Component4>;
    constructor() {}

    ngAfterViewInit() {
        // components available here
    }
    setValue(value) {
        console.log(value);
        this.components.toArray().forEach((comp) => {
            comp.value = value
        });
    }
}
*/
//*******************************************************************
//------OPTION 3 Load components dynamically (You just can)----------
//*******************************************************************
/*
@Component({
    selector: 'quer-communication',
    template: `    
    <div class="row">  
        <component3 (changed)="setValue($event)"></component3>
        Dynamically loaded components:    
          <div #host></div>
    </div>
    `,
    directives: [CORE_DIRECTIVES, Component3, Component4],
})

export class QueryComComponent implements OnInit {
    components: Array<any> = [];
    constructor(private dcl: DynamicComponentLoader, private elementRef: ElementRef) {

    }
    ngOnInit() {
        for (let i = 0; i <= 3; i++) {
            this.dcl.loadIntoLocation(Component4, this.elementRef, 'host')
                .then((component) => {
                    this.components.push(component.instance);
                });
        }
    }
    
    setValue(value) {
        this.components.forEach((comp) => {
            comp.value = value;
        })
    }
}*/