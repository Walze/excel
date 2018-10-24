import { HttpClient } from '@angular/common/http';
import { ICard, ILinha, IProcesso } from '../models/IResponse';
import { Store } from './Store';
import { httpHeadersOptionsAppJson, logHttpError } from 'src/helpers';


export class ProcessosService extends Store<ICard> {

  constructor(
    protected _http: HttpClient
  ) {
    super(_http);
  }

  public all() {
    return super._getStoreData();
  }

  public get(de: string, ate: string) {
    return super._getStoreData(`/?de=${de}&ate=${ate}`);
  }

  protected _updateContador(linhaArg: ILinha) {

    const copy = [...this.storeData];
    const dadoProcesso = copy.find(p => p.processo.id === linhaArg.processo_id);

    dadoProcesso.table.map(grupo => {
      grupo.linhas.map(linha => {

        if (linha.grupo_linha_id === linhaArg.grupo_linha_id) {
          linha.contador = linhaArg.contador;
        }

      });
    });

    super._updateStore(copy);
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
