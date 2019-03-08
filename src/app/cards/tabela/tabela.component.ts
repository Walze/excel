import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITable, ILinha } from 'src/app/models/IResponse';
import { colorPalette } from './../../../helpers';
import { ProcessosService } from 'src/app/services/processos.service';

export interface IContadorClick {
  linha: ILinha;
  add: boolean;
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent {

  public cores = colorPalette('#e8f5f9', 18);

  @Input() public tabela: Readonly<ITable>;

  constructor(
    public cardS: ProcessosService
  ) {
  }

  public click(e: Event, linhaArg: ILinha) {
    e.preventDefault();

    const linha = { ...linhaArg };
    const add = e.type !== 'contextmenu';

    if (!add && linha.contador <= 0) { return; }

    linha.contador += (add ? 1 : -1) * this.cardS.xPorClick;

    this.cardS.contadorClick.next({ linha, add });
  }
}
