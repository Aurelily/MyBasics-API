<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE,PUT, POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Répondre à la requête OPTIONS et terminer le script pour les requêtes preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once('./models/User.php');
$user = new User();

// Fonction pour traiter le JSON brut
function getJsonInput() {
    $rawData = file_get_contents("php://input");
    $decodedData = json_decode($rawData, true);

    // Vérification que le JSON est valide
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Invalid JSON data']);
        http_response_code(400); // Code de réponse HTTP 400 pour mauvaise requête
        exit();
    }
    return $decodedData;
}

if (isset($_GET['users'])) {
    $result = $user->getUsers();
    echo json_encode($result);
}

if (isset($_GET['register'])) {
    $userArray = getJsonInput(); // Utiliser la fonction getJsonInput pour obtenir les données
    $result = $user->createUser($userArray);
    echo json_encode($result);
}

if (isset($_GET['login'])) {
    $login = getJsonInput(); // Utiliser la fonction getJsonInput pour obtenir les données

    // Assurez-vous que les champs requis sont présents
    if (!isset($login['email']) || !isset($login['password'])) {
        echo json_encode(['error' => 'Missing required fields']);
        http_response_code(400); // Code de réponse HTTP 400 pour mauvaise requête
        exit();
    }

    $result = $user->login($login['email'], $login['password']);
    echo json_encode($result);
}




?>
