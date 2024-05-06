<?php
session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $num1 = isset($_POST['compararNum1']) ? ($_POST['compararNum1']) : '';
    $num2 = isset($_POST['compararNum2']) ? ($_POST['compararNum2']) : '';
    $num3 = isset($_POST['compararNum3']) ? ($_POST['compararNum3']) : '';

    // Guardem a variables de sessió els numeros introduïts per el usuari en el moment de comparar.
    $_SESSION['numero1'] = $num1;
    $_SESSION['numero2'] = $num2;
    $_SESSION['numero3'] = $num3;


    // Si existeicen les variables num1check, num2check... Assignem els seus valors a noves variables.
    if (isset($_SESSION['num1Check']) && isset($_SESSION['num2Check']) && isset($_SESSION['num3Check'])) {
        // Les variables de check tenen el valor dels numeros guardats inicialment.
        $num1Check = $_SESSION['num1Check'];
        $num2Check = $_SESSION['num2Check'];
        $num3Check = $_SESSION['num3Check'];
    }

    // Array assosiatiu amb claus de tipo boolean que comparan el número introduït amb el número guardat.
    $resposta = array(
        'num1php' => $num1 == $num1Check,
        'num2php' => $num2 == $num2Check,
        'num3php' => $num3 == $num3Check
    );


    // Creem un array que emmagatzemi 
    $intentos = isset($_SESSION['intentos']) ? $_SESSION['intentos'] : [];
    // Guardem cada intent de l'usuari i si es acertat o no.
    $intentos[] = ['numero' => $num1, 'acertado' => ($num1 == $num1Check)];
    $intentos[] = ['numero' => $num2, 'acertado' => ($num2 == $num2Check)];
    $intentos[] = ['numero' => $num3, 'acertado' => ($num3 == $num3Check)];
    // Hem guardat a la variable de sessió, els intents de l'usuari.
    $_SESSION['intentos'] = $intentos;

    // Comprovar si els 3 numeros han sigut acertats.
    $totEncertat = ($num1 == $num1Check) && ($num2 == $num2Check) && ($num3 == $num3Check);

   
    echo json_encode(['resposta' => $resposta,'totEncertat' => $totEncertat]);


}
?>