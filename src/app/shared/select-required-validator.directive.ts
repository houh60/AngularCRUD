import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appSelectRequiredValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})
export class SelectRequiredValidatorDirective implements Validator {

  @Input('appSelectRequiredValidator') defaultValue: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value === this.defaultValue ? { 'defaultSelected': true } : null
  }

}
