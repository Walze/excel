import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessosService } from '../services/processos.service';
import { IDadoProcesso, ILinha } from '../models/IResponse';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnDestroy {

  public dados: IDadoProcesso[] = [];

  public form = {
    de: null,
    // data de hoje
    ate: new Date().toISOString().split('T')[0],
  };

  constructor(
    public processosService: ProcessosService
  ) {

    processosService.onChange((resp) => {
      console.log('Processos Changed:', resp);
      this.dados = resp;
    });
  }

  todosProcessos(e: Event) {
    e.preventDefault();

    if (confirm('Essa operação pode demorar um pouco.')) {
      this.processosService.all().add(() => {
        alert('Processos Carregados!');
      });
    }
  }

  onDateChange() {
    if (!this.form.de || !this.form.ate) { return; }

    return this.processosService.get(this.form.de, this.form.ate);
  }

  onContadorChange(linha: ILinha, id: number) {
    this.processosService.updateContador(linha, id);
  }

  ngOnDestroy() {
    this.processosService.dados.unsubscribe();
  }
}
