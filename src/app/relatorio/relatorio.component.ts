import { Component } from '@angular/core';
import { ProcessosService } from './../services/processos.service';
import { ICard } from '../models/IResponse';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  public card: ICard | undefined;

  constructor(
    processosS: ProcessosService
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
