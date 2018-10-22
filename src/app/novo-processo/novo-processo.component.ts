import { Component, OnInit } from '@angular/core';
import { ProcessosService } from '../services/processos.service';
import { IProcesso } from '../models/IResponse';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css']
})
export class NovoProcessoComponent {

  public novo: IProcesso;

  private readonly _initial: IProcesso = {
    vaga: '',
    fontes: '',
    pessoas: '',
    dia: '',
  };

  public visivel = false;

  constructor(
    public service: ProcessosService
  ) {
    this.novo = this._initial;
  }

  toggle() {
    this.visivel = !this.visivel;
  }

  salvar() {
    if (!this.novo.vaga || !this.novo.dia) {
      return alert('Preencha os campos');
    }

    this.service.novoProcesso(this.novo);
    this.novo = this._initial;
    this.visivel = false;
  }


}
