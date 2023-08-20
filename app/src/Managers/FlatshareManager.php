<?php

namespace App\Managers;

use App\Entities\FlatShare;
use PDOException;

class FlatshareManager extends BaseManager
{
    /**
     * @param $id_creator
     * @param $name
     * @param $address
     * @param $start_date
     * @param $end_date
     * @return int|\Exception
     *
     * @comment Cette fonction appel 2 fonctions
     *  1- la première permet d'insérer des données dans la table 'Flatshare'
     *  2- la deuxième s'occupe d'insérer des données dans la table de jointure/associative ( n to n )
     *  En cas d'erreur dans une des deux requête on rollback
     */
    public function createFlatshare(int $id_creator, string $name, string $address, string $start_date, string $end_date, string $city, string $zip_code): int|\Exception
    {
        $this->pdo->query('START TRANSACTION');

        $res_flatshare = $this->insertFlatshare($name, $address, $start_date, $end_date, $city, $zip_code);
        $res_roommate_has = $this->insertRoomateHasFlatshare($res_flatshare, $id_creator);

        if ($res_flatshare instanceof \Exception || $res_roommate_has instanceof \Exception) {

            // Fail case //
            $this->pdo->query('ROLLBACK');
            return ($res_flatshare instanceof \Exception) ? $res_flatshare : $res_roommate_has;

        } else {

            // success case //
            $this->pdo->query('COMMIT');

            return $res_flatshare;
        }
    }

    /**
     * @param string $name
     * @param string $address
     * @param string $start_date
     * @param string $end_date
     * @return int|\Exception
     */
    public function insertFlatshare(string $name, string $address, string $start_date, string $end_date, string $city, string $zip_code): int|\Exception
    {
        try {
            $query = $this->pdo->prepare('INSERT INTO flat_share ( name , address, start_date, end_date, city, zip_code) VALUES (:name, :address, :start_date, :end_date, :city, :zip_code)');
            $query->bindValue('name', $name, \PDO::PARAM_STR);
            $query->bindValue('address', $address, \PDO::PARAM_STR);
            $query->bindValue('city', $city, \PDO::PARAM_STR);
            $query->bindValue('zip_code', $zip_code, \PDO::PARAM_STR);
            $query->bindValue('start_date', $start_date);
            $query->bindValue('end_date', $end_date);


            $query->execute();
            return $this->pdo->lastInsertId();
        } catch (\Exception $e) {

            return $e;
        }
    }

    /**
     * @param int $id
     * @return FlatShare|\Exception
     */
    public function selectOneFlatshare(int $id): FlatShare|\Exception
    {
        try {
            $query = $this->pdo->prepare('SELECT * FROM flat_share WHERE id = :id');
            $query->bindValue('id', $id, \PDO::PARAM_INT);
            $query->execute();

            $data = $query->fetch(\PDO::FETCH_ASSOC);

            return ($data) ? new FlatShare($data) : throw new \Exception();
        } catch (\Exception $e) {
            return $e;
        }
    }

    /**
     * @param int $id
     * @return array|\Exception
     */
    public function selectOneFlatshareToReturn(int $id): array|\Exception
    {
        try {
            $query = $this->pdo->prepare('SELECT * FROM flat_share WHERE id = :id');
            $query->bindValue('id', $id, \PDO::PARAM_INT);
            $query->execute();
            $data = $query->fetch(\PDO::FETCH_ASSOC);
            return $data;
        } catch (\Exception $e) {
            return $e;
        }
    }

    /**
     * @return array
     */
    public function selectAllFlatshare(): array|\Exception
    {
        try {
            $query = $this->pdo->query('SELECT * FROM flat_share WHERE 1');

            $data = $query->fetchAll(\PDO::FETCH_ASSOC);
            // $data[] = new FlatShare($data);
            return $data;
        } catch (\Exception $e) {
            return $e;
        }
    }


    /**
     * @param int $id
     * @return ?\Exception
     */
    public function deleteFlatshare(int $id): ?\Exception
    {
        try {
            $query = $this->pdo->prepare('DELETE FROM flat_share WHERE id=:id');
            $query->bindValue('id', $id, \PDO::PARAM_INT);
            $query->execute();
        } catch (\Exception $e) {
            return $e;
        }
        return null;
    }

    /**
     * @param int $id
     * @param string $name
     * @param string $address
     * @param $start_date
     * @param $end_date
     * @return int|\Exception
     */
    public function updateFlatshare(int $id, string $name, string $address, $start_date, $end_date, string $city, string $zip_code): int|\Exception
    {
        try {
            $query = $this->pdo->prepare('UPDATE flat_share SET name=:name, address=:address, start_date=:strat_date, end_date=:end_date WHERE id = :id');
            $query->bindValue('id', $id, \PDO::PARAM_INT);
            $query->bindValue('name', $name, \PDO::PARAM_STR);
            $query->bindValue('address', $address, \PDO::PARAM_STR);
            $query->bindValue('city', $city, \PDO::PARAM_STR);
            $query->bindValue('zip_code', $zip_code, \PDO::PARAM_STR);
            $query->bindValue('start_date', $start_date);
            $query->bindValue('end_date', $end_date);

            $query->execute();

            return $id;
        } catch (\Exception $e) {
            return $e;
        }
    }


