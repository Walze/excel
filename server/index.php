

<?php
header("Content-Type: application/json; charset=ISO-8859-1", true);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once './helpers.php';
require_once './routes.php';
require_once './modelos/Modelos.php';
require_once './modelos/ContadorLinha.php';
require_once './modelos/GrupoLinhaParser.php';
require_once './getters.php';
require_once './processadoresDeDados.php';

$uri = [];
foreach (explode("/", $_SERVER['REQUEST_URI']) as $part) {
    array_push($uri, $part);
}
array_shift($uri);
try {

    $db = new DB();

    switch ($uri[0]) {
        case 'contador':
            echo $uri;
            break;

        default:
            main($db);
            break;
    }

} catch (PDOException $e) {

    json_print([
        'message' => $e->getMessage(),
        'code' => (int) $e->getCode(),
        'e' => $e,
    ]);

} finally {
    $db->conn = null;
    $db = null;
    die();
}
