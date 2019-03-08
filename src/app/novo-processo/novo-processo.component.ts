import { ProcessosService } from 'src/app/services/processos.service';
import { FiliaisService } from './../services/filiais.service';
import { VagasService } from 'src/app/services/vagas.service';
import { IProcesso } from './../models/IResponse';
import { IFilial } from '../models/IFilial';
import { Component } from '@angular/core';
import { IVaga } from './../models/IVaga';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css']
})
export class NovoProcessoComponent {

  public novo: IProcesso;

  private readonly _initial: IProcesso = {
    vaga_id: 0,
    filial_id: 0,
    fontes: '',
    pessoas: '',
    dia: '',
  };

  public vagas: IVaga[];
  public filiais: IFilial[];

  public visivel = false;

  constructor(
    private _cardS: ProcessosService,
    private _filialS: FiliaisService,
    private _vagasS: VagasService
  ) {
    this.novo = this._initial;

    this._filialS.data.subscribe(filiais => {
      this.filiais = filiais;
    });

    this._vagasS.data.subscribe(vagas => {
      this.vagas = vagas;
    });
  }

  criarFilial(e: Event) {
    e.preventDefault();

    const nome = prompt('Digite o nome da vaga');

    if (!nome) {
      return;
    }

    this._filialS
      .nova({ nome })
      .subscribe(added => {
        if (added) {
          this._filialS.refresh();
        }

        alert(
          added
            ? 'Adicionado'
            : 'Erro ao adicionar, possivelmente vaga já existe.'
        );
      });
  }

  criarVaga(e: Event) {
    e.preventDefault();

    const nome = prompt('Digite o nome da vaga');

    if (!nome) {
      return;
    }

    this._vagasS
      .nova({ nome })
      .subscribe(added => {
        alert(
          added
            ? 'Adicionado'
            : 'Erro ao adicionar, possivelmente vaga já existe.'
        );

        if (added) {
          this._vagasS.refresh();
        }
      });
  }

  toggle() {
    this.visivel = !this.visivel;

    if (this.visivel) {
      this._vagasS.get();
      this._filialS.get();
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
