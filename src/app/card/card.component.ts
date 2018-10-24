import { Component, OnDestroy } from '@angular/core';
import { ICard, ILinha } from '../models/IResponse';
import { CardService } from '../services/card.service';
import { IContadorClick } from './tabela/tabela.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnDestroy {

  public dados: ReadonlyArray<ICard> = [];
  public xPorClick = 1;

  public form = {
    de: null,
    // data de hoje
    ate: new Date().toISOString().split('T')[0],
  };

  constructor(
    public cardS: CardService
  ) {
    cardS.event.subscribe((resp) => {
      console.log('Processos Changed:', resp);
      this.dados = Object.freeze(resp);
    });
  }

  todosProcessos(e: Event) {
    e.preventDefault();

    if (confirm('Essa operação pode demorar um pouco.')) {
      this.cardS.all();
    }
  }

  onDateChange() {
    if (!this.form.de || !this.form.ate) { return; }

    return this.cardS.get(this.form.de, this.form.ate);
  }

  onContadorChange(clickObj: IContadorClick) {
    this.cardS.alterarContador(clickObj);
  }

  ngOnDestroy() {
    this.cardS.event.unsubscribe();
  }
}
