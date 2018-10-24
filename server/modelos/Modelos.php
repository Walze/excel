<?php

class Grupo
{
  public $id;
  public $nome;

  public function __construct($id, $nome)
  {
    $this->id = (int)$id;
    $this->nome = ($nome);
  }
}

class Linha
{
  public $id;
  public $nome;

  public function __construct($id, $nome)
  {
    $this->id = (int)$id;
    $this->nome = ($nome);
  }
}

class Processo
{
  public $id;
  public $vaga_id;
  public $vaga_nome;
  public $pessoas;
  public $fontes;
  public $dia;
  private $db;

  public function __construct($obj, $db = null)
  {
    $this->id = (int)$obj->id;

    $this->vaga_id = (int)($obj->vaga_id);
    $this->vaga_nome = ($obj->vaga_nome);
    $this->pessoas = ($obj->pessoas);
    $this->fontes = ($obj->fontes);
    $this->dia = $obj->dia;

    $this->db = $db;
  }
}

class ContadorLinha
{
  public $grupo_linha_id;
  public $processo_id;
  public $contador;
  public $db;

  public function __construct($obj, $db = null)
  {
    $this->db = $db;
    $this->grupo_linha_id = (int)$obj->grupo_linha_id;
    $this->processo_id = (int)$obj->processo_id;
    $this->contador = (int)$obj->contador;
  }
}

class DB
{
  public $conn;

  public function __construct($name, $user, $pass = '')
  {
    $db = new PDO("mysql:host=localhost;dbname={$name}", $user, $pass);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $this->conn = $db;
  }

  public function execute($query, $statement = false)
  {
    try {
      $stmt = $this->conn->prepare($query);
      $execute = $stmt->execute();

      return $statement ? $stmt : $execute;
    } catch (\Exception $e) {
      var_dump($e);
      return $e;
    }
  }

  public function fetchAll($query, $statement = false)
  {
    $stmt = $this->execute($query, true);
    $result = $stmt->fetchAll();

    return $statement ? $stmt : $result;
  }

  public function save($table, $objects)
  {
    $colsVals = $this->_makeColumnsValues($objects);

    $query = "INSERT
          INTO `{$table}` {$colsVals->columns}
          VALUES {$colsVals->values}
        ;";

    return $this->execute($query);
  }

  public function exists($table, $where)
  {
    $result = $this->find($table, $where);

    return count($result) >= 1;
  }

  public function find($table, $where)
  {
    $query = "SELECT *
        FROM {$table}
        WHERE {$where}
        ;";

    return $this->fetchAll($query);
  }

  private function _makeColumnsValues($objects)
  {
    $stringArr = [];
    $columnsArr = [];

    $gotColumns = false;

    foreach ($objects as $object) {
      $values = [];

      foreach ($object as $prop => $value) {
        array_push($values, "'{$value}'");

        if (!$gotColumns) {
          array_push($columnsArr, "`{$prop}`");
        }
      }
      $gotColumns = true;

      $join = join(', ', $values);
      array_push($stringArr, "({$join})");
    }

    $result = new stdClass();

    $result->columns = "(" . join(', ', $columnsArr) . ")";
    $result->values = join(', ', $stringArr);

    return $result;
  }

  public function __destruct()
  {
    $this->conn = null;
  }
}
