import { Component, OnInit } from '@angular/core';
import { ProcessosService } from '../services/processos.service';
import { IProcesso } from '../models/IResponse';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css']
})
export class NovoProcessoComponent {

  public novo: IProcesso = {
    vaga: '',
    fontes: '',
    pessoas: '',
    dia: '',
  };

  constructor(
    public service: ProcessosService
  ) {
  }

  salvar() {
    this.service.novoProcesso(this.novo);
  }


}
