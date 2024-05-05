<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Almacenamos en los num1, num2 y num3 los valores de las variables de sesion que recogemos en check_numero.
    $num1 = isset($_SESSION['numero1']) ? intval($_SESSION['numero1']) : "No ha fet intents.";
    $num2 = isset($_SESSION['numero2']) ? intval($_SESSION['numero2']) : "No ha fet intents.";
    $num3 = isset($_SESSION['numero3']) ? intval($_SESSION['numero3']) : "No ha fet intents.";

    // Variables que tienen el valor de la primera combinación de los 3 números.
    $num1Check = isset($_SESSION['num1Check']) ? intval($_SESSION['num1Check']) : null;
    $num2Check = isset($_SESSION['num2Check']) ? intval($_SESSION['num2Check']) : null;
    $num3Check = isset($_SESSION['num3Check']) ? intval($_SESSION['num3Check']) : null;

    // Obtener los intentos almacenados en la sesión
    $intentos = isset($_SESSION['intentos']) ? $_SESSION['intentos'] : [];

    // Verificar si los números son acertados y agregar los intentos a la sesión
    $intentos[] = ['numero' => $num1, 'acertado' => ($num1 == $num1Check)];
    $intentos[] = ['numero' => $num2, 'acertado' => ($num2 == $num2Check)];
    $intentos[] = ['numero' => $num3, 'acertado' => ($num3 == $num3Check)];

    // Actualizar la sesión con todos los intentos
    $_SESSION['intentos'] = $intentos;


    // Devolver los intentos y si todos los números son acertados como JSON
    echo json_encode(['intentos' => $intentos]);
}
?>