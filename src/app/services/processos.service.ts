import { HttpClient } from '@angular/common/http';
import { ICard, ILinha, IProcesso } from '../models/IResponse';
import { Store } from './Store';
import { httpHeadersOptionsAppJson, logHttpError, CloneObject } from 'src/helpers';
import { IContadorClick } from '../cards/tabela/tabela.component';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProcessosService extends Store<ICard> {

  constructor(
    protected _http: HttpClient
  ) {
    super(_http);
  }

  alterarContador(clickObj: IContadorClick) {
    this._updateContador(clickObj.linha);

    this._http
      .post(
        `${this.api}/contador`,
        clickObj
      )
      .subscribe(null, logHttpError);
  }

  public all() {
    return super._fetchData();
  }

  public get(de: string, ate: string) {
    return super._fetchData(`/?de=${de}&ate=${ate}`);
  }

  protected _updateContador(linhaArg: ILinha) {

    const copy = CloneObject(this.getData);
    const dadoProcesso = copy.find(p => p.processo.id === linhaArg.processo_id);

    dadoProcesso.table.map(grupo => {
      grupo.linhas.map(linha => {

        if (linha.grupo_linha_id === linhaArg.grupo_linha_id) {
          linha.contador = linhaArg.contador;
        }

      });
    });

    super._updateData(copy);
  }

  public async novoProcesso(obj: IProcesso) {

    return this._http
      .post(`${this.api}/processo`, obj, httpHeadersOptionsAppJson())
      .subscribe(
        added => {
          console.log(added);
          if (added === true) {
            alert('Adicionado');
          } else {
            alert('Erro, possivelmente esse processo já existe.');
            console.error(added);
          }
        },
        logHttpError
      );
  }

}
