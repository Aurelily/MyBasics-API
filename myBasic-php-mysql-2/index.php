<?php
$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/api/v1/user':
        require __DIR__ . '/api/v1/user.php';
        break;
    case (preg_match('/\/api\/v1\/user\/[0-9]+/', $request) ? true : false):
        $_GET['id'] = basename($request);
        require __DIR__ . '/api/v1/user.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
        break;
}
?>
