<?php 
$query = "SELECT * from users";
$bdd = new PDO("mysql:host=localhost;dbname=calanques;charset=utf8", "root", "");
$req = $bdd->prepare($query);
$req->execute();

while($row = $req->fetch(PDO::FETCH_ASSOC)){
    $user['pseudo'] = $row['pseudo'];
    $user['email'] = $row['email'];

    $users[]=$user;
}

/* var_dump($users); */
include_once "config.php";
include_once VIEW.'home.php';