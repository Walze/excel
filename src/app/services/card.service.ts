import { Injectable } from '@angular/core';
import { ProcessosService } from './processos.service';
import { ILinha } from '../models/IResponse';
import { HttpClient } from '@angular/common/http';
import { logHttpError } from 'src/helpers';

@Injectable({
  providedIn: 'root'
})
export class CardService extends ProcessosService {

  constructor(
    protected _http: HttpClient,
  ) {
    super(_http);
  }

  alterarContador(linha: ILinha, processo_id: number) {
    super._updateContador(linha, processo_id);

    this._http
      .post(
        `${this.api}/contador`,
        { processo_id, linha }
      )
      .subscribe(console.warn, logHttpError);
  }
}
