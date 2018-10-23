import { IVaga } from './../models/IVaga';
import { VagasService } from './../services/vagas.service';
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
    vaga_id: 0,
    fontes: '',
    pessoas: '',
    dia: '',
  };

  public novaVaga: IVaga;

  public vagas: IVaga[];

  public visivel = false;

  constructor(
    private _processosS: ProcessosService,
    private _vagasS: VagasService
  ) {
    this.novo = this._initial;

    this._vagasS.event.subscribe(vagas => {
      this.vagas = vagas;
    });
  }

  criarVaga(e: Event) {
    e.preventDefault();

    this.novaVaga.nome = prompt('Digite o nome da vaga');

    this._vagasS.novaVaga(this.novaVaga);
  }

  toggle() {
    this.visivel = !this.visivel;

    if (this.visivel) {
      this._vagasS.get();
    }
  }

  salvar() {
    this.novo.vaga_id = Number(this.novo.vaga_id);

    if (this.novo.vaga_id === 0 || !this.novo.dia) {
      console.log(this.novo);
      return alert('Preencha os campos');
    }

    this._processosS.novoProcesso(this.novo);
    this.novo = this._initial;
    // this.visivel = false;
  }


}
