<?php 
$id = 2; // remplace 1 par l'ID de l'utilisateur que tu souhaites sélectionner
$query = "SELECT * FROM users WHERE id = :id";
$bdd = new PDO("mysql:host=localhost;dbname=calanques;charset=utf8", "root", "");
$req = $bdd->prepare($query);
$req->bindParam(':id', $id, PDO::PARAM_INT); // lie l'ID au paramètre de la requête
$req->execute();

$user = $req->fetch(PDO::FETCH_ASSOC); // récupère directement l'utilisateur
//var_dump($user);

if ($user) {
    echo "Pseudo : " . $user['pseudo'] . "<br>";
    echo "Email : " . $user['email'] . "<br>";
} else {
    echo "Aucun utilisateur trouvé avec cet ID.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>profile</title>
</head>
<body>
<?php include '_header.php' ?>
    
    <p class="color-pseudo">Bonjour : <?= $user['pseudo'] ?></p>
  
<?php include '_footer.php' ?>
</body>
</html> 
