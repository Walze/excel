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

function processTable($grupo_linha, $contadores)
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

        $linha = new Linha($item->linha_id, $item->linha_nome);

        $contadorObj = findValueInArrayOfObject(
            $contadores,
            'grupo_linha_id',
            $item->id
        );

        $linha->grupo_linha_id = $item->id;
        $linha->contador = $contadorObj
        ? $contadorObj->contador
        : 0;

        array_push($grupo->linhas, $linha);
    }

    return $grupos;

}
