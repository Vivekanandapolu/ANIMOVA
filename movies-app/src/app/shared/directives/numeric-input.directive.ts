import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumericInput]'
})
export class NumericInputDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10); // Allow only digits and limit to 10 characters
  }
}
