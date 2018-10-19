import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDadoProcesso, ILinha, IProcesso } from '../models/IResponse';
import { Subject } from 'rxjs';

const api = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {

  private _dados: IDadoProcesso[];
  public dados = new Subject<IDadoProcesso[]>();

  constructor(
    private _http: HttpClient
  ) { }

  public get(de: string, ate: string) {
    return this._getDadosHttp(`${api}/?de=${de}&ate=${ate}`);
  }

  private _getDadosHttp(url: string) {
    return this._http
      .get<IDadoProcesso[]>(url)
      .subscribe(resp => this._change(resp));
  }

  public onChange(cb: <T>(resp: IDadoProcesso[]) => T | void) {
    this.dados.subscribe(resp => cb(resp));
  }

  private _change(resp: IDadoProcesso[]) {
    this._dados = resp;
    this.dados.next(this._dados);
  }

  public updateContador(linhaArg: ILinha, processoId: number) {
    const copy = [...this._dados];
    const dadoProcesso = copy.find(p => p.processo.id === processoId);

    dadoProcesso.table.map(grupo => {
      grupo.linhas.map(linha => {

        if (linha.grupo_linha_id === linhaArg.grupo_linha_id) {
          linha.contador = linhaArg.contador;
        }

      });
    });

    this._change(copy);
  }

  public async novoProcesso(obj: IProcesso) {
    console.log(obj);

    this._http.post(`${api}/processo`, obj)
      .subscribe(result => {
        console.warn(result);
      });

  }

}
