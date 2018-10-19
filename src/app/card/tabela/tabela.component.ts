import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITable, ILinha } from 'src/app/models/IResponse';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent {

  @Input() public tabela: ITable;
  @Output() public contadorChange = new EventEmitter<ILinha>();

  public click(e: Event, linha: ILinha) {
    e.preventDefault();

    const add = e.type !== 'contextmenu';

    if (!add && linha.contador <= 0) { return; }

    linha.contador += add ? 1 : -1;

    this.contadorChange.emit(linha);
  }
}
