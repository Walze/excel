import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';

export class Store<T> {

  private _eventData: T[];
  public event = new Subject<T[]>();

  constructor(
    protected _http: HttpClient,
    protected api: string = 'http://192.168.13.35:4201'
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
