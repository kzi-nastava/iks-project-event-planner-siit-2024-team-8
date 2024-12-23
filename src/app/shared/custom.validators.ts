import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    const min = new Date();
    min.setHours(0,0,0,0);


    if (inputDate < min) {
      return { 'minDate': { value: control.value } };
    }
    return null;
  };
}
