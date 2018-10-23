<?php

function exception_error_handler($errno, $errstr, $errfile, $errline)
{
  $error = new ErrorException($errstr, $errno, 0, $errfile, $errline);

  json_print([
    'number' => $errno,
    'string' => $errstr,
    'file' => $errfile,
    'line' => $errline,
  ]);

  throw $error;
}
set_error_handler("exception_error_handler");

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

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];

try {

  $db = new DB('excel3', 'root');

  if ($method === "GET") {

    switch ($uri[0]) {
      case 'vagas':
        fetchVagas($db);
        break;

      default:
        main($db);
        break;
    }

  } elseif ($method === "POST") {

    switch ($uri[0]) {
      case 'vagas':
        novaVaga($db);
        break;

      case 'contador':
        var_dump($uri);
        break;

      case 'processo':
        novoProcesso($db, $data);
        break;
    }

  }

} catch (Throwable $e) {
  json_print([
    'code' => $e->getCode(),
    'text' => $e->getMessage(),
  ]);
}
finally {
  $db->conn = null;
  $db = null;
  die();
}
