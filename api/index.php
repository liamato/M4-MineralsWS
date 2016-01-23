<?php

include "vendor/autoload.php";

use ligght\Router;

$pdo = new PDO('mysql:dbname=mineralsws;host=127.0.0.1;charset=utf8', 'root', 'root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
header('Content-Type: application/json');

Router::getInstance()->route(
    'GET',
    'minerals',
    function() use ($pdo){
        print json_encode($pdo->query("SELECT `id`,`nom` FROM `minerals`")->fetchAll(PDO::FETCH_ASSOC));
    },
    array()
);

Router::getInstance()->route(
    'GET',
    'minerals/:id',
    function($id) use ($pdo){
        $id = $pdo->quote($id);
        print json_encode($pdo->query("SELECT * FROM `minerals` WHERE `id` = ".$id)->fetch(PDO::FETCH_ASSOC));
    },
    array(':id')
);

Router::getInstance()->run();
