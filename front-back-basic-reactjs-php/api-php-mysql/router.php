<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, PUT, POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include './config/Database.php';


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once('./models/UsersModel.php');

$user = new UsersModel();



if (isset($_GET['allUsers'])) {
    $result = $user->getUsers();
    echo json_encode($result);
}

if (isset($_GET['register'])) {
    $userArray = getJsonInput();
    $result = $user->createUser($userArray);
    header('Content-Type: application/json'); // Ajoutez ceci pour indiquer que la réponse est en JSON
    echo json_encode($result);
    exit();
}

if (isset($_GET['login'])) {
    $login = getJsonInput();
    if (!isset($login['email']) || !isset($login['password'])) {
        header('Content-Type: application/json'); // Ajoutez ceci pour indiquer que la réponse est en JSON
        echo json_encode(['error' => 'Missing required fields']);
        http_response_code(400);
        exit();
    }

    $result = $user->login($login['email'], $login['password']);
    header('Content-Type: application/json'); // Ajoutez ceci pour indiquer que la réponse est en JSON
    echo json_encode($result);
    exit();
}

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