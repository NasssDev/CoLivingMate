<?php

$allowedOrigins = array(
    'https://coliving-mate.vercel.app',
    'http://localhost:5173',
);

$origin = $_SERVER['HTTP_ORIGIN'];

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Origin: https://coliving-mate.vercel.app');
    header('Access-Control-Allow-Headers: content-type, authorization');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');






