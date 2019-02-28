import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';

// selecionar por vaga
// adicionar estado
// somar meses
// listar linhas por dia

const apiURL = true
  ? 'http://localhost:4201'
  : 'http://talentos.conexaomercado.com.br/apps/triagem/server';

export class Store<T> {

  private _eventData: T[];
  public event = new Subject<T[]>();

  constructor(
    protected _http: HttpClient,
    protected api: string = apiURL
  ) {
  }

  protected get storeData() {
    return [...this._eventData];
  }

  protected _getStoreData(params: string = '') {
    return this._http
      .get<T[]>(this.api + params)
      .subscribe(resp => {

        if (!resp.length) { alert('Nenhum encontrado.'); }

        this._updateStore(resp);
      });
  }

  protected _updateStore(arr: T[]) {
    this._eventData = arr;
    this.event.next(this.storeData);
  }

}
