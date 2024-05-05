$(document).ready(function () {
    $("#enviar").click(function () {
        let valor = $("#valor").val();
        $.ajax({
            type: "GET",
            url: "Exercici01.php?valor=" + valor,
            dataType: "json",   
            success: function (resposta) {
                console.log(resposta) 

                $("#resultat").html (
                    "<div> Resultat " + resposta["valor"] + "</div>"
                )
            }
          
        });
    });
});
