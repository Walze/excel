<?php

function json_print($data)
{
    $encoded = json_encode($data);

    if (!$encoded) {
        throw new Exception("Erro ao parsear o json, provavelmente algum erro com utf-8", 1);
    }

    echo $encoded;
}

function findValueInArrayOfObject($array, $key, $value)
{

    foreach ($array as $object) {
        if ($object->{$key} === $value) {
            return $object;
        }
    }

    return false;
}

function tirarAcentos($string)
{
    return preg_replace(
        array(
            "/(á|à|ã|â|ä)/",
            "/(Á|À|Ã|Â|Ä)/",
            "/(é|è|ê|ë)/",
            "/(É|È|Ê|Ë)/",
            "/(í|ì|î|ï)/",
            "/(Í|Ì|Î|Ï)/",
            "/(ó|ò|õ|ô|ö)/",
            "/(Ó|Ò|Õ|Ô|Ö)/",
            "/(ú|ù|û|ü)/",
            "/(Ú|Ù|Û|Ü)/",
            "/(ñ)/",
            "/(Ñ)/",
        ),
        explode(" ", "a A e E i I o O u U n N"),
        $string
    );
}

function getPost($string)
{

    return isset($_POST[$string]) ? $_POST[$string] : null;

}
