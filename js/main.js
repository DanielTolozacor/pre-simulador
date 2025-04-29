// Lista de clases
const clases = ["Tango", "Milonga", "Vals"];
const output = document.getElementById("output");
const formularioReserva = document.getElementById("formularioReserva");
const claseSeleccionada = document.getElementById("claseSeleccionada");

let contadorReservas = 0; // Contador de reservas confirmadas

// Muestra clases disponibles
function mostrarClases(listaClases) {
    console.log("Ejecutando mostrarClases...");
    output.innerHTML = "<h2>Clases Disponibles</h2>";
    listaClases.forEach((clase, index) => {
        const claseItem = document.createElement("button");
        claseItem.textContent = `${index + 1}. ${clase}`;
        claseItem.classList.add("clase-item");
        claseItem.addEventListener("click", () => seleccionarClase(index));
        output.appendChild(claseItem);
    });
    console.log("Clases mostradas: ", listaClases);
}

// Seleccionar clase para reservar
function seleccionarClase(index) {
    console.log("Clase seleccionada: ", clases[index]);
    formularioReserva.style.display = "block";
    claseSeleccionada.textContent = `Clase seleccionada: ${clases[index]}`;
    formularioReserva.dataset.claseIndex = index; // Guardar el índice de la clase seleccionada
    output.innerHTML = ""; // Limpiar el área de salida
}

// Confirmar reserva
function confirmarReserva() {
    const nombre = document.getElementById("nombre").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const claseIndex = formularioReserva.dataset.claseIndex;

    if (nombre && dia && hora) {
        contadorReservas++; // Incrementar el contador
        output.innerHTML = `
            <h2>Reserva Recibida</h2>
            <p>Clase: ${clases[claseIndex]}</p>
            <p>Nombre: ${nombre}</p>
            <p>Día: ${dia}</p>
            <p>Hora: ${hora}</p>
            <p>Mensaje: Su reserva ha sido recibida exitosamente le confirmaremos a la brevedad
            .</p>
            
            <p>ETA: 15 minutos antes del inicio de la clase.</p>
        `;
        formularioReserva.style.display = "none";

        // Mostrar agradecimiento y contador
        const agradecimiento = document.createElement("p");
        agradecimiento.textContent = `¡Gracias por reservar! Total de reservas recibidas: ${contadorReservas}`;
        agradecimiento.style.color = "green";
        agradecimiento.style.marginTop = "20px";
        document.body.appendChild(agradecimiento);

        console.log("Reserva recibida para: ", nombre);
    } else {
        output.innerHTML = "<p style='color: red;'>Por favor, complete todos los campos.</p>";
        console.log("Datos incompletos.");
    }
}

// Cancelar reserva
function cancelarReserva() {
    formularioReserva.style.display = "none";
    output.innerHTML = "<p>Reserva cancelada. Puede seleccionar otra clase.</p>";
    console.log("Reserva cancelada.");
}

// Función para iniciar el simulador
function iniciarSimulador() {
    console.log("Iniciando simulador...");

    document.getElementById("verClases").addEventListener("click", () => mostrarClases(clases));
    document.getElementById("salir").addEventListener("click", () => {
        output.innerHTML = "<p>Gracias por usar el simulador.</p>";
        console.log("Simulador finalizado.");
    });
    document.getElementById("confirmarReserva").addEventListener("click", confirmarReserva);
    document.getElementById("cancelarReserva").addEventListener("click", cancelarReserva);
}

// Iniciar simulador al cargar la página
document.addEventListener("DOMContentLoaded", iniciarSimulador);
