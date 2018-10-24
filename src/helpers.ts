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
