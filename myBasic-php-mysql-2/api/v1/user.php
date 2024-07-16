<?php
require_once '../../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$database = new Database();
$db = $database->getConnection();

switch ($method) {
    case 'GET':
        getUser($db);
        break;
    case 'POST':
        createUser($db);
        break;
    case 'PUT':
        updateUser($db);
        break;
    case 'DELETE':
        deleteUser($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method Not Allowed"]);
        break;
}

function getUser($db) {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $query = "SELECT * FROM users WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            echo json_encode($row);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "User not found"]);
        }
    } else {
        $query = "SELECT * FROM users";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }
}

function createUser($db) {
    $data = json_decode(file_get_contents("php://input"));
    if (empty($data->pseudo) || empty($data->email) || empty($data->password)) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        return;
    }

    $query = "INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->pseudo);
    $stmt->bindParam(2, $data->email);
    $stmt->bindParam(3, password_hash($data->password, PASSWORD_BCRYPT));

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "User created"]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create user"]);
    }
}

function updateUser($db) {
    $data = json_decode(file_get_contents("php://input"));
    if (empty($data->id) || empty($data->pseudo) || empty($data->email) || empty($data->password)) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        return;
    }

    $query = "UPDATE users SET pseudo = ?, email = ?, password = ? WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->pseudo);
    $stmt->bindParam(2, $data->email);
    $stmt->bindParam(3, password_hash($data->password, PASSWORD_BCRYPT));
    $stmt->bindParam(4, $data->id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User updated"]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to update user"]);
    }
}

function deleteUser($db) {
    $data = json_decode(file_get_contents("php://input"));
    if (empty($data->id)) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        return;
    }

    $query = "DELETE FROM user WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $data->id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User deleted"]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to delete user"]);
    }
}
?>
