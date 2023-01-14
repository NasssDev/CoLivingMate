<?php

namespace App\Controllers;


abstract class AbstractController
{
    public function __construct(string $action, array $params = [])
    {
        if (!is_callable([$this, $action])) {
            throw new \RuntimeException("La methode $action n'est pas disponible dans ce controller");
        }
        call_user_func_array([$this, $action], $params);
    }

    public function renderJson(array|string $data="", int $code=200){

        header('Content-Type: application/json');
        if(is_array($data)){
            echo json_encode(['status' => $code,
                'data' => $data]);
        } else {
            echo json_encode(['status' => $code,
                'data' => [$data]]);
        }
    }

//    public function renderJsonError(string $message, int $codeError = 503)
//    {
//        header('Content-Type: application/json');
//        echo json_encode([
//            'status' => $codeError,
//            'data' => $message
//        ]);
//    }
}