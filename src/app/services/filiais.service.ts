import { Injectable } from '@angular/core';
import { Store } from './Store';
import { HttpClient } from '@angular/common/http';
import { logHttpError } from 'src/helpers';
import { Subject } from 'rxjs';
import { IFilial } from '../models/IFilial';



@Injectable({
  providedIn: 'root'
})
export class FiliaisService extends Store<IFilial> {

  constructor(
    protected _http: HttpClient
  ) {
    super(_http, '/filial');
  }

  nova(filial: IFilial) {
    const subject = new Subject<boolean>();

    this._http
      .post<boolean>(super.getURL(), filial)
      .subscribe(
        added => subject.next(added),
        logHttpError
      );

    return subject;
  }

  async get() {
    console.warn(await this._fetchData());

    return this._fetchData();
  }
}
