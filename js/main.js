const clases = ["Tango", "Milonga", "Vals"];

const output = document.getElementById("output");
const formularioReserva = document.getElementById("formularioReserva");
const claseSeleccionada = document.getElementById("claseSeleccionada");

let contadorReservas = 0;
let reservas = [];

function mostrarClases(listaClases) {
    output.innerHTML = "<h2>Available Classes</h2>";
    listaClases.forEach((clase, index) => {
        const claseItem = document.createElement("button");
        claseItem.textContent = `${index + 1}. ${clase}`;
        claseItem.classList.add("clase-item");
        claseItem.addEventListener("click", () => seleccionarClase(index));
        output.appendChild(claseItem);
    });
}

function mostrarHorariosDisponibles(dia, claseIndex) {
    const horarios = [];
    console.log("Día seleccionado:", dia); // Verifica el día recibido
    console.log("Clase seleccionada:", clases[claseIndex]); // Verifica la clase seleccionada

    for (let hora = 9; hora <= 21; hora++) {
        const horaTexto = `${hora.toString().padStart(2, "0")}:00`;
        const reservaExistente = reservas.find(
            (reserva) => reserva.dia === dia && reserva.hora === horaTexto && reserva.clase === clases[claseIndex]
        );

        if (!reservaExistente) {
            horarios.push(horaTexto);
        }
    }

    console.log("Horarios disponibles para el día y clase:", horarios); // Verifica los horarios generados
    return horarios;
}


function mostrarHorariosReservados() {
    const horariosReservadosDiv = document.getElementById("horariosReservados");
    horariosReservadosDiv.innerHTML = "<h2>Reserved Schedules</h2>";
    if (reservas.length === 0) {
        horariosReservadosDiv.innerHTML += "<p>No schedules reserved.</p>";
    } else {
        reservas.forEach((reserva) => {
            const reservaItem = document.createElement("p");
            reservaItem.textContent = `Class: ${reserva.clase}, Day: ${reserva.dia}, Time: ${reserva.hora}`;
            horariosReservadosDiv.appendChild(reservaItem);
        });
    }
}

function generarOpcionesHorarios() {
    const horaSelect = document.getElementById("hora");
    horaSelect.innerHTML = "";
    for (let hora = 9; hora <= 21; hora++) {
        const option = document.createElement("option");
        option.value = `${hora.toString().padStart(2, "0")}:00`;
        option.textContent = `${hora.toString().padStart(2, "0")}:00`;
        horaSelect.appendChild(option);
    }
}

function seleccionarClase(index) {
    formularioReserva.style.display = "block";
    claseSeleccionada.textContent = `Selected class: ${clases[index]}`;
    formularioReserva.dataset.claseIndex = index;
    output.innerHTML = "";
    generarOpcionesHorarios();
    const dia = document.getElementById("dia").value;
    if (dia) {
        const horariosDisponibles = mostrarHorariosDisponibles(dia, index);
        if (horariosDisponibles.length > 0) {
            output.innerHTML = `
                <h2>Available Schedules</h2>
                <p>${horariosDisponibles.join(", ")}</p>
            `;
        } else {
            output.innerHTML = "<p style='color: red;'>No schedules available for this day.</p>";
        }
    }
    mostrarHorariosReservados();
}

document.getElementById("nombre").addEventListener("input", (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
});

document.getElementById("dia").addEventListener("input", (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^0-9/]/g, "");
function confirmarReserva() {
    const nombre = document.getElementById("nombre").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const telefono = document.getElementById("telefono").value;
    const claseIndex = formularioReserva.dataset.claseIndex;

    console.log("Datos de confirmación de reserva:", { nombre, dia, hora, telefono, clase: clases[claseIndex] });

    if (!telefono || telefono.length < 10) {
        output.innerHTML = "<p style='color: red;'>Please enter a valid phone number with at least 10 digits.</p>";
        return;
    }

    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!fechaRegex.test(dia)) {
        output.innerHTML = "<p style='color: red;'>Please enter a valid date in the format dd/mm/yyyy.</p>";
        return;
    }

    const [day, month, year] = dia.split("/").map(Number);
    const inputDate = new Date(year, month - 1, day);
    const minDate = new Date(2025, 3, 29); // 29/04/2025

    if (inputDate < minDate) {
        output.innerHTML = "<p style='color: red;'>The date must be on or after 29/04/2025.</p>";
        return;
    }

    const reservaExistente = reservas.find(
        (reserva) => reserva.dia === dia && reserva.hora === hora
    );
    if (reservaExistente) {
        output.innerHTML = `<p style='color: red;'>The time ${hora} is already reserved for the class ${reservaExistente.clase}. Please choose another time.</p>`;
        return;
    }

    if (nombre && dia && hora && telefono) {
        console.log("Reserva confirmada, añadiendo a la lista de reservas.");
        contadorReservas++;
        reservas.push({ clase: clases[claseIndex], dia, hora, telefono });
        mostrarHorariosReservados();
    } else {
        output.innerHTML = "<p style='color: red;'>Please complete all fields.</p>";
    }
}
        if (!agradecimiento) {
            agradecimiento = document.createElement("div");
            agradecimiento.id = "agradecimiento";
            agradecimiento.style.backgroundColor = "#d4edda";
            agradecimiento.style.color = "#155724";
            agradecimiento.style.padding = "15px";
            agradecimiento.style.marginTop = "20px";
            agradecimiento.style.border = "1px solid #c3e6cb";
            agradecimiento.style.borderRadius = "5px";
            agradecimiento.style.textAlign = "center";
            document.body.appendChild(agradecimiento);
        }
        agradecimiento.textContent = `Thank you for making your reservation! Total reservations: ${contadorReservas}`;
        mostrarHorariosReservados();
    } else {
        output.innerHTML = "<p style='color: red;'>Please complete all fields.</p>";
    }
}

function cancelarReserva() {
    formularioReserva.style.display = "none";
    output.innerHTML = "<p>Reservation canceled. You can select another class.</p>";
}

function agregarFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "Segunda entrega";
    footer.style.textAlign = "center";
    footer.style.marginTop = "20px";
    footer.style.padding = "10px";
    footer.style.backgroundColor = "#000";
    footer.style.color = "#ffd700";
    document.body.appendChild(footer);
}

function iniciarSimulador() {
    document.getElementById("verClases").addEventListener("click", () => mostrarClases(clases));
    document.getElementById("salir").addEventListener("click", () => {
        output.innerHTML = "<p>Thank you for using the simulator.</p>";
    });
    document.getElementById("confirmarReserva").addEventListener("click", confirmarReserva);
    document.getElementById("cancelarReserva").addEventListener("click", cancelarReserva);

    agregarFooter(); // Add footer when the simulator starts
}

document.addEventListener("DOMContentLoaded", iniciarSimulador);
