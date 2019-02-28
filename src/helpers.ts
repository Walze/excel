import * as hexToHsl from 'hex-to-hsl';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export function httpHeadersOptionsAppJson() {
  return {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}

export const logHttpError = (er: HttpErrorResponse) => {
  alert('Erro, veja o console.');
  console.error(er.error.text, er);
};

export const CloneObject = <T>(obj: T): T =>
  JSON.parse(
    JSON.stringify(obj)
  );

export const FreezeObject = <T>(objOriginal: T) => {

  const obj = CloneObject(objOriginal);

  Object
    .values(obj)
    .map(value =>
      typeof value === 'object' && value !== null
        ? FreezeObject(value)
        : undefined
    );

  return Object.freeze(obj);
};

export const colorPalette = (initialHex, n, step?) => {
  step = step || 360 / n;

  const hsl = hexToHsl(initialHex);
  let deg = hsl[0];

  return Array(n)
    .fill(null)
    .map(() => {

      const string = `hsl(${deg}, ${hsl[1]}%, ${hsl[2]}%)`;
      const sum = deg + step;

      deg = sum <= 360 ?
        sum :
        sum - 360;

      return string;
    });
};
