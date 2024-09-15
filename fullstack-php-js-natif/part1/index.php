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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>home</title>
</head>
<body>

<?php include '_header.php' ?>

    <?php foreach($users as $user):?>
    <p class="color-pseudo"><?= $user['pseudo'] ?></p>
    <?php endforeach ?>

<?php include '_footer.php' ?>

</body>
</html> 
