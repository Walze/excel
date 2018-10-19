<?php

function fetchAll($db, $query, $statement = false)
{
    $stmt = $db->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    return $statement ? $stmt : $result;
}

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
