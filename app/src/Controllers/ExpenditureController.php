<?php

namespace App\Controllers;

use App\Entities\User;
use App\Managers\FlatshareManager;
use App\Managers\UserManager;
use App\Traits\Notif;
use App\Factories\PDOFactory;
use App\Managers\ExpenditureManager;
use App\Routes\Route;


class ExpenditureController extends AbstractController
{
    #[Route('/create_expenditure', name: "create-expenditure", methods: ["POST", "GET"])]
    public function create_expenditure()
    {
        $id_creator = intval($_REQUEST['id_creator']);
        $expenditureName = $_REQUEST['expenditure_name'];
        $amount = floatval($_REQUEST['amount']);
        $id_flatshare = $_REQUEST['id_flatshare'];
        // $uniqId = uniqid('', true);

        $expenditureManager = new ExpenditureManager(new PDOFactory());

        $userManager = new UserManager(new PDOFactory());

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("An error occurred, check that the roommate is still active or existing !", 401, "An error occurred, check that the roommate is still active or existing !");
            die;
        }

        $countUser = $expenditureManager->countUser($id_flatshare);
        $queryUser = $expenditureManager->userFlatShare($id_flatshare);
        if ($countUser > 0) {
            $amount = $amount / $countUser;
        } else {
            $amount = 0;
        }
        $amount = floatval(number_format($amount, 2, '.', ''));

        $result = $userManager->readUserById($id_creator);

        if ($result instanceof \Exception) {
            $this->renderJson("An error occurred, verify that the account is still active or existing !", 401, "An error occurred, verify that the account is still active or existing !");
            die;
        }

        if ($expenditureName && $id_flatshare && $amount && $id_creator && $queryUser) {
            $expenditureManager->createExpenditure($expenditureName, $id_flatshare, $amount, $id_creator, $queryUser);
        }

        $this->renderJson("",200,"Expenditure created successfully !");
    }

    #[Route('/update_payed', name: "payed-expenditure", methods: ["POST", "GET"])]
    public function update_payed()
    {
        $userId = $_REQUEST['user_id'];
        $expenditureId = $_REQUEST['expenditureId'];
        $expenditureManageUpdate = new ExpenditureManager(new PDOFactory());

        $expenditureManageUpdate->updatePayed($userId, $expenditureId);
    }

    #[Route('/get_user_expenditure', name: "get-expenditure", methods: ["POST", "GET"])]
    public function getUserExpenditure()
    {
        $userId = $_REQUEST['user_id'];
        $id_flatshare = $_REQUEST['id_flatshare'];

        // $getMonthFeeDate=$expenditureManageGet->UserExpenditure($id_flatshare);

        $expenditureManageGet = new ExpenditureManager(new PDOFactory());
        $data = $expenditureManageGet->UserExpenditure($userId, $id_flatshare);
        $this->renderJson($data);
    }

    #[Route('/delete_expenditure', name: "delete-expenditure", methods: ["POST", "GET"])]
    public function deleteExpenditure()
    {
        $expenditureId = intval($_REQUEST['expenditure_id']);
        $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

        $expenditureManagerDelete->deleteExpenditure($expenditureId);

        $this->renderJson("",200,"Expenditure deleted successfully !");
    }

    #[Route('/create_month_fee', name: "create-month", methods: ["POST", "GET"])]
    public function createMonthFee()
    {
        $fee_name = $_REQUEST['fee_name'];
        $id_flatshare = intval($_REQUEST['id_flatshare']);
        $feeAmount = intval($_REQUEST['fee_amount']);
        $date = intval($_REQUEST['fee_date']);

        $expenditureManagerCreate = new ExpenditureManager(new PDOFactory());

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Une erreur est survenue lors de la récupération de la colocation, vérifiez que la collocation est toujours existante !", 401);
            die;
        }

        if ($fee_name && $id_flatshare && $feeAmount && $date) {
            $expenditureManagerCreate->createMonthFee($fee_name, $id_flatshare, $feeAmount, $date);
        }

        $this->renderJson("", 200, "Monthly fee created successfully !");
    }

    #[Route('/delete_month_fee', name: "delete-month", methods: ["POST", "GET"])]
    public function deleteMonthFee()
    {
        $monthFeedId = intval($_REQUEST['id']);

        $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

        if ($monthFeedId > 0) $expenditureManagerDelete->deleteMonthFee($monthFeedId);

        $this->renderJson("", 200, "Monthly fee deleted successfully !");
    }

    #[Route('/get_month_fee', name: "get-month", methods: ["POST", "GET"])]
    public function getMonthFee()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];

        $expenditureManagerGetMonth = new ExpenditureManager(new PDOFactory());

        $result = $expenditureManagerGetMonth->getMonthFee($id_flatshare);
        $this->renderJson($result);
    }
}
