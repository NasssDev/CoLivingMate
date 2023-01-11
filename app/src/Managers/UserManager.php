<?php

namespace App\Managers;

use App\Entitys\User;
use App\Factorys\PDOFactory;
use App\Interfaces\Database;

class UserManager extends BaseManager
{
    public function creatUser( string $username, string $pwd, string $firstname, string $lastname, string $email, string $birthdate): void
    {
        $query = $this->pdo->prepare("INSERT INTO roommate (username, pwd, nom, prenom, mail, date_naissance) VALUES (:username, :pwd, :lastname, firstname, email, birthdate) ");
        $query->bindValue('firstname', $firstname, \PDO::PARAM_STR);
        $query->bindValue('lastname', $lastname, \PDO::PARAM_STR);
        $query->bindValue('username', $username, \PDO::PARAM_STR);
        $query->bindValue('email', $email, \PDO::PARAM_STR);
        $query->bindValue('pwd', $pwd, \PDO::PARAM_STR);
        $query->bindValue('birthdate', $birthdate, \PDO::PARAM_STR);

        $query->execute();      
    }

    public function readUser(string $username)
    {
        $query = $this->pdo->prepare("SELECT * FROM roommate WHERE username = :username");
        $query->bindValue('username', $username, \PDO::PARAM_STR);
        $query->execute(); 

        $users = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = new User($data);
        }
        return $users;
    }

    public function readAllUser(): array
    {
        $query = $this->pdo->query("SELECT * FROM roommate");

        $users = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = new User($data);
        }
        return $users;
    }

    public function updateRol(string $username, string $rol): void
    {
        $query = $this->pdo->prepare("UPDATE roommate  SET rol=:rol WHERE username = :username");
        $query->bindValue('username', $username, \PDO::PARAM_STR);
        $query->bindValue('rol', $rol, \PDO::PARAM_STR);

        $query->execute();      
    }

    public function updatePwd(string $username, string $pwd): void
    {
        $query = $this->pdo->prepare("UPDATE roommate  SET pwd=:pwd WHERE username = :username");
        $query->bindValue('username', $username, \PDO::PARAM_STR);
        $query->bindValue('pwd', $pwd, \PDO::PARAM_STR);

        $query->execute();      
    }


    public function deleteUser(string $username): void
    {
        $query = $this->pdo->prepare("DELETE FROM roommate WHERE username=:username ");
        $query->bindValue('username', $username, \PDO::PARAM_STR);
        $query->execute();     
        // $query2 = $this->pdo->prepare("DELETE FROM article WHERE author=:username ");
        // $query2->bindValue('username', $username, \PDO::PARAM_STR);
        // $query2->execute(); 
        // $query3 = $this->pdo->prepare("DELETE FROM comment WHERE author=:username ");
        // $query3->bindValue('username', $username, \PDO::PARAM_STR);
        // $query3->execute();   
    }
    
}