<?php

class Grupo
{
    public $id;
    public $nome;

    public function __construct($id, $nome)
    {
        $this->id = (int) $id;
        $this->nome = ($nome);
    }
}

class Linha
{
    public $id;
    public $nome;

    public function __construct($id, $nome)
    {
        $this->id = (int) $id;
        $this->nome = ($nome);
    }
}

class Processo
{
    public $id;
    public $vaga;
    public $pessoas;
    public $fontes;
    public $dia;
    private $db;

    public function __construct($obj, $db = null)
    {
        $this->id = (int) $obj->id;

        $this->vaga = ($obj->vaga);
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
        $this->grupo_linha_id = (int) $obj->grupo_linha_id;
        $this->processo_id = (int) $obj->processo_id;
        $this->contador = (int) $obj->contador;
    }
}

class DB
{
    public $conn;

    public function __construct()
    {
        $db = new PDO('mysql:host=localhost;dbname=excel2', 'root', '');
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

        $this->conn = $db;
    }

    private function makeColumnsValues($objects)
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

    public function save($table, $objects)
    {
        $colsVals = $this->makeColumnsValues($objects);

        $query = "INSERT
          INTO `{$table}` {$colsVals->columns}
          VALUES {$colsVals->values}
        ;";

        return $query;
    }

}
