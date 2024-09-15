<?php
include_once "config.php";

// Ici on va faire une sorte de router

// On va faire des routes de ce type http://localhost/MyBasics-API/fullstack-php-js-natif/index.php?p=home
// Ensuite on fera une réécriture de ça dans le htaccess pour avoir juste http://localhost/MyBasics-API/fullstack-php-js-natif/home

$p = $_GET['p'];


if($p == 'home'){
    include_once CONTROLLER.'HomeController.php';
}else if($p == 'profile'){
    include_once CONTROLLER.'ProfilController.php';
}else{
    echo "erreur 404";
}

