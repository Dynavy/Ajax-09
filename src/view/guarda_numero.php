<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $num1 = isset($_POST['num1']) ? ($_POST['num1']) : '';
    $num2 = isset($_POST['num2']) ? ($_POST['num2']) : '';
    $num3 = isset($_POST['num3']) ? ($_POST['num3']) : '';

    // Guardem a variables de sesio el resultat de cada numero.
    $_SESSION['num1Check'] = $num1;
    $_SESSION['num2Check'] = $num2;
    $_SESSION['num3Check'] = $num3;

    // Array associatiu amb claus que tenen el valor dels números guardats.
    $resposta = array(
        'num1php' => $num1,
        'num2php' => $num2,
        'num3php' => $num3
    );

    echo json_encode($resposta);
}

?>