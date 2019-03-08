import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/internal/Subject';
import { IContadorClick } from './../cards/tabela/tabela.component';

// selecionar por vaga
// adicionar estado
// somar meses
// listar linhas por dia

const apiURL = true
  ? 'http://localhost:4201'
  : 'http://talentos.conexaomercado.com.br/apps/triagem/server';

export abstract class Store<T> extends EventEmitter {

  private _eventData: T[] | undefined;
  public data = new BehaviorSubject<T[]>([]);
  public contadorClick = new Subject<IContadorClick>();
  private _api = apiURL;

  constructor(
    protected _http: HttpClient,
    protected endpoint: string
  ) {
    super();
  }

  public getURL(extra = '') {
    return this._api + this.endpoint + extra;
  }

  protected get getData() {
    return [...this._eventData];
  }

  protected async _fetchData(extra = '') {
    if (this._eventData) { return; }

    return await this.refresh(extra);
  }

  public async refresh(extra = '') {
    const data = await this._http
      .get<T[]>(this.getURL(extra))
      .toPromise();

    if (!data.length) {
      console.warn('Nenhum encontrado', extra);
    }

    this._updateData(data);

    return data;
  }

  protected _updateData(data: T[]) {
    this._eventData = data;
    this.data.next(this.getData);
  }

}
