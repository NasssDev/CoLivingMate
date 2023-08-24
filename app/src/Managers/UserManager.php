<?php

namespace App\Managers;

use App\Entities\User;
use App\Factories\PDOFactory;
use App\Interfaces\Database;
use Exception;

class UserManager extends BaseManager
{
    /**
     * @param string $username
     * @param string $pwd
     * @param string $firstname
     * @param string $lastname
     * @param string $email
     * @param string|null $birthdate
     * @return int
     * @throws Exception
     */
    public function creatUser(string $username, string $pwd, string $firstname, string $lastname, string $email, ?string $birthdate): int
    {
        try {
            $query = $this->pdo->prepare("INSERT INTO roommate (username, pwd, lastname, firstname, email, birthdate) VALUES (:username, :pwd, :lastname, :firstname, :email, :birthdate) ");
            $query->bindValue('firstname', $firstname, \PDO::PARAM_STR);
            $query->bindValue('lastname', $lastname, \PDO::PARAM_STR);
            $query->bindValue('username', $username, \PDO::PARAM_STR);
            $query->bindValue('email', $email, \PDO::PARAM_STR);
            $query->bindValue('pwd', $pwd, \PDO::PARAM_STR);
            $query->bindValue('birthdate', $birthdate, \PDO::PARAM_STR);

            $query->execute();

            return $this->pdo->lastInsertId();
        } catch (Exception $e) {
            throw new Exception('ERREUR :'.$e->getMessage());
        }
    }

    public function readUser(string $username): User|Exception|bool
    {
        try {
            $query = $this->pdo->prepare("SELECT * FROM roommate WHERE username = :username");
            $query->bindValue('username', $username, \PDO::PARAM_STR);
            $query->execute();

            $data = $query->fetch(\PDO::FETCH_ASSOC);

            return ($data) ? new User($data) : $data;

        } catch (Exception $e) {
            return $e;
        }
    }

    public function readUserEmail(string $email): User|Exception
    {
        try {
            $query = $this->pdo->prepare("SELECT * FROM roommate WHERE email = :email");
            $query->bindValue('email', $email, \PDO::PARAM_STR);
            $query->execute();

            $data = $query->fetch(\PDO::FETCH_ASSOC);

            return (is_array($data)) ? new User($data) : throw new Exception();

        } catch (Exception $e) {
            return $e;
        }
    }

    public function readUserById(int $id): User|Exception
    {
        try {
            $query = $this->pdo->prepare("SELECT * FROM roommate WHERE id = :id");
            $query->bindValue('id', $id, \PDO::PARAM_INT);
            $query->execute();

            $data = $query->fetch(\PDO::FETCH_ASSOC);

            return (is_array($data)) ? new User($data) : throw new Exception();

        } catch (Exception $e) {
            return $e;
        }
    }

    public function readUserReturn(string $username)
    {
        try {
            $query = $this->pdo->prepare("SELECT * FROM roommate WHERE username = :username");
            $query->bindValue('username', $username, \PDO::PARAM_STR);
            $query->execute();

            $data = $query->fetch(\PDO::FETCH_ASSOC);

            return $data;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function readUserByIdReturn(int $id_roommate)
    {
        try {
            $query = $this->pdo->prepare("SELECT * FROM roommate WHERE id = :id_roommate");
            $query->bindValue('id_roommate', $id_roommate, \PDO::PARAM_INT);
            $query->execute();

            $data = $query->fetch(\PDO::FETCH_ASSOC);

            return $data;
        } catch (Exception $e) {
            return $e;
        }
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

    /**
     * @param int $id_roommate
     * @param string $username
     * @param string $lastname
     * @param string $firstname
     * @param string $email
     * @param string $birthdate
     * @return void
     * @throws Exception
     */
    public function updateUser(int $id_roommate, string $username, string $lastname, string $firstname, string $email, string $birthdate): void
    {
        try {
            $query = $this->pdo->prepare("UPDATE roommate  SET username=:username, lastname=:lastname, firstname=:firstname, email=:email, birthdate=:birthdate WHERE id = :id");
            $query->bindValue('username', $username, \PDO::PARAM_STR);
            $query->bindValue('lastname', $lastname, \PDO::PARAM_STR);
            $query->bindValue('firstname', $firstname, \PDO::PARAM_STR);
            $query->bindValue('email', $email, \PDO::PARAM_STR);
            $query->bindValue('birthdate', $birthdate, \PDO::PARAM_STR);
            $query->bindValue('id', $id_roommate, \PDO::PARAM_INT);

            $query->execute();
        }catch(Exception $e){
            throw new Exception("Erreur : ".$e->getMessage());
        }
    }

    /**
     * @param string $id_roommate
     * @param string $pwd
     * @return void
     * @throws Exception
     */
    public function updatePwd(string $id_roommate, string $pwd): void
    {
        try {
            $query = $this->pdo->prepare("UPDATE roommate  SET pwd=:pwd WHERE id = :id_roommate");
            $query->bindValue('id_roommate', $id_roommate, \PDO::PARAM_INT);
            $query->bindValue('pwd', $pwd, \PDO::PARAM_STR);

            $query->execute();
        }catch (Exception $e){
            throw new Exception("Erreur : ".$e->getMessage());
        }
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

    public function countUser($flat_share_id)
    {
        $queryCountUser = $this->pdo->prepare('SELECT COUNT(*)  FROM roomate_has_flat_share WHERE flat_share_id=:actual_flat_share_id');
        $queryCountUser->bindValue('actual_flat_share_id', $flat_share_id, \PDO::PARAM_INT);
        $queryCountUser->execute();
        $data = $queryCountUser->fetch();
        return $data[0];
    }

}
