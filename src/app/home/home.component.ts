import { Component, OnDestroy } from '@angular/core';
import { ICard } from './../models/IResponse';
import { Subscription } from 'rxjs';
import { ProcessosService } from '../services/processos.service';
import { FreezeObject } from 'src/helpers';
import { IContadorClick } from './../cards/tabela/tabela.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  public cards: ReadonlyArray<ICard>;
  public xPorClick = 1;
  public form = {
    de: null,
    // data de hoje
    ate: new Date().toISOString().split('T')[0],
  };

  public cardsSub: Subscription;

  constructor(
    public cardS: ProcessosService
  ) {
    this.cardsSub = cardS.data.subscribe((resp) => {
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

  ngOnDestroy() {
    this.cardsSub.unsubscribe();
  }
}
