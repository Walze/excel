import { IVaga } from './../models/IVaga';
import { VagasService } from './../services/vagas.service';
import { Component } from '@angular/core';
import { IProcesso } from '../models/IResponse';
import { ProcessosService } from './../services/processos.service';

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

  public novaVaga: IVaga = {} as IVaga;

  public vagas: IVaga[];

  public visivel = false;

  constructor(
    private _cardS: ProcessosService,
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

    if (!this.novaVaga.nome) {
      return;
    }

    this._vagasS
      .novaVaga(this.novaVaga)
      .subscribe(added => {
        alert(
          added
            ? 'Adicionado'
            : 'Erro ao adicionar, possivelmente vaga já existe.'
        );

        if (added) {
          this.novaVaga.nome = '';
          this._vagasS.get();
        }
      });
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
      return alert('Preencha os campos');
    }

    this._cardS.novoProcesso(this.novo);
    this.novo = this._initial;
    // this.visivel = false;
  }


}
