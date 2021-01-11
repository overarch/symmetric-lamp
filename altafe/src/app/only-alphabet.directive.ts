import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[onlyAlphabet]' })
export class OnlyAlphabetDirective {

    @HostListener('keydown', ['$event']) onKeyDown(event: any) {
        const key = event.target.value + event.key;

        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArroDown', 'Backspace', 'Tab', 'Alt',
            'Shift', 'Control', 'Enter', 'Delete', 'Meta'].includes(event.key)) {
            return;
        }

        const regEx = new RegExp('^[a-zA-Z]');

        if (!regEx.test(key)) {
            event.preventDefault();
        }
    }
}