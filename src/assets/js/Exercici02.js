// Click en boton con id major5
$("#major5").click(function major5Click() {

    // Creamos una variable que tenga como name 'numero'
     let numero = $("input[name='numero']").val();

     // Evitar que no se pueda insertar null.
     if (!numero.trim()) {
        $("#error-message3").text("Por favor, ingrese un número.").show();
        return;
    }
    $("#error-message3").hide();
    $.ajax({
        // hace una request al servidor php
        url: "check_major5.php",
        // De tipo POST.
        type: "POST",
        // Espera respuesta de tipo json.
        dataType: "json",
        // Hace que $numero del php tenga el valor de let numero.
        data: { numero: numero },
        // Si todo lo previo ha sido un exito, entra esta function.
        success: function (data) {
            // Imprimie en el div #resultat el siguiente texto.
            $("#resultat").text("El número " + data.numero + " es mayor que 5: " + (data.esMayor ? "Sí" : "No"));
        },
        // Si la conexión falla, entra este error function.
        error: function () {
            $("#error-message").text("Error al procesar la solicitud.");
        }
    });
});

// Click en en boton con id mostrarNumeros
$("#mostrarNumeros").click(function mostrarNumerosClick() {
    $.ajax({
        url: "check_major5.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#numerosLista").text("Llista numeros: "+ data.ListaNumeros);
        },
        error: function () {
            $("#error-message2").text("Error al obtener números.").show();
        }
    });
});
