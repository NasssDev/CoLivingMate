<?php

namespace App\Managers;

use App\Entities\Expenditure;
use App\Factories\PDOFactory;
use App\Interfaces\Database;

class ExpenditureManager extends BaseManager
{
    public function createExpenditure(string $expenditureName, int $flat_share_id, float $amount, ?int $id_creator, $queryUser)
    {
        try {
            $uniqId = uniqid('', true);
            while ($data = $queryUser->fetch(\PDO::FETCH_ASSOC)) {
                if ($data['roommate_id'] == $id_creator) {
                    $payed = 1;
                } else {
                    $payed = 0;
                }
                $query = $this->pdo->prepare('INSERT INTO expenditure ( expenditure_name ,flat_share_id , roommate_id, amount,payed,uniqId) VALUES (:expenditureName, :flat_share_id, :roommate_id, :amount,:payed,:uniqId)');
                $query->bindValue('expenditureName', $expenditureName, \PDO::PARAM_STR);
                $query->bindValue('flat_share_id', $flat_share_id, \PDO::PARAM_INT);
                $query->bindValue('roommate_id', $data['roommate_id'], \PDO::PARAM_INT);
                $query->bindValue('amount', ($amount), \PDO::PARAM_STR);
                $query->bindValue('payed', $payed, \PDO::PARAM_BOOL);
                $query->bindValue('uniqId', ($uniqId), \PDO::PARAM_STR);
                $query->execute();
            }

        } catch (\Exception $e) {
            return $e;
        }
    }

    public function countUser($flat_share_id)
    {
        $queryCountUser = $this->pdo->prepare('SELECT COUNT(*)  FROM roomate_has_flat_share WHERE flat_share_id=:actual_flat_share_id');
        $queryCountUser->bindValue('actual_flat_share_id', $flat_share_id, \PDO::PARAM_INT);
        $queryCountUser->execute();
        $data = $queryCountUser->fetch();
        return $data[0];
    }

    public function userFlatShare($flat_share_id)
    {
        $queryUser = $this->pdo->prepare('SELECT  roommate_id FROM roomate_has_flat_share WHERE flat_share_id=:actual_flat_share_id');
        $queryUser->bindValue('actual_flat_share_id', $flat_share_id, \PDO::PARAM_INT);
        $queryUser->execute();
//    var_dump($queryUser);die;
        return $queryUser;
    }

    public function updatePayed(int $userId, int $expenditureId)
    {
        $queryPayed = $this->pdo->prepare('UPDATE expenditure SET payed="1" WHERE id =:expenditureId AND roommate_id =:userId');
        $queryPayed->bindValue('expenditureId', $expenditureId, \PDO::PARAM_INT);
        $queryPayed->bindValue('userId', $userId, \PDO::PARAM_INT);
        $queryPayed->execute();
    }

    public function UserExpenditure(int $userId, int $flat_share_id)
    {
        $queryUserExpenditure = $this->pdo->prepare('SELECT * FROM expenditure WHERE flat_share_id =:flatShareId AND roommate_id =:userId');
        $queryUserExpenditure->bindValue('flatShareId', $flat_share_id, \PDO::PARAM_INT);
        $queryUserExpenditure->bindValue('userId', $userId, \PDO::PARAM_INT);
        $queryUserExpenditure->execute();
        $data = $queryUserExpenditure->fetchAll(\PDO::FETCH_ASSOC);
        return $data;
    }

    public function deleteExpenditure(int $expenditureId)
    {
        $data = $this->selectExpenditure($expenditureId);
//      var_dump($data);die;
        $querydeleteExpenditure = $this->pdo->prepare('DELETE FROM expenditure WHERE uniqId =:uniqId ');
        $querydeleteExpenditure->bindValue('uniqId', $data['uniqId'], \PDO::PARAM_STR);
        $querydeleteExpenditure->execute();
    }

    public function selectExpenditure(int $expenditureId)
    {
        try {
            $queryFindAllExpenditure = $this->pdo->prepare('SELECT uniqId FROM expenditure WHERE id =:expenditureId ');
            $queryFindAllExpenditure->bindValue('expenditureId', $expenditureId, \PDO::PARAM_INT);
            $queryFindAllExpenditure->execute();

            $data = $queryFindAllExpenditure->fetch(\PDO::FETCH_ASSOC);

            return $data;
        } catch (\Exception $e) {
            return $e;
        }
    }


    public function createMonthFee(string $feeName, int $flat_share_id, int $feeAmount, int $date)
    {
        $query = $this->pdo->prepare('INSERT INTO monthly_fee ( flat_share_id ,fee_amount,fee_name,date) VALUES (:flat_share_id, :fee_amount, :fee_name, :date)');
        $query->bindValue('fee_name', $feeName, \PDO::PARAM_STR);
        $query->bindValue('flat_share_id', $flat_share_id, \PDO::PARAM_INT);
        $query->bindValue('fee_amount', ($feeAmount), \PDO::PARAM_INT);
        $query->bindValue('date', $date, \PDO::PARAM_INT);
        $query->execute();
    }

    public function deleteMonthFee(int $monthFeeId)
    {
        $querydeleteMonthFee = $this->pdo->prepare('DELETE  FROM monthly_fee WHERE id =:id ');
        $querydeleteMonthFee->bindValue('id', $monthFeeId, \PDO::PARAM_INT);

        $querydeleteMonthFee->execute();
    }

    public function getMonthFee(int $flat_share_id)
    {
        $query = $this->pdo->prepare('SELECT * FROM monthly_fee WHERE flat_share_id =:flat_share_id ');
        $query->bindValue('flat_share_id', $flat_share_id, \PDO::PARAM_INT);
        $query->execute();

        $monthlyfees = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $monthlyfees[] = $data;
        }

        return $monthlyfees;

    }
    // public function createExpenditureMonth(string $expenditureName, int $flat_share_id, int $amount, string $creation_date, int $id_creator, $queryUser)
    // {
    //   $uniqId = uniqid('', true);
    //   while ($data = $queryUser->fetch(\PDO::FETCH_ASSOC)) {
    //     $query = $this->pdo->prepare('INSERT INTO expenditure ( expenditure_name ,flat_share_id , roommate_id, amount, creation_date,uniqId) VALUES (:expenditureName, :flat_share_id, :roommate_id, :amount,:creation_date,:uniqId)');
    //     $query->bindValue('expenditureName', $expenditureName, \PDO::PARAM_STR);
    //     $query->bindValue('flat_share_id', $flat_share_id, \PDO::PARAM_INT);
    //     $query->bindValue('roommate_id', $data['roommate_id'], \PDO::PARAM_INT);
    //     $query->bindValue('amount', ($amount), \PDO::PARAM_INT);
    //     $query->bindValue('creation_date', $creation_date, \PDO::PARAM_STR);

    //     $query->bindValue('uniqId', ($uniqId), \PDO::PARAM_STR);
    //     $query->execute();
    //   }
    // }

}
