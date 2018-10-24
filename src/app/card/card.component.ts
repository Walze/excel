import { Component, OnDestroy } from '@angular/core';
import { ICard, ILinha } from '../models/IResponse';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnDestroy {

  public dados: ICard[] = [];

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
      this.dados = resp;
    });
  }

  todosProcessos(e: Event) {
    e.preventDefault();

    if (confirm('Essa operação pode demorar um pouco.')) {
      this.cardS.all().add(() => {
        alert('Processos Carregados!');
      });
    }
  }

  onDateChange() {
    if (!this.form.de || !this.form.ate) { return; }

    return this.cardS.get(this.form.de, this.form.ate);
  }

  onContadorChange(linha: ILinha) {
    this.cardS.alterarContador(linha);
  }

  ngOnDestroy() {
    this.cardS.event.unsubscribe();
  }
}
