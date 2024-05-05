<?php

session_start();

// Tipo post
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Si post numero no existeix, es posa a 0.
    $numero = isset($_POST['numero']) ? $_POST['numero'] : 0;

    // Asignar valor a las claves del array asociativo.
    $resposta = array(
        'numero' => $numero,
        'esMayor' => $numero > 5
    );

    $_SESSION['numeros'][] = $numero;

    // Enviem com a resposta al servidor de tipo JSON com a $resposta de parametre.
    echo json_encode($resposta);

    // Tipo Get.
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // El if se ejecuta si existe la variable de sesion numeros.
    if (isset($_SESSION['numeros'])) {
        // $resposta es un array asociativo con la clave llistanumeros la cual tiene el valor de la 
        $resposta['ListaNumeros'] = $_SESSION['numeros'];
        $ListaNumeros = $_SESSION['numeros'];
        echo json_encode($resposta);
    } 
    
}
?>