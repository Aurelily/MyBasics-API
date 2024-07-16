<?php


class UsersModel extends Database  {

 /*    protected int $id;
    protected string $pseudo;
    protected string $email;
    protected string $password; */

    
    public function __construct()
    {
       parent::__construct(); 

       /*  $this->id;
        $this->pseudo = "John Doe";
        $this->email = "";
        $this->password = ""; */
       
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
    
    
    
    
    // POST : /register : Crée un user dans la bdd
    //--------------------------------------------------------

    public function createUser($user){
        // On instancie le model User
        $user = new UsersModel;

        $user['password'] = password_hash($user['password'], PASSWORD_BCRYPT);
        try {

            $query = $this->pdo->prepare("INSERT INTO users (pseudo, email, password) VALUES (:pseudo, :email, :password)");
            $query->bindValue(':pseudo', $user['pseudo'], PDO::PARAM_STR);
            $query->bindValue(':email', $user['email'], PDO::PARAM_STR);
            $query->bindValue(':password', $user['password'], PDO::PARAM_STR);
            $query->execute();
        } catch (PDOException $e) {
            throw new Error($e->getMessage());
        }
   
    }

    // POST : /login : Connecte un user
    //--------------------------------------------------------
    
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