import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// selecionar por vaga
// adicionar estado
// somar meses
// listar linhas por dia

const apiURL = true
  ? 'http://localhost:4201'
  : 'http://talentos.conexaomercado.com.br/apps/triagem/server';

export abstract class Store<T> {

  private _eventData: T[];
  public data = new BehaviorSubject<T[]>([]);

  constructor(
    protected _http: HttpClient,
    protected api: string = apiURL
  ) {
  }

  protected get getData() {
    return [...this._eventData];
  }

  protected _fetchData(params: string = '') {
    return this._http
      .get<T[]>(this.api + params)
      .subscribe(resp => {

        if (!resp.length) { alert('Nenhum encontrado.'); }

        this._updateData(resp);
      });
  }

  protected _updateData(data: T[]) {
    this._eventData = data;
    this.data.next(this.getData);
  }

}
