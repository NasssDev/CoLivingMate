<?php

namespace App\Controllers;

use App\Factories\PDOFactory;
use App\Managers\FlatshareManager;
use App\Managers\UserManager;
use App\Managers\SessionManager;
use App\Routes\Route;
use Exception;

class UserController extends AbstractController
{
    #[Route('/login', name: "login", methods: ["GET"])]
    public function login()
    {
        $sessionManager = new SessionManager();
        $logStatut = $sessionManager->check_login();
    }

    #[Route('/logout', name: "logout", methods: ["GET"])]
    public function logout()
    {
        $sessionManager = new SessionManager();
        $sessionManager->logout();
        header("location: /");

    }

    #[Route('/login', name: "login", methods: ["POST"])]
    public function signin()
    {

        $username = filter_input(INPUT_POST, "username");
        $pwd = filter_input(INPUT_POST, "pwd");
        $pwd_hash = password_hash($pwd, PASSWORD_DEFAULT);

        $userManager = new UserManager(new PDOFactory());
        $sessionManager = new SessionManager();

        $login = filter_input(INPUT_POST, "login");
        $getUser = $userManager->readUser($username);
//        var_dump($getUser);die;
        if ($getUser !== false) {
            if (!password_verify($pwd, $getUser->getPwd())) {
                $this->renderJson("Username ou Password incorrect !", 403);
            } elseif (password_verify($pwd, $getUser->getPwd())) {
                $sessionManager->login($username);
                $getUserInfo = $userManager->readUserReturn($username);

                $this->renderJson([$getUserInfo]);
            }
        } else {
            $this->renderJson("Username ou Password incorrect !", 403);
        }
    }

    #[Route('/signup', name: "signin", methods: ["POST"])]
    public function signup()
    {
        $firstname = filter_input(INPUT_POST, "firstname");
        $lastname = filter_input(INPUT_POST, "lastname");
        $email = filter_input(INPUT_POST, "email");
        $birthdate = filter_input(INPUT_POST, "birthdate");

        $username = filter_input(INPUT_POST, "username");
        $pwd = filter_input(INPUT_POST, "pwd");
        $pwd_hash = password_hash($pwd, PASSWORD_DEFAULT);

        $userManager = new UserManager(new PDOFactory());

        $getUser = $userManager->readUser($username);

        if ($getUser) {
            $this->renderJson("This username is already in use, please choose another one !", 403);
            die;
        }

        if($username && $pwd_hash && $firstname && $lastname && $email && $birthdate){
            $userManager->creatUser($username, $pwd_hash, $firstname, $lastname, $email, $birthdate);

            $getUserInfo = $userManager->readUserReturn($username);

            $this->renderJson($getUserInfo);
        }
    }

    /**
     * @return void
     * @throws Exception
     */
    #[Route('/change_pwd', name: "changepwd", methods: ["POST"])]
    public function changePwd()
    {

        $id_roommate = filter_input(INPUT_POST, "id_roommate");
        $old_pwd = filter_input(INPUT_POST, "old_pwd");
        $new_pwd = filter_input(INPUT_POST, "new_pwd");
        $new_pwd_hash = password_hash($new_pwd, PASSWORD_DEFAULT);


        $userManager = new UserManager(new PDOFactory());

        $user = $userManager->readUserById($id_roommate);

        if ($user instanceof Exception) {
            $this->renderJson("Error while recovering the account, verify that it is still active or existing !", 503);
            die;
        }

        if (!password_verify($old_pwd, $user->getPwd())) {
            $this->renderJson("Error, the password is not correct !", 503);
            die;
        }

        $userManager->updatePwd($id_roommate, $new_pwd_hash);

        $this->renderJson("The password has been changed successfully !");
    }

    #[Route('/count_roommate', name: "count", methods: ["POST", "GET"])]
    public function countRoommate()
    {

        $id_flatshare = filter_input(INPUT_GET, "id_flatshare");


        $userManager = new UserManager(new PDOFactory());

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof Exception) {
            $this->renderJson("Erreur lors de la récupération de la colocation, vérfiez qu'elle est toujours active ou existante !", 503);
            die;
        }

        $data = $userManager->countUser($id_flatshare);

        $this->renderJson($data);
    }

    #[Route('/get_roommate', name: "getRoommate", methods: ["POST", "GET"])]
    public function getRoommate()
    {

        $id_roommate = filter_input(INPUT_GET, "id_roommate");

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUserByIdReturn($id_roommate);

        if ($result instanceof Exception) {
            $this->renderJson("Erreur lors de la récupération du compte, vérfiez qu'il est toujours actif ou existant !", 503);
            die;
        }

        $this->renderJson($result);
    }

    #[Route('/update_roommate', name: "updateRoommate", methods: ["POST"])]
    public function updateRoommate()
    {

        $id_roommate = intval(filter_input(INPUT_POST, "id_roommate"));
        $firstname = filter_input(INPUT_POST, "firstname");
        $lastname = filter_input(INPUT_POST, "lastname");
        $email = filter_input(INPUT_POST, "email");
        $birthdate = filter_input(INPUT_POST, "birthdate");
        $username = filter_input(INPUT_POST, "username");

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUserById($id_roommate);

        if ($result instanceof Exception) {
            $this->renderJson("Error while recovering the account, verify that it is still active or existing!", 503);
            die;
        }

        if ($firstname && $lastname && $email && $birthdate && $username) {
            $userManager->updateUser($id_roommate, $username, $lastname, $firstname, $email, $birthdate);
        } else {
            $this->renderJson("Error, make sure that the 'username', 'lastname', 'firstname', 'email' and 'birthdate' fields are filled in correctly!", 503);
            die;
        }

        $this->renderJson("Change made successfully !");
    }
}

