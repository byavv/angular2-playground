import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {ROUTER_DIRECTIVES, OnReuse, CanReuse, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'polymerForm',
    template: `  
     <div class="row"> 
        <div  style="display: flex;">
            <form [ngFormModel]="loginForm" #f="ngForm" style="width: 500px; max-width: 80%; margin: auto;">
              
                <email-input 
                    label="Email" 
                    #email="ngForm" 
                    type="email" 
                    ngControl='email' 
                    [checkUrl]= "'/api/checkEmail'"
                    ngDefaultControl 
                    required>
                </email-input>   
                           
                <div ngControlGroup="password">
                
                    <!--CUSTOM ELEMENT-->
                    <password-input label="Password" type="password" 
                        #password="ngForm"                                               
                        ngControl='password' 
                        [(ngModel)]="password.password" 
                        ngDefaultControl
                        [showError]="submitted"      
                        required>                           
                    </password-input>     
                    
                    <confirm-password-input 
                        label="Confirm password"                         
                        type="password"
                        [compareWith]="password.control.value"
                        ngControl='passwordConfirmation'                         
                        [(ngModel)]="password.confirm"
                        [showError]="submitted" 
                        ngDefaultControl 
                        required>                                        
                    </confirm-password-input> 
                  
                </div>
                
                 <pd-select floatingLabel="true" 
                    label="Gender" 
                    [options]='genderOptions' 
                    ngControl='gender' 
                    [(ngModel)]="gender"
                    [showError]="submitted"    
                    required                    
                    error-message="Gender select is required"
                    ngDefaultControl>
                </pd-select> 
                <paper-button raised (click)="onSubmit(f.value)" [disabled]="(!f.valid) || (password.confirm != password.password)">Submit</paper-button>
        
            </form>            
        </div>
     </div>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],

})

export class PolymerFormComponent implements OnReuse, CanReuse  {
    loginForm: ControlGroup;
    _mp: string;
    password: any = {
        password: "",
        confirm: ""
    };
    genderOptions: Array<string> = ["Male", "Female"];
    gender: string;
    submitted: boolean;

    constructor(fbuilder: FormBuilder) {        
        this.submitted = false;
        this.loginForm = fbuilder.group({           
            email: ['', Validators.compose([Validators.required, _emailValidator])],
            password: fbuilder.group({
                password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                passwordConfirmation: ['', Validators.required]
            }),
            gender: [""],
        });
    }
    onSubmit(formValue) {
        console.log(formValue);
        this.submitted = true;
    }
    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) { 
        return false; 
    }
    routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        console.log("REUSE ME")
    }
    getError(controlName) {
        if (this.loginForm.controls['controlName'].hasError("required")) {
            console.log(this.loginForm);
        }
    }
}

function _emailValidator(control: any) {
    if (!/.+\@.+\..+/.test(control.value)) {
        return { email: true };
    }
}




  