import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';

export class Store<T> {

  private _eventData: T[];
  public event = new Subject<T[]>();

  constructor(
    protected _http: HttpClient,
    protected api: string = 'http://localhost:4201'
  ) {
  }

  protected get storeData() {
    return [...this._eventData];
  }

  protected _getStoreData(params: string = '') {
    return this._http
      .get<T[]>(this.api + params)
      .subscribe(resp =>
        this._updateStore(resp)
      );
  }

  protected _updateStore(arr: T[]) {
    this._eventData = arr;
    this.event.next(this.storeData);
  }

}
