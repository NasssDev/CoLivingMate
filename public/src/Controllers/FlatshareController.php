<?php

namespace App\Controllers;

use App\Factories\PDOFactory;
use App\Managers\FlatshareManager;
use App\Managers\ExpenditureManager;
use App\Managers\UserManager;
use App\Routes\Route;


class FlatshareController extends AbstractController
{
    #[Route('/create_flatshare', name: "create", methods: ["POST"])]
    public function create()
    {
        $id_creator = $_REQUEST['id_creator'];
        $name = $_REQUEST['name'];
        $address = $_REQUEST['address'];
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        $city = $_REQUEST['city'];
        $zip_code = $_REQUEST['zip_code'];
        //$image = $_FILES['image'];

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUserById($id_creator);

        if ($result instanceof \Exception) {
            $this->renderJson('A problem occurred during the creation, problem with the account creating the collocation, please try again !', 401,'A problem occurred during the creation, problem with the account creating the collocation, please try again !');
            die;
        }

        $flatshareManager = new FlatshareManager(new PDOFactory());

        if ($id_creator && $name && $address && $start_date && $city && $zip_code){
            $result = $flatshareManager->createFlatshare($id_creator, $name, $address, $start_date, $end_date, $city, $zip_code);
        }else{
            $this->renderJson('An error occurred during creation, make sure that "name", "Address", "Start Date", "City" and "Zip Code" are correctly filled !', 401,'An error occurred during creation, make sure that "name", "Address", "Start Date", "City" and "Zip Code" are correctly filled !');
            die;
        }

        if ($result instanceof \Exception) {
            $this->renderJson('A problem occurred while creating, please try again !', 401,'A problem occurred while creating, please try again !');
            die;
        }

        $lastInsertFlatshare = $flatshareManager->selectOneFlatshareToReturn($result);

        if ($lastInsertFlatshare instanceof \Exception) {
            $this->renderJson('Created successfully, but unable to retrieve data !', 555,'Created successfully, but unable to retrieve data !');
            die;
        }

        // all success //
        $this->renderJson($lastInsertFlatshare);
    }

    #[Route('/delete_flatshare', name: "delete", methods: ["POST"])]
    public function deleteFlatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la suppresion, vérifiez que la collocation existe toujours !", 501);
            die;
        }

        $nameFlatshare = $result->getName();

        $result = $flatshareManager->deleteFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Impossible d'effectuer la suppresion, veuillez réessayer !", 501);
            die;
        }

        $this->renderJson("La collocation $nameFlatshare a été supprimée avec succès !");
    }

    #[Route('/update_flatshare', name: "update", methods: ["POST"])]
    public function update_flatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];
        $name = $_REQUEST['name'];
        $address = $_REQUEST['address'];
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        $city = $_REQUEST['city'];
        $zip_code = $_REQUEST['zip_code'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la modification, vérifiez que la collocation est toujours existante !", 501);
            die;
        }

        $nameFlatshare = $result->getName();

        $result = $flatshareManager->updateFlatshare($id_flatshare, $name, $address, $start_date, $end_date, $city, $zip_code);

        if ($result instanceof \Exception) {
            $this->renderJson("Impossible d'effectuer la modification, veuillez réessayer !", 501);
            die;
        }

        $this->renderJson("La collocation $nameFlatshare a été modifiée avec succès !");
    }

    #[Route('/select_infos', name: "selectinfos", methods: ["GET", "POST"])]
    public function selectInfos()
    {
        $id_flatshare = intval($_REQUEST['id_flatshare']);


        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Impossible de récupérer les infos liées à la collocation, vérifier que la collocation est toujour existante !", 501);
            die;
        }

        $nameFlatshare = $result->getName();

        $data = $flatshareManager->selectInfos($id_flatshare);

        if ($data instanceof \Exception) {
            $this->renderJson("Impossible de récupérer les infos liées à la collocation $nameFlatshare, veuillez réessayer !", 501);
            die;
        }
//        $expenditureManager = new ExpenditureManager(new PDOFactory());
//        $getMonthFee = $expenditureManager->getMonthFee($id_flatshare);
//
////         var_dump($getMonthFee);die;
//
//        if ($getMonthFee && $getMonthFee['date'] == date('d')) {
//            $expenditureName = $getMonthFee['fee_name'];
//            $expenditureAmount = $getMonthFee['fee_amount'];
//            $countUser = $expenditureManager->countUser($id_flatshare);
//            $queryUser = $expenditureManager->userFlatShare($id_flatshare);
//
//            $expenditureAmount = $expenditureAmount / $countUser;
//            $expenditureAmount = floatval(number_format($expenditureAmount, 2, '.', ''));
//            $expenditureManager->createExpenditure($expenditureName, $id_flatshare, $expenditureAmount, null, $queryUser);
//        }
        $this->renderJson($data);
    }

    #[Route('/select_all', name: "selectall", methods: ["GET"])]
    public function select()
    {
        $flatshareManager = new FlatshareManager(new PDOFactory());

        $data = $flatshareManager->selectAllFlatshare();

        if ($data instanceof \Exception) {
            $this->renderJson("Impossible d'effectuer la sélection, veuillez réessayer !", 501);
            die;
        }

        $this->renderJson($data);
    }

    #[Route('/add_roommate', name: "addRoommate", methods: ["POST", "GET"])]
    public function addRoommate()
    {
        $email_new_roommate = $_REQUEST['new_roommate'];
        $id_flatshare = $_REQUEST['id_flatshare'];
        $role = $_REQUEST['role'] ?? 0;

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUserEmail($email_new_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("We are unable to add the roommate, check that the roommate's account is still existing or active !", 401);
            die;
        }

        $id_new_roommate = $result->getId();

        $roommateName = $result->getUsername();

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("We are unable to add the roommate, check that the flat share is still existing or active !", 401);
            die;
        }

        $flatshareName = $result->getName();

        $result = $flatshareManager->insertRoomateHasFlatshare($id_flatshare, $id_new_roommate, $role);

        if ($result instanceof \Exception) {
            $this->renderJson("A problem occurred while adding the new roommate, check that he is not already part of the roommate, if not, please try again!", 401);
            die;
        }

        // all success //
        $this->renderJson("Roommate $roommateName added successfully in flat share : $flatshareName !");
    }

    #[Route('/kick_roommate', name: "kickRoommate", methods: ["POST", "GET"])]
    public function deleteRoomateFromFlatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];
        $email_roommate = $_REQUEST['email_roommate'];

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUserEmail($email_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la suppression vérifiez que le collocataire est toujours dans la collocation ou/et que son compte est toujours existant !", 401);
            die;
        }

        $id_roommate = $result->getId();
        $roommateName = $result->getUsername();

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la suppression vérifiez que la collocation est toujours existante !", 401);
            die;
        }

        $flatshareName = $result->getName();

        $result = $flatshareManager->deleteRoomateHasFlatshare($id_flatshare, $id_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("Un problème est survenu lors de la suppression, vérifiez que le collocataire fait toujours parti de la collocation !", 401);
            die;
        }

        $flatshare_infos = $flatshareManager->selectInfos($id_flatshare);

        // all success //
        $this->renderJson($flatshare_infos,200 ,"Roommate $roommateName has been successfully kicked of flat share : $flatshareName !");
    }

    #[Route('/select_all_roommate', name: "selectallRoommate", methods: ["POST", "GET"])]
    public function selectAllRoommate()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la récuperation, vérifiez que la collocation est toujours existante !", 401);
            die;
        }

        $flatshareName = $result->getName();

        $data = $flatshareManager->selectAllRoommate($id_flatshare);

        if ($data instanceof \Exception) {
            $this->renderJson("Une erreur est survenue lors de la récupération des collocataires de la colocation : $flatshareName !", 401);
            die;
        }

        // all success //
        $this->renderJson($data);
    }

    #[Route('/select_roommate_flatshares', name: "kickRoommate", methods: ["POST", "GET"])]
    public function selectRoommateFlatshares()
    {
        $id_roommate = intval($_REQUEST['id_roommate']);

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUserById($id_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la récuperation, vérifiez que la collocation est toujours existante !", 401);
            die;
        }

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $data = $flatshareManager->selectRoommateFlatshares($id_roommate);

        if ($data instanceof \Exception) {
            $this->renderJson("Une erreur est survenue lors de la récupération des collocataires de la colocation : $flatshareName !", 401);
            die;
        }

        // all success //
        $this->renderJson($data);
    }
}

