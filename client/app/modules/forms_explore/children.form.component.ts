import {Component, EventEmitter, Input} from 'angular2/core';
import {
CORE_DIRECTIVES,
FORM_DIRECTIVES,
Validators,
Control,
ControlGroup,
NgControl,
ControlValueAccessor} from 'angular2/common';
import * as appValidators from './customValidators';

@Component({
    selector: 'children[ngControl]',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: require("./children.form.component.html"),
    styles: [`
        .child{
            display: inline-block;
            background: grey;
            padding: 5px;            
            margin: 2px 5px 2px 0; 
            color:white;
            border-radius: 5px;
        }
        .child span{
            cursor: pointer;
            margin-left:5px;
        }
        .child.disabled{           
            pointer-events: none;
            cursor: default;
            opacity:0.5;
        }
        .control-container{           
            border: 1px solid #ccc;            
            border-radius: 3px;
            padding: 5px 5px;            
        }
        .form-container{
            margin-top:10px;
        }
    `]
})

export class ChildrenForm implements ControlValueAccessor {
    private _disabled: boolean;
    @Input() set disabled(value) {
        this._disabled = value;
        if (value) {
            this.onChange.emit([]);
        } else {
            this.onChange.emit(this.children);
        }
    }
    get disabled() {
        return this._disabled;
    }
    @Input() children: Array<any> = [];
    editMode: boolean;
    opened: boolean;
    submitted: boolean;
    //currentChild
    child = {
        name: "",
        age: 1,
        gender: "male",
        index: null
    }
    

    childForm: ControlGroup;
    onChange: EventEmitter<any> = new EventEmitter();
    onTouched: any;
    nameControl: Control = new Control("", Validators.required);
    genderControl: Control = new Control("male", Validators.required);
    ageControl: Control = new Control(1, Validators.compose([Validators.required, appValidators.minValue(0)]));

    constructor(private cd: NgControl) {
        cd.valueAccessor = this;
        this.childForm = new ControlGroup({
            name: this.nameControl,
            gender: this.genderControl,
            age: this.ageControl
        });
    }
    /**
     * Add to list new child
     */
    onAdd(value) {
        this.submitted = true;
        if (this.childForm.valid) {
            // Sould be so, but radio input does not reflect here
            // this.children.push(value);  <--------------------
            // !!!!!!!!! Temporal until #4285 is solved
            this.children.push(this.child);
            // todo: remove op above and use form value, not model
            
            this.onChange.emit(this.children);
            this.opened = false;
            this._reset();
        } else {
            this.cd.control.setErrors({ "smthwrong": true });
        }
    }
    /**
     * Update child data
     */
    onUpdate(value) {
        if (this.childForm.valid) {
            
            // Sould be so, but radio input does not reflect here
            // this.children[this.child.index] = value;
           
            //!!!!!!!!! Temporal until #4285 is solved
            this.children[this.child.index] = this.child;
            // todo: remove op above and use form value, not model 
            
            this.onChange.emit(this.children);
        } else {
            this.cd.control.setErrors({ "smthwrong": true });
        }
        this.opened = false;
    }
    /**
     * Delete child
     */
    delete(index) {
        console.log(index);
        if (this.child.index == index) {
            this.opened = false;
        }
        this.children.splice(index, 1);
        this.onChange.emit(this.children);
    }
    edit(index) {
        this.editMode = true;
        this.opened = true;
        this.child = Object.assign({}, this.children[index], { index: index });
    }
    add() {
        this.opened = true;
        this.editMode = false;
        this._reset();
    }
    cancel() {
        this.opened = false;
        this._reset();
    }
    
   
    /**
     * ControlValueAccessor
     */
    writeValue(children: Array<any>) {
        this.children = children;
    }
    registerOnChange(fn): void {
        this.onChange.subscribe(fn);
    }
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
    _reset() {
        this.child = {
            name: "",
            age: 0,
            gender: "male",
            index: null
        }
        this.submitted = false;
    }
}