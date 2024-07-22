<?php


class UsersModel extends Database  {

    public int $id;
    public string $pseudo;
    public string $email;
    public string $password; 

    
    public function __construct()
    {
        parent::__construct(); 

        $this->id = 0; // ou toute valeur par défaut appropriée
        $this->pseudo = '';
        $this->email = '';
        $this->password = '';
        
       
    }
    

    // GET : /allUsers : récupère tous les users de la bdd
    //--------------------------------------------------------

    public function getUsers() {
    
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM users;");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
          throw new Error($e->getMessage());
        }
    }

     // GET : /user&id= : Récupère un user par ID de la bdd
    //--------------------------------------------------------

    public function getUser($id) {
        try {
            $query = $this->pdo->prepare("SELECT * FROM users WHERE id = :id");
            $query->bindValue(':id', $id, PDO::PARAM_INT);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                return $result;
            } else {
                http_response_code(404); // Statut HTTP 404 Not Found
                return ['status' => 'error', 'message' => 'Utilisateur non trouvé'];
            }
        } catch (PDOException $e) {
            http_response_code(500); // Statut HTTP 500 Internal Server Error
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
    
    
    
    
    // POST : /register : Crée un user dans la bdd
    //--------------------------------------------------------

    public function createUser(array $userData) {
        try {
            $hashedPassword = password_hash($userData['password'], PASSWORD_BCRYPT);

            $query = $this->pdo->prepare("INSERT INTO users (pseudo, email, password) VALUES (:pseudo, :email, :password)");
            $query->bindValue(':pseudo', $userData['pseudo'], PDO::PARAM_STR);
            $query->bindValue(':email', $userData['email'], PDO::PARAM_STR);
            $query->bindValue(':password', $hashedPassword, PDO::PARAM_STR);
            $query->execute();
        } catch (PDOException $e) {
            throw new Error($e->getMessage());
        }
    }

    // PUT : /update&id : Met à jour les informations d'un utilisateur
    //--------------------------------------------------------
    public function updateUser($id, array $userData) {
        try {
            $hashedPassword = password_hash($userData['password'], PASSWORD_BCRYPT);
    
            $query = $this->pdo->prepare("UPDATE users SET pseudo = :pseudo, email = :email, password = :password WHERE id = :id");
            $query->bindValue(':pseudo', $userData['pseudo'], PDO::PARAM_STR);
            $query->bindValue(':email', $userData['email'], PDO::PARAM_STR);
            $query->bindValue(':password', $hashedPassword, PDO::PARAM_STR);
            $query->bindValue(':id', $id, PDO::PARAM_INT);
    
            if ($query->execute()) {
                return ['status' => 'success', 'message' => 'User updated successfully'];
            } else {
                http_response_code(500);
                return ['status' => 'error', 'message' => 'Failed to update user'];
            }
        } catch (PDOException $e) {
            http_response_code(500);
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    // DELETE : /delete&id= : Supprime un user de la bdd
    //--------------------------------------------------------

    public function deleteUser($id) {
        try {
            $query = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
            $query->bindValue(':id', $id, PDO::PARAM_INT);
            if ($query->execute()) {
                return ['status' => 'success', 'message' => 'User deleted successfully'];
            } else {
                http_response_code(500);
                return ['status' => 'error', 'message' => 'Failed to delete user'];
            }
        } catch (PDOException $e) {
            http_response_code(500);
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
    

    // POST : /login : Connecte un user
    //--------------------------------------------------------
    
    
    public function login($email, $password) {
        try {
            $query = $this->pdo->prepare("SELECT * FROM users WHERE email = :email");
            $query->bindValue(':email', $email, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
    
            if ($result) {
                if (password_verify($password, $result['password'])) {
                    unset($result['password']);
                    http_response_code(200); // Statut HTTP 200 OK
                    return $result;
                } else {
                    http_response_code(401); // Statut HTTP 401 Unauthorized
                    return ['status' => 'error', 'message' => 'Mauvais mot de passe !'];
                }
            } else {
                http_response_code(404); // Statut HTTP 404 Not Found
                return ['status' => 'error', 'message' => 'Utilisateur non trouvé'];
            }
        } catch (\Throwable $th) {
            http_response_code(500); // Statut HTTP 500 Internal Server Error
            return ['status' => 'error', 'message' => $th->getMessage()];
        }
    }


}

?>