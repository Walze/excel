import { IVaga } from './../models/IVaga';
import { Injectable } from '@angular/core';
import { Store } from './Store';
import { HttpClient } from '@angular/common/http';
import { logHttpError } from 'src/helpers';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class VagasService extends Store<IVaga> {


  constructor(
    protected _http: HttpClient
  ) {
    super(_http);
  }

  novaVaga(vaga: IVaga) {
    const subject = new Subject<boolean>();

    this._http
      .post<boolean>(`${this.api}/vagas`, vaga)
      .subscribe(
        added => subject.next(added),
        logHttpError
      );

    return subject;
  }

  get() {
    return this._getStoreData('/vagas');
  }
}
