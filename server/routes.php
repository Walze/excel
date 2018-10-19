<?php

function main($db)
{
    $de = isset($_GET['de']) ? $_GET['de'] : false;
    $ate = isset($_GET['ate']) ? $_GET['ate'] : false;
    $vaga = isset($_GET['vaga']) ? $_GET['vaga'] : false;

    $dia = new stdClass();

    $dia->de = $de;
    $dia->ate = $ate;

    if ($dia->de === 'null' || $dia->de === null || $dia->de === false) {
        $dia->de = 'true';
    }

    json_print(
        getResponse($db->conn, $dia, $vaga)
    );
}
