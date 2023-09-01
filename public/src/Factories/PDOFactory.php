<?php

namespace App\Factories;

use App\Interfaces\Database;

class PDOFactory implements Database
{
    private string $host;
    private string $dbName;
    private string $userName;
    private string $password;

    public function __construct(string $host = "b3krsqonxeyllcoo0dpz-mysql.services.clever-cloud.com", string $dbName = "b3krsqonxeyllcoo0dpz", string $userName = "upuaunwfpsgkjf7r", string $password = "tCAsxVaKGXkOnJeDURUr")
    {
        $this->host = $host;
        $this->dbName = $dbName;
        $this->userName = $userName;
        $this->password = $password;
    }

    public function getMySqlPDO(): \PDO
    {
        return new \PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbName, $this->userName, $this->password);
    }
}
