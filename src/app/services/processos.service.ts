import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDadoProcesso, ILinha, IProcesso } from '../models/IResponse';
import { Store } from './Store';
import { httpHeadersOptionsAppJson, logHttpError } from 'src/helpers';



@Injectable({
  providedIn: 'root'
})
export class ProcessosService extends Store<IDadoProcesso> {

  constructor(
    protected _http: HttpClient
  ) {
    super(_http);
  }

  public all() {
    return this._getStoreData();
  }

  public get(de: string, ate: string) {
    return this._getStoreData(`/?de=${de}&ate=${ate}`);
  }

  public updateContador(linhaArg: ILinha, processoId: number) {
    const copy = [...this.storeData];
    const dadoProcesso = copy.find(p => p.processo.id === processoId);

    dadoProcesso.table.map(grupo => {
      grupo.linhas.map(linha => {

        if (linha.grupo_linha_id === linhaArg.grupo_linha_id) {
          linha.contador = linhaArg.contador;
        }

      });
    });

    this._updateStore(copy);
  }

  public async novoProcesso(obj: IProcesso) {

    this._http
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
