<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo ASSETS;?>css/styles.css">
    <title>profile</title>
</head>
<body>
<?php include VIEW.'_header.php' ?>
    
    <p class="color-pseudo">Bonjour : <?= $user['pseudo'] ?></p>
  
<?php include VIEW.'_footer.php' ?>
</body>
</html> 
