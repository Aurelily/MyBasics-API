<?php
require_once('./cors.php'); 


include './config/Database.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once('./models/UsersModel.php');

$user = new UsersModel();

// Fonction pour récupérer les données JSON de l'entrée
function getJsonInput() {
    $rawData = file_get_contents("php://input");
    $decodedData = json_decode($rawData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        header('Content-Type: application/json'); // Ajoutez ceci pour indiquer que la réponse est en JSON
        echo json_encode(['error' => 'Invalid JSON data']);
        http_response_code(400);
        exit();
    }
    return $decodedData;
}

// Route pour récupérer les info d'un utilisateur via son id
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user']) && isset($_GET['id'])) {
    $id = $_GET['id'];
    $result = $user->getUser($id);
    echo json_encode($result);
    exit();
}


// Route pour récupérer tous les utilisateurs
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['list'])) {
    $result = $user->getUsers();
    echo json_encode($result);
    exit();
}

// Route pour enregistrer un utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['register'])) {
    $userArray = getJsonInput();
    $result = $user->createUser($userArray);
    echo json_encode($result);
    exit();
}

// Route pour mettre à jour un utilisateur via son id
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['update']) && isset($_GET['id'])) {
    $id = (int)$_GET['id']; // Convertir l'ID en entier
    $userArray = getJsonInput();
    $result = $user->updateUser($id, $userArray);
    echo json_encode($result);
    exit();
}

// Route pour supprimer un utilisateur via son id
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['delete']) && isset($_GET['id'])) {
    $id = $_GET['id'];
    $result = $user->deleteUser($id);
    echo json_encode($result);
    exit();
}

// Route pour connecter un utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['login'])) {
    $login = getJsonInput();
    if (!isset($login['email']) || !isset($login['password'])) {
        echo json_encode(['error' => 'Missing required fields']);
        http_response_code(400);
        exit();
    }
    $result = $user->login($login['email'], $login['password']);
    echo json_encode($result);
    exit();
}

// Route pour les méthodes non prises en charge
header("HTTP/1.1 405 Method Not Allowed");
echo json_encode(['error' => 'Method Not Allowed']);
exit();
?>
