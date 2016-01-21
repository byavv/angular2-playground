import {Component} from 'angular2/core';
import {DateSelector} from './date.form.component';
import {ChildrenForm} from './children.form.component';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, Control, FormBuilder, ControlGroup, Validators, ControlContainer} from 'angular2/common';
@Component({
    selector: 'forms',
    template: require('./forms.component.html'),
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DateSelector, ChildrenForm],
    styles: [
        ``
    ],
    providers: [FORM_PROVIDERS]
})

export class FormsExplore {
    personal = {
        name: "",
        birthday: "",
        address: "",
        country: "",
        haschildren: false,
        children: [],
    }
    submitted: boolean = false;
    error: string = null;
    info: string = null;
    form: ControlGroup;
    countries: Array<string> = ["USA", "Germany", "France", "Russia"];

    constructor(fbuilder: FormBuilder) {
        this.form = fbuilder.group({
            birthday: ['', Validators.compose([Validators.required])],
            name: ['', Validators.compose([Validators.required])],
            address: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            haschildren: [false],
            children: [[], Validators.compose([ifChildrenChecked(this.personal)])]
        });
    }

    onSubmit(value) {
        if (!this.submitted) this.submitted = true;
        if (this.form.valid) {
            console.log(value);
        }
    }

    closeAlert() {
        this.info = null;
        this.error = null;
    }
}

function ifChildrenChecked(model: any) {
    return function(control) {
        if (!(control.value.length > 0) && model.haschildren) {
            return { required: true }
        }
    }
}






  