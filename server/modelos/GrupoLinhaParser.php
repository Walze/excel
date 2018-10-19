<?php

class GrupoLinhaParser
{
    public $id;
    public $grupo_id;
    public $linha_id;
    public $grupo_nome;
    public $linha_nome;

    public function __construct($obj)
    {
        $this->id = (int)$obj->id;
        $this->grupo_id = (int)$obj->grupo_id;
        $this->linha_id = (int)$obj->linha_id;

        $this->grupo_nome = utf8_encode($obj->grupo_nome);
        $this->linha_nome = utf8_encode($obj->linha_nome);
    }
}
