import { Component, Input } from '@angular/core';
import { ICard } from '../models/IResponse';
import { ProcessosService } from '../services/processos.service';
import { IContadorClick } from './tabela/tabela.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardsComponent {

  @Input() public card: Readonly<ICard>;
  @Input() public xPorClick = 1;

  constructor(
    public cardS: ProcessosService
  ) {
  }

  onContadorChange(clickObj: IContadorClick) {
    this.cardS.alterarContador(clickObj);
  }

}
