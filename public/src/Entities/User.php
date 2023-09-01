<?php

namespace App\Entities;

use App\Interfaces\PasswordProtectedInterface;
use App\Interfaces\UserInterface;

class User extends BaseEntity
{
    private int $id;
    private string $username;
    private string $pwd;
    private $joindate;
    private string $lastname;
    private string $firstname;
    private string $email;
    private ?string $birthdate;

    //setters
    public function setUsername(string $username): User
    {
        $this->username = $username;
        return $this;
    }

    public function setId(string $id): User
    {
        $this->id = $id;
        return $this;
    }

    public function setPwd(string $pwd): User
    {
        $this->pwd = $pwd;
        return $this;
    }

    public function setJoindate(string $joindate): User
    {
        $this->joindate = $joindate;
        return $this;
    }

    public function setEmail(string $email): User
    {
        $this->email = $email;
        return $this;
    }

    public function setLastname(string $lastname): User
    {
        $this->lastname = $lastname;
        return $this;
    }

    public function setFirstname(string $firstname): User
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function setBirthdate(?string $birthdate): User
    {
        $this->birthdate = $birthdate;
        return $this;
    }

    //getters
    public function getId(): int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getHashedPassword(): string
    {
        //return $this->pwd;
    }

    public function getJoindate()
    {
        return $this->joindate;
    }

    public function getPwd(): string
    {
        return $this->pwd;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function getBirthdate()
    {
        return $this->birthdate;
    }

    public function getUserInfo()
    {
        $object = new User();
        $object->username = $this->username;
        $object->username = $this->lastname;
        $object->username = $this->firstname;
        
        return $object;

    }

    //midelwares
    public function passwordMatch(string $pwd_hash): bool
    { 
        if (password_verify($pwd, getPwd())){
            return true;
        }
        else{
            return false;
        }
    }

}
?>