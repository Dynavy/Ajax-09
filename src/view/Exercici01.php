<?php
if (isset($_GET['valor'])) {
    $valor = $_GET['valor'];
    $resposta = array("valor" => $valor);
    echo json_encode($resposta);
}
?>