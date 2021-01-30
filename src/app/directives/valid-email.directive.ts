import { Input } from '@angular/core';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidEmailDirective,
    multi: true
  }]
})
export class ValidEmailDirective implements Validator {
  @Input() appEmailValidator: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const emailFormatValidatorRegEx = new RegExp(
      // tslint:disable-next-line: max-line-length
      '^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
      'i'
    );
    const value = control.value;

    if (!value) {
      return { err: 'Email is required' };
    }

    if (!emailFormatValidatorRegEx.test(value)) {
      return { err: 'Email is not valid' };
    }

    return null;
  }
}
