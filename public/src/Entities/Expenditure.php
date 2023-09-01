<?php

namespace App\Entities;

use DateTime;
use PDO;

class Expenditure extends BaseEntity
{
  private int $id;
  private int $roommateId;
  private int $flatShareId;
  private string $expenditureName;
  private int $amount;
  private \DateTime $creation_date;
  private bool $payed;
}
