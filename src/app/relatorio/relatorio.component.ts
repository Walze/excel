import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProcessosService } from './../services/processos.service';
import { ICard } from '../models/IResponse';
import { VagasService } from './../services/vagas.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  public card: ICard | undefined;
  public form = {
    de: new Date(0).toISOString().split('T')[0],
    ate: new Date().toISOString().split('T')[0],
    filial: '',
    vaga_nome: '',
  };

  constructor(
    processosS: ProcessosService,
    vagaS: VagasService,
  ) {
    processosS.data.subscribe(data => {
      if (!data.length) { return; }

      this.card = this._processRelatorio(data);
    });

    processosS.all();
  }

  private _processRelatorio(data: ICard[]) {
    return data.reduce((prev, curr) => ({
      processo: curr.processo,
      table: curr.table.map((t, i) => {
        t.linhas = t.linhas.map((l, i2) => {
          l.contador += prev.table[i].linhas[i2].contador;
          return l;
        });

        return t;
      })
    }));
  }

}
