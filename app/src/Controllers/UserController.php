<?php

namespace App\Controllers;

use App\Factories\PDOFactory;
use App\Managers\FlatshareManager;
use App\Managers\UserManager;
use App\Managers\SessionManager;
use App\Routes\Route;

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
                $this->renderJson("Identifiants incorrects", 403);
            } elseif (password_verify($pwd, $getUser->getPwd())) {
                $sessionManager->login($username);
                $getUserInfo = $userManager->readUserReturn($username);

                $this->renderJson([$getUserInfo]);
            }
        } else {
            $this->renderJson("Identifiants incorrects", 403);
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

        $signin = filter_input(INPUT_POST, "signin");
        $getUser = $userManager->readUser($username);

        if ($getUser) {
            $this->renderJson("Ce pseudo est déja utilisé, veuillez en choisir un autre.", 403);
        } else {
            $userManager->creatUser($username, $pwd_hash, $firstname, $lastname, $email, $birthdate);

            $getUserInfo = $userManager->readUserReturn($username);

            $this->renderJson([$getUserInfo]);
        }
    }

    #[Route('/respwd', name: "respwd", methods: ["POST"])]
    public function signin3()
    {

        $update_username = filter_input(INPUT_POST, "username");
        $update_pwd = filter_input(INPUT_POST, "pwd");
        $update_pwd_hash = password_hash($update_pwd, PASSWORD_DEFAULT);


        $userManager = new UserManager(new PDOFactory());

        $resmdp = filter_input(INPUT_POST, "resmdp");


        if ($resmdp) {
            $userManager->updatePwd($update_username, $update_pwd_hash);
            header("location: /login");

        }
    }

    #[Route('/count_roommate', name: "count", methods: ["POST", "GET"])]
    public function countRoommate()
    {

        $id_flatshare = filter_input(INPUT_GET, "id_flatshare");


        $userManager = new UserManager(new PDOFactory());

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Erreur lors de la récupération de la colocation, vérfiez qu'elle est toujours active ou existante !", 503);
            die;
        }

        $data = $userManager->countUser($id_flatshare);

        $this->renderJson($data);
    }
}

