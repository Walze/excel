<?php

function processProcessos($processos)
{
    foreach ($processos as $key => $processo) {
        $processos[$key] = new Processo($processo);
    }

    return $processos;
}

function processContadores($contadores)
{
    foreach ($contadores as $key => $contador) {
        $contadores[$key] = new ContadorLinha($contador);
    }

    return $contadores;
}

function processTable($grupo_linha, $contadores, $processo_id)
{
    $grupos = [];

    foreach ($grupo_linha as $value) {
        $item = new GrupoLinhaParser($value);

        $grupo = findValueInArrayOfObject(
            $grupos,
            'id',
            $item->grupo_id
        );

        if (!$grupo) {
            $grupo = new Grupo($item->grupo_id, $item->grupo_nome);
            $grupo->linhas = [];
            array_push($grupos, $grupo);
        }

        $contadorObj = findValueInArrayOfObject(
            $contadores,
            'grupo_linha_id',
            $item->id
        );

        $contador = $contadorObj
        ? $contadorObj->contador
        : 0;

        $linha = [
            'grupo_linha_id' => (int) $item->id,
            'processo_id' => (int) $processo_id,
            'contador' => (int) $contador,
            'nome' => $item->linha_nome,
        ];

        array_push($grupo->linhas, (object) $linha);
    }

    return $grupos;

}
