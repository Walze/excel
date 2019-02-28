import { Component, OnDestroy } from '@angular/core';
import { ICard, ILinha } from '../models/IResponse';
import { IContadorClick } from './tabela/tabela.component';
import { FreezeObject } from 'src/helpers';
import { ProcessosService } from '../services/processos.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnDestroy {

  public cards: ReadonlyArray<ICard>;
  public xPorClick = 1;

  public form = {
    de: null,
    // data de hoje
    ate: new Date().toISOString().split('T')[0],
  };

  constructor(
    public cardS: ProcessosService
  ) {
    cardS.event.subscribe((resp) => {
      console.log('Processos Changed:', resp);

      this.cards = FreezeObject(resp);
    });

    this.todosProcessos();
  }

  todosProcessos(e?: Event) {
    if (e) {
      e.preventDefault();
    }

    this.cardS.all();
    // alert('Essa operação pode demorar um pouco.');
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
