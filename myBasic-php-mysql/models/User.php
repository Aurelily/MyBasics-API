<?php
require_once './config/Database.php';

class User extends Database {

    public function getUsers(){ // récupère tous les users de la bdd
        try {
            $query = $this->pdo->prepare("SELECT * FROM users");
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            return $result;
        } catch (\Throwable $th) {
            return 'une erreur est survenue';
        }

    }
    
    public function createUser($user){
        $user['password'] = password_hash($user['password'], PASSWORD_BCRYPT);
        try {

            $query = $this->pdo->prepare("INSERT INTO users (pseudo, email, password) VALUES (:pseudo, :email, :password)");
            $query->bindValue(':pseudo', $user['pseudo'], PDO::PARAM_STR);
            $query->bindValue(':email', $user['email'], PDO::PARAM_STR);
            $query->bindValue(':password', $user['password'], PDO::PARAM_STR);
            $query->execute();
        } catch (\Throwable $th) {
            throw $th;
        }
   
    }
    
    public function login($email, $password){
        try {
            $query = $this->pdo->prepare("SELECT * FROM users WHERE email = :email");
            $query->bindValue(':email', $email, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
            // var_dump($result);
            if(count($result) > 0){    
                if(password_verify($password,$result['password'])){
                    unset($result['password']);
                    return $result;
                }
                else{
                    return 'false password';
                }
            }
            else{
                return 'noCount';
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

       







    

}

?>