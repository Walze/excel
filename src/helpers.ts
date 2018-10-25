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

export const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const deepFreeze = <T>(obj: T) => {

  const propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function (prop) {
    const value = obj[prop];

    if (
      typeof value === 'object'
      && value !== null
    ) {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
};
