


import { Directive, HostListener } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
@Directive({
    selector: '[filtrarNumeros]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: solonumeros }]
})
export class solonumeros implements Validator {
    // Método que valida solo números en el formulario
    validate(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;

        // si el valor es null o undefined, no hay error
        if (valor == null || valor == undefined || valor == "") {

            console.log("--->si el valor es null", valor);
            return null;
        }
        // expresión regular para validar solo numeros (positivos y con decimales)
        const regex = /^[0-9]+(\.[0-9]*)?$/;

        // si el valor cumple con la expresión regular, es valido
        if (regex.test(valor)) {
            console.log("--- si cumple con la expresion solo num", valor);
            return null
        } else {
            // si no cumple, retorna el error
            return { filtarNumeros: true }
        }
    }
    // Bloquear letras y caracteres especiales durante la entrada de datos
    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        const charCode = event.charCode;
        const inputChar = String.fromCharCode(charCode);

        // Permitir solo números (0-9) y punto decimal (.), y bloquear otros caracteres
        if (!/^[0-9.]$/.test(inputChar)) {
            event.preventDefault();
            return;
        }

        // Verificar si ya existe un punto decimal en el campo actual
        const currentInputValue = (event.target as HTMLInputElement).value;
        if (inputChar === '.' && currentInputValue.includes('.')) {
            event.preventDefault(); // Bloquear la entrada de más de un punto decimal
        }
    }

    // Permitir teclas de control en el teclado como borrar, flechas y enter
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if ([
            'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', 'Enter'
        ].indexOf(event.key) !== -1) {
            return; // Permitir estas teclas
        }
    }
}