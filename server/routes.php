<?php

function main($db)
{
    $de = isset($_GET['de']) ? $_GET['de'] : false;
    $ate = isset($_GET['ate']) ? $_GET['ate'] : false;
    $vaga = isset($_GET['vaga']) ? $_GET['vaga'] : false;

    $dia = new stdClass();

    $dia->de = $de;
    $dia->ate = $ate;

    if ($dia->de === false && $dia->ate === false) {
        $dia = false;
    } else if ($dia->de === 'null' || $dia->de === null || $dia->de === false) {
        $dia->de = 'true';
    }

    json_print(
        getResponse($db, $dia, $vaga)
    );
}

function novoProcesso($db, $data)
{
    $obj = (object) $data;
    $exists = $db->exists(
        'processo',
        "dia='{$obj->dia}' AND vaga_id='{$obj->vaga_id}'"
    );

    if ($exists) {
        throw new Exception("Processo já existe.", 1);
    }

    $result = $db->save('processo', [$data]);

    if (!$result) {
        var_dump($data, $result);
    }

    json_print(
        $result
    );
}

function fetchVagas($db)
{
    $query = "SELECT
      *
      FROM `vaga`
    ;";

    $data = $db->fetchAll($query);

    json_print($data);
}

function novaVaga($db, $data)
{
    $result = $db->save('vaga', [$data]);

    json_print($result);
}

function updateContador($db, $data)
{
    $linha = $data['linha'];

    unset($linha['nome']);

    $where = "
      grupo_linha_id = '{$linha['grupo_linha_id']}'
      AND
      processo_id = '{$linha['processo_id']}'
    ";

    $found = $db->exists('contador_linha', $where);

    if ($found) {
        $query = "UPDATE `contador_linha`
          SET `contador` = {$linha['contador']}
          WHERE ${where}
        ;";

        $result = $db->execute($query);
    } else {
        $linha['contador'] = 1;
        $result = $db->save('contador_linha', [$linha]);
    }

    json_print(
        $result
    );
}
