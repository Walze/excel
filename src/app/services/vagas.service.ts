import { IVaga } from './../models/IVaga';
import { Injectable } from '@angular/core';
import { Store } from './Store';
import { HttpClient } from '@angular/common/http';
import { logHttpError } from 'src/helpers';



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
    this._http
      .post(`${this.api}/vagas`, vaga)
      .subscribe(console.warn, logHttpError);
  }

  get() {
    return this._getStoreData('/vagas');
  }
}
