export interface ILinha {
  id: number;
  nome: string;
  contador: number;
  grupo_linha_id: number;
}

export interface IGrupo {
  id: number;
  nome: string;
  linhas: ILinha[];
}

export interface IProcesso {
  id?: number;
  fontes: string;
  dia: string;
  pessoas: string;
  vaga: string;
}

export type ITable = IGrupo[];

export interface IDadoProcesso {
  processo: IProcesso;
  table: ITable;
}
