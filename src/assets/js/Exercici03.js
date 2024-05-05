// Variables globals.
let num1Guardat, num2Guardat, num3Guardat;
let comptador = 0;

$("#showSecondContent").click(function guardarNumeros() {

    let num1 = $("input[name='num1']").val();
    let num2 = $("input[name='num2']").val();
    let num3 = $("input[name='num3']").val();

    // Variables que utilitzarem quan l'usuario utilitzi el boto de "Fi".
    num1Guardat = num1;
    num2Guardat = num2;
    num3Guardat = num3;

    // Array que ens ajudara a validar el valor dels numeros.
    let arrayNumeros = [num1, num2, num3];

    // Validar que els camps no siguin null.
    if (num1 === '' || num2 === '' || num3 === '') {
        alert("Tens que completar tots els camps.");
        return;
    }

    // Recorreix l'array y valida que cada numero estigui entre el 0 o el 9.
    for (let i = 0; i < arrayNumeros.length; i++) {
        if (arrayNumeros[i] < 0 || arrayNumeros[i] > 9) {
            alert("Els valors tenen que estar entre 0 y 9.");
            return;
        }
    }

    $.ajax({
        // Link de la peticio al servidor.
        url: "guarda_numero.php",
        // Tipo POST:
        type: "POST",
        // Esta resposta de tipus JSON.
        dataType: "json",
        // Li donem valor a les variables del pho amb les nostres variables.
        data: { num1: num1, num2: num2, num3: num3 },

        success: function (data) {
            // Si la conexio es un exit, li diem a l'usuari que s'han guardat els números.
            $("#numerosGuardados").text("Els números s'han guardat correctament!");
            $(".second-content").show();
            $("#numerosGuardados").show();
        },
        error: function () {
            $("#error-message").text("Error al procesar la solicitud.").show();
        }

    });

});

$("#hitCombination").click(function compararValors() {
    comptador++;
    let num1 = $("input[name='compararNum1']").val();
    let num2 = $("input[name='compararNum2']").val();
    let num3 = $("input[name='compararNum3']").val();


    let arrayNumeros = [num1, num2, num3];

    // Validar que els camps no siguin null.
    if (num1 === '' || num2 === '' || num3 === '') {
        alert("Tens que completar tots els camps.");
        return;
    }

    // Recorreix l'array y valida que cada numero estigui entre el 0 o el 9.
    for (let i = 0; i < arrayNumeros.length; i++) {
        if (arrayNumeros[i] < 0 || arrayNumeros[i] > 9) {
            alert("Els valors tenen que estar entre 0 y 9.");
            return;
        }
    }

    $.ajax({

        url: "check_numero.php",
        // Tipo POST:
        type: "POST",
        // Esta resposta de tipus JSON.
        dataType: "json",
        // Li donem valor a les variables del pho amb les nostres variables.
        data: { compararNum1: num1, compararNum2: num2, compararNum3: num3 },

        success: function (data) {
            
            // Compara els valors i diu si has encertat o no.
            $("#resultat").html("Comparacions de la combinació:<br>" + (data.resposta.num1php ? "Num1: Sí<br>" : "Num1: No<br>") + (data.resposta.num2php ? "Num2: Sí<br>" : "Num2: No<br>") + (data.resposta.num3php ? "Num3: Sí<br>" : "Num3: No<br>"));
            $("#resultat").show();
            // Notifiquem a l'usuari de que ha encertat tots els números.
             if (data.totEncertat) {
                $("#mostrarIntents").append("Enhorabona! Has encertat tots els números" + "<br>" + "Número d'intents: " + comptador + "<br>").show();
                $("#tornarJugar").show();
                $("#showTrys").hide();
                $("#hitCombination").hide();
                $("#end").hide();
                $("#reintentar").hide();
                $("#numerosGuardados").hide();

            }
        },
        error: function () {
            $("#error-message").text("Error al procesar la solicitud.").show();
        }
    });
});

$("#showTrys").click(function mostrarIntents() {

    // Realizar la solicitud AJAX a mostra_intents.php
    $.ajax({
        url: "mostra_intents.php",
        type: "POST",
        dataType: "json",
        success: function(data) {
            // Limpiar el contenido anterior
            $("#mostrarIntents").empty();
            // Iterar sobre los datos recibidos
            for (let i = 0; i < data.intentos.length; i++) {
                let numero = data.intentos[i].numero;
                let acertado = data.intentos[i].acertado ? "Vàlid" : "Invàlid";
                // Mostrar cada número y su estado
                $("#mostrarIntents").append("Número: " + numero + ", Estat: " + acertado + "<br>" + "<br>");
                $("#mostrarIntents").show();
            }
          
        },
        error: function() {
            alert("Error al procesar la solicitud.");
        }
    });
});

// Quan l'usuari fa click a Fi.
$("#end").click(function final() {
    // Amaguem els botons pertinents.
    $("#showTrys").hide();
    $("#hitCombination").hide();
    // Apareix un nou boto que serveix per reiniciar el joc i tornar a fer una partida nova.
    $("#reintentar").show();
    // Mostrar los números guardados al usuario.
    $("#numerosGuardados").text("Els números guardats eran: " + num1Guardat + ", " + num2Guardat + ", " + num3Guardat);
    
});


// Quan l'usuari fa click al boto de reintentar.
$("#reintentar").click(function final() {

    // Tornem a fer que apareixen tots els botons pertinents.
    $("#showTrys").show();
    $("#hitCombination").show();
    // Fem que desapareixi tots els botons y divs pertinents.
    $("#reintentar").hide();
    $("#mostrarIntents").hide();
    $("#numerosGuardados").hide();
    $(".second-content").hide();
    $("#resultat").hide();
    // Fem que els valors dels inputs desapareixin.
    $("input[name='compararNum1']").val('');
    $("input[name='compararNum2']").val('');
    $("input[name='compararNum3']").val('');
});

$("#tornarJugar").click(function tornarJugar() {

    // Quan l'usuari fa click al boto de tornar a jugar, amaguem tots els divs pertinents.
    $("#mostrarIntents").hide();
    $(".second-content").hide();
    $("#resultat").hide();
    $("#tornarJugar").hide();
    $("#numerosGuardados").hide();
    $("#showTrys").show();
    $("#end").show();
    $("#hitCombination").show();
    $("input[name='compararNum1']").val('');
    $("input[name='compararNum2']").val('');
    $("input[name='compararNum3']").val('');
    // Netejem els intents de l'anterior partida.
    $("#mostrarIntents").empty();
   
});