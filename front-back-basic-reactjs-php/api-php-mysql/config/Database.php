<?php

class Database {

    protected $pdo; // Si c'est en pas en private je peux faire this->pdo dans l'enfant sinon je devrait utiliser le getter
    

    public function __construct()
    {
        $dbHost = 'localhost';
        $dbName = 'mybasicapi';
        $dbUser = 'root';
        $dbPass = '';
        
        try {
            $this->pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8" ,$dbUser,$dbPass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');

        } catch (PDOException $e) {
            die($e->getMessage());
        }
       
    }

    
}

?>