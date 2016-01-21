import {Component, ViewQuery, QueryList, ElementRef, OnInit, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, Control, FORM_DIRECTIVES} from 'angular2/common';
import * as rx from 'rxjs';
import {AutoComplete} from "./autocomplete.component";
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {ApiService} from '../api.service';
import {Http, Response, Headers} from 'angular2/http';

@Component({
    selector: 'rx',
    template: require("./rxExplore.component.html"),
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, AutoComplete],
    providers: [ApiService]

})

export class RxExploreComponent {
    selectedValue: string;
    constructor() {
    }
    autocompleteCanged(value) {
        this.selectedValue = value.name;
    }

}