    /**
     * @param int $user_id
     * @param int $flatshare_id
     * @return int|\Exception
     */
    public function insertRoomateHasFlatshare(int $flatshare_id, int $user_id, int $role = 1): int|\Exception
    {
        try {
            $query = $this->pdo->prepare('INSERT INTO roomate_has_flat_share ( roommate_id , flat_share_id, role) VALUES (:roommate_id, :flat_share_id, :role)');
            $query->bindValue('roommate_id', $user_id, \PDO::PARAM_INT);
            $query->bindValue('flat_share_id', $flatshare_id, \PDO::PARAM_INT);
            $query->bindValue('role', $role, \PDO::PARAM_INT);

            $query->execute();

            return $this->pdo->lastInsertId();
        } catch (\Exception $e) {

            return $e;
        }
    }

    public function deleteRoomateHasFlatshare(int $flatshare_id, int $roommate_id): ?\Exception
    {
        try {
            $query = $this->pdo->prepare('DELETE FROM roomate_has_flat_share WHERE roommate_id=:roommate_id AND flat_share_id=:flat_share_id');
            $query->bindValue('roommate_id', $roommate_id, \PDO::PARAM_INT);
            $query->bindValue('flat_share_id', $flatshare_id, \PDO::PARAM_INT);
            $query->execute();
        } catch (\Exception $e) {
            return $e;
        }
        return null;
    }

    public function selectInfos(int $flatshare_id): array|\Exception
    {
        try {
            $query = $this->pdo->prepare("SELECT
    fs.id AS flat_share_id,
    fs.name AS flat_share_name,
    fs.address AS flat_share_address,
    fs.city AS flat_share_city,
    fs.zip_code AS flat_share_zip_code,
    fs.start_date AS flat_share_start_date,
    fs.end_date AS flat_share_end_date,
    rmf.roommate_id AS roommate_id,
    rmf.flat_share_id AS roommate_flat_share_id,
    rmf.role AS roommate_role,
    rmf.rent_pro_rata AS roommate_rent_pro_rata,
    rmf.entry_date AS roommate_entry_date,
    rmf.exit_date AS roommate_exit_date,
    rm.username AS roommate_username,
    rm.pwd AS roommate_pwd,
    rm.lastname AS roommate_lastname,
    rm.firstname AS roommate_firstname,
    rm.email AS roommate_email,
    rm.birthdate AS roommate_birthdate,
    rm.joindate AS roommate_joindate,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'expenditure_id', exp.id,
                'expenditure_name', exp.expenditure_name,
                'expenditure_amount', exp.amount,
                'expenditure_creation_date', exp.creation_date,
                'expenditure_payed', exp.payed,
                'expenditure_uniqId', exp.uniqId
            )
        )
        FROM expenditure exp
        WHERE fs.id = exp.flat_share_id AND rm.id = exp.roommate_id
    ) AS expenditures,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'fee_id', fee.id,
                'fee_amount', fee.fee_amount,
                'fee_name', fee.fee_name,
                'fee_date', fee.date
            )
        )
        FROM monthly_fee fee
        WHERE fs.id = fee.flat_share_id
    ) AS monthly_fees
FROM flat_share fs
JOIN roomate_has_flat_share rmf ON fs.id = rmf.flat_share_id
JOIN roommate rm ON rmf.roommate_id = rm.id
LEFT JOIN expenditure exp ON fs.id = exp.flat_share_id AND rm.id = exp.roommate_id
LEFT JOIN monthly_fee fee ON fs.id = fee.flat_share_id
WHERE fs.id = :id
GROUP BY fs.id, rmf.roommate_id;
");

            $query->bindValue('id', $flatshare_id, \PDO::PARAM_INT);
            $query->execute();

            $data = $query->fetchAll(\PDO::FETCH_ASSOC);

            return $data;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectAllRoommate(int $flatshare_id): array|\Exception
    {
        try {
            $query = $this->pdo->prepare("SELECT roommate.* FROM roommate
                INNER JOIN roomate_has_flat_share ON roommate.id = roomate_has_flat_share.roommate_id
                INNER JOIN flat_share ON flat_share.id = roomate_has_flat_share.flat_share_id
                WHERE flat_share.id = :id");
            $query->bindValue('id', $flatshare_id, \PDO::PARAM_INT);
            $query->execute();

            $data = $query->fetchAll(\PDO::FETCH_ASSOC);

            return $data;
        } catch (\Exception $e) {
            return $e;
        }

    }

    public function selectRoommateFlatshares(int $roommate_id): array|\Exception
    {
        try {
            $query = $this->pdo->prepare("SELECT flat_share.*
            FROM flat_share
            INNER JOIN roomate_has_flat_share ON flat_share.id = roomate_has_flat_share.flat_share_id
            WHERE roomate_has_flat_share.roommate_id = :roommate_id");
            $query->bindValue('roommate_id', $roommate_id, \PDO::PARAM_INT);
            $query->execute();

            $data = $query->fetchAll(\PDO::FETCH_ASSOC);

            return $data;
        } catch (\Exception $e) {
            return $e;
        }

    }
}
