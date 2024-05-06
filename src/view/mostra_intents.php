<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Variables que contenen el valor dels 3 números introduïts per fer la combinació (check_numero.php).
    $num1 = isset($_SESSION['numero1']) ? intval($_SESSION['numero1']) : "No ha fet intents.";
    $num2 = isset($_SESSION['numero2']) ? intval($_SESSION['numero2']) : "No ha fet intents.";
    $num3 = isset($_SESSION['numero3']) ? intval($_SESSION['numero3']) : "No ha fet intents.";

    // Variables que contenen el valor dels primers 3 números combinants(guarda_numero.php)
    $num1Check = isset($_SESSION['num1Check']) ? intval($_SESSION['num1Check']) : null;
    $num2Check = isset($_SESSION['num2Check']) ? intval($_SESSION['num2Check']) : null;
    $num3Check = isset($_SESSION['num3Check']) ? intval($_SESSION['num3Check']) : null;

    // Obtenim el valor del array de sessió creat anteriorment.
    $intentos = isset($_SESSION['intentos']) ? $_SESSION['intentos'] : [];


    // Resposta de tipus JSON al ajax amb la variable $intentos.
    echo json_encode(['intentos' => $intentos]);
}
?>