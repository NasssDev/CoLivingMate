<?php

namespace App\Controllers;

use App\Routes\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: "home", methods: ["POST", "GET"])]
    public function home()
    {
        $this->renderJson('Vous êtes sur le HomeController pour la route "/"');
    }
}
