import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;  // Si el valor está vacío, simplemente retorna el valor tal cual.
    }

    // Eliminar todos los caracteres no numéricos
    const cleaned = value.replace(/\D/g, '');

    // Verificar si el valor tiene el formato correcto
    if (cleaned.length <= 3) {
      return `+1 (${cleaned}`;
    }
    if (cleaned.length <= 6) {
      return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
  }

}
