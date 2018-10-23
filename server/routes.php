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
  $obj = (object)$data;
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
  $query = " SELECT
  *
  FROM `vaga`
  ;";

  $data = $db->fetchAll($query);

  json_print($data);
}
