import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true
  }]
})
export class MatchPasswordDirective implements Validator {
  @Input() appMatchPassword: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (this.appMatchPassword !== control.value) {
      return { err: 'Password does not match' };
    }

    if (control.value && control.value.length < 6) {
      return { err: 'Password is too short' };
    }

    return null;
  }
}
