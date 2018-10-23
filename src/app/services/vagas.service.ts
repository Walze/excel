import { IVaga } from './../models/IVaga';
import { Injectable } from '@angular/core';
import { Store } from './Store';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class VagasService extends Store<IVaga> {


  constructor(
    protected _http: HttpClient
  ) {
    super(_http);
  }

  get() {
    return this._getStoreData('/vagas');
  }
}
