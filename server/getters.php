<?php


function getResponse($conn, $dia, $vaga)
{

    $query = "SELECT
      B.id as id,
      B.grupo_id as grupo_id,
      B.linha_id as linha_id,
      C.nome as grupo_nome,
      D.nome as linha_nome
      FROM `grupo_linha` AS B
      INNER JOIN `grupo` AS C ON B.grupo_id = C.id
      INNER JOIN `linha` AS D ON B.linha_id = D.id
    ;";

    $linhas = fetchAll($conn, $query);
    $processos = getProcessos($conn, $dia, $vaga);
    $tables = getTables($conn, $linhas, $processos);

    return $tables;
}

function getProcessos($conn, $dia, $vaga)
{
    $whereDia = $dia ? "`dia` BETWEEN '{$dia->de}' AND '{$dia->ate}'" : 'true';
    $whereVaga = $vaga ? "vaga = '{$vaga}'" : 'true';

    $query = "SELECT *
      FROM `processo`
      WHERE {$whereVaga} AND {$whereDia}
    ;";

    $processos = fetchAll($conn, $query);

    return processProcessos($processos);
}

function getTables($conn, $linhas, $processos)
{
    $response = [];

    foreach ($processos as $processo) {

        $contadores = getContadores($conn, $processo);
        $table = getTableDia($conn, $linhas, $contadores, $processo);

        array_push($response, $table);
    }

    return $response;
}

function getContadores($conn, $processo)
{

    $query = "SELECT *
      FROM `contador_linha`
      WHERE processo_id = {$processo->id}
    ;";

    $contadores = fetchAll($conn, $query);

    return processContadores($contadores);
}

function getTableDia($conn, $linhas, $contadores, $processo)
{
    return tableResponseFactory(
        $conn,
        processTable($linhas, $contadores),
        $processo
    );
}

function tableResponseFactory($conn, $table, $processo)
{
    return [
        'table' => $table,
        'processo' => $processo,
    ];
}
