// Lista de clases 
const clases = ["Tango", "Milonga", "Vals"];

// muestra clase disponible 
function mostrarClases() {
    console.log("Ejecutando mostrarClases...");
    let mensaje = "Clases disponibles:\n";
const totalClases = 3; 
    for (let i = 0; i < totalClases; i++) {
        mensaje += (i + 1) + ". " + clases[i] + "\n";
    }
    alert(mensaje);
    console.log("Clases mostradas: ", clases);
}

// Realizar una reserva
function realizarReserva() {
    console.log("Ejecutando realizarReserva...");
    
    const seleccion = prompt("Ingrese el número de la clase que desea reservar (1-Tango, 2-Milonga, 3-Vals):");
    console.log("Clase seleccionada: ", seleccion);

    if (seleccion !== null && seleccion !== "" && seleccion >= 1 && seleccion <= clases.length) {
        const nombre = prompt("Ingrese su nombre:");
        console.log("Nombre ingresado: ", nombre);
        if (nombre !== null && nombre !== "") {
            const dia = prompt("Ingrese el día que desea tomar la clase (formato: dd/mm/yyyy):");
            const hora = prompt("Ingrese la hora (formato: hh:mm):");
            console.log("Día ingresado: ", dia, "Hora ingresada: ", hora);

            if (dia !== null && dia !== "" && hora !== null && hora !== "") {
                alert("Datos de reserva:\n" +
                    "Clase: " + clases[seleccion - 1] + "\n" +
                    "Nombre: " + nombre + "\n" +
                    "Día: " + dia + "\n" +
                    "Hora: " + hora);
                alert("Su reserva será confirmada a la brevedad.");
                console.log("Reserva confirmada para: ", nombre);
            } else {
                alert("Día u hora inválidos. Intente nuevamente.");
                console.log("Día u hora inválidos.");
            }
        } else {
            alert("El nombre ingresado no es válido. Intente nuevamente.");
            console.log("Nombre inválido.");
        }
    } else {
        alert("Selección inválida. Intente nuevamente.");
        console.log("Selección inválida.");
    }
}

// Función  para iniciar el simulador
function iniciarSimulador() {
    console.log("Iniciando simulador...");
    let continuar = true;
    while (continuar) {
        const opcion = prompt("Seleccione una opción:\n1. Ver clases disponibles\n2. Realizar una reserva\n3. Salir");
        console.log("Opción seleccionada: ", opcion);
        switch (opcion) {
            case "1":
                mostrarClases();
                break;
            case "2":
                realizarReserva();
                break;
            case "3":
                continuar = false;
                alert("Gracias por usar el simulador.");
                console.log("Simulador finalizado.");
                iniciarSimulador(); 
                break;
            default:
                alert("Opción inválida. Intente nuevamente.");
                console.log("Opción inválida seleccionada.");
        }
    }
}

// siempre para iniciar 
iniciarSimulador();
