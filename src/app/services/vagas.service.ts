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
    super(_http, '/vagas');
  }

  novaVaga(vaga: IVaga) {
    const subject = new Subject<boolean>();

    this._http
      .post<boolean>(super.getURL(), vaga)
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
