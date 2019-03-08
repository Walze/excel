<?php

function getResponse($db, $dia, $vaga)
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

    $linhas = $db->fetchAll($query);
    $processos = getProcessos($db, $dia, $vaga);

    $tables = getTables($db, $linhas, $processos);

    return $tables;
}

function getProcessos($db, $dia, $vaga)
{
    $whereDia = $dia ? "`dia` BETWEEN '{$dia->de}' AND '{$dia->ate}'" : 'true';
    $whereVaga = $vaga ? "vaga = '{$vaga}'" : 'true';

    $query = "SELECT
      A.id AS id,
      A.fontes as fontes,
      A.pessoas as pessoas,
      A.dia as dia,
      B.id as vaga_id,
      B.nome AS vaga_nome,
      C.id as filial_id,
      C.nome as filial_nome
      FROM `processo` AS A
      INNER JOIN `vaga` AS B ON B.id = A.vaga_id
      INNER JOIN `filial` AS C ON C.id = A.filial_id
      WHERE {$whereVaga} AND {$whereDia}
    ;";

    $processos = $db->fetchAll($query);

    return processProcessos($processos);
}

function getTables($db, $linhas, $processos)
{
    $response = [];

    foreach ($processos as $processo) {

        $contadores = getContadores($db, $processo);
        $table = getTableDia($linhas, $contadores, $processo);

        array_push($response, $table);
    }

    return $response;
}

function getContadores($db, $processo)
{

    $query = "SELECT *
      FROM `contador_linha`
      WHERE processo_id = {$processo->id}
    ;";

    $contadores = $db->fetchAll($query);

    return processContadores($contadores);
}

function getTableDia($linhas, $contadores, $processo)
{
    return tableResponseFactory(
        processTable($linhas, $contadores, $processo->id),
        $processo
    );
}

function tableResponseFactory($table, $processo)
{
    return [
        'table' => $table,
        'processo' => $processo,
    ];
}
