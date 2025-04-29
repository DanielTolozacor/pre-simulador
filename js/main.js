// Lista de clases
const clases = ["Tango", "Milonga", "Vals"];
const output = document.getElementById("output");
const formularioReserva = document.getElementById("formularioReserva");

// Muestra clases disponibles
function mostrarClases(listaClases) {
    console.log("Ejecutando mostrarClases...");
    output.innerHTML = "<h2>Clases Disponibles</h2>";
    listaClases.forEach((clase, index) => {
        const claseItem = document.createElement("p");
        claseItem.textContent = `${index + 1}. ${clase}`;
        output.appendChild(claseItem);
    });
    console.log("Clases mostradas: ", listaClases);
}

// Realizar una reserva
function realizarReserva(listaClases) {
    console.log("Ejecutando realizarReserva...");
    mostrarClases(listaClases);

    const seleccion = prompt("Ingrese el número de la clase que desea reservar (1-Tango, 2-Milonga, 3-Vals):");
    if (seleccion !== null && seleccion !== "" && seleccion >= 1 && seleccion <= listaClases.length) {
        formularioReserva.style.display = "block";
        document.getElementById("confirmarReserva").onclick = () => {
            const nombre = document.getElementById("nombre").value;
            const dia = document.getElementById("dia").value;
            const hora = document.getElementById("hora").value;

            if (nombre && dia && hora) {
                output.innerHTML = `
                    <h2>Datos de Reserva</h2>
                    <p>Clase: ${listaClases[seleccion - 1]}</p>
                    <p>Nombre: ${nombre}</p>
                    <p>Día: ${dia}</p>
                    <p>Hora: ${hora}</p>
                `;
                formularioReserva.style.display = "none";
                alert("Su reserva será confirmada a la brevedad.");
                console.log("Reserva confirmada para: ", nombre);
            } else {
                alert("Por favor, complete todos los campos.");
                console.log("Datos incompletos.");
            }
        };
    } else {
        alert("Selección inválida. Intente nuevamente.");
        console.log("Selección inválida.");
    }
}

// Función para iniciar el simulador
function iniciarSimulador() {
    console.log("Iniciando simulador...");

    document.getElementById("verClases").addEventListener("click", () => mostrarClases(clases));
    document.getElementById("reservarClase").addEventListener("click", () => realizarReserva(clases));
    document.getElementById("salir").addEventListener("click", () => {
        alert("Gracias por usar el simulador.");
        console.log("Simulador finalizado.");
    });
}

// Iniciar simulador al cargar la página
document.addEventListener("DOMContentLoaded", iniciarSimulador);
