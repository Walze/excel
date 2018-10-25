import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITable, ILinha } from 'src/app/models/IResponse';

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

  @Input() public tabela: Readonly<ITable>;
  @Input() public xPorClick: number;
  @Output() public contadorClick = new EventEmitter<IContadorClick>();

  public click(e: Event, linhaArg: ILinha) {
    e.preventDefault();

    const linha = { ...linhaArg };
    const add = e.type !== 'contextmenu';

    if (!add && linha.contador <= 0) { return; }

    linha.contador += (add ? 1 : -1) * this.xPorClick;

    this.contadorClick.emit({ linha, add });
  }
}
