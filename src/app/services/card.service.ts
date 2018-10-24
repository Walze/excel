import { Injectable } from '@angular/core';
import { ProcessosService } from './processos.service';
import { ILinha } from '../models/IResponse';
import { HttpClient } from '@angular/common/http';
import { logHttpError } from 'src/helpers';
import { IContadorClick } from '../card/tabela/tabela.component';

@Injectable({
  providedIn: 'root'
})
export class CardService extends ProcessosService {

  constructor(
    protected _http: HttpClient,
  ) {
    super(_http);
  }

  alterarContador(clickObj: IContadorClick) {
    super._updateContador(clickObj.linha);

    this._http
      .post(
        `${this.api}/contador`,
        clickObj
      )
      .subscribe(null, logHttpError);
  }
}
