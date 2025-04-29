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
    for (let hora = 9; hora <= 21; hora++) {
        const horaTexto = `${hora.toString().padStart(2, "0")}:00`;
        const reservaExistente = reservas.find(
            (reserva) => reserva.dia === dia && reserva.hora === horaTexto && reserva.clase === clases[claseIndex]
        );
        if (!reservaExistente) {
            horarios.push(horaTexto);
        }
    }
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
});

document.getElementById("telefono").addEventListener("input", (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ""); // Allow only numbers
});

function confirmarReserva() {
    const nombre = document.getElementById("nombre").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const telefono = document.getElementById("telefono").value;
    const claseIndex = formularioReserva.dataset.claseIndex;

    if (!telefono || telefono.length < 10) {
        output.innerHTML = "<p style='color: red;'>Please enter a valid phone number with at least 10 digits.</p>";
        return;
    }

    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
console.log("Fecha ingresada:", dia); // Verifica qué fecha se ingresó
console.log("¿Formato válido?", fechaRegex.test(dia)); // Verifica si cumple con el formato

if (!fechaRegex.test(dia)) {
    output.innerHTML = "<p style='color: red;'>Please enter a valid date in the format dd/mm/yyyy.</p>";
    return;
}

const [day, month, year] = dia.split("/").map(Number);
const inputDate = new Date(year, month - 1, day);
const minDate = new Date(2025, 3, 29); // 29/04/2025

console.log("Fecha mínima permitida:", minDate); // Verifica la fecha mínima
console.log("Fecha ingresada convertida:", inputDate); // Verifica la fecha ingresada convertida
const reservaExistente = reservas.find(
    (reserva) => reserva.dia === dia && reserva.hora === hora
);
console.log("Reservas existentes:", reservas); // Verifica todas las reservas actuales
console.log("Intentando reservar:", { dia, hora }); // Verifica el día y la hora seleccionados
console.log("¿Ya reservado?", reservaExistente); // Verifica si ya existe una reserva

if (reservaExistente) {
    output.innerHTML = `<p style='color: red;'>The time ${hora} is already reserved for the class ${reservaExistente.clase}. Please choose another time.</p>`;
    return;
}    const reservaExistente = reservas.find(
        (reserva) => reserva.dia === dia && reserva.hora === hora
    );
    if (reservaExistente) {
        output.innerHTML = `<p style='color: red;'>The time ${hora} is already reserved for the class ${reservaExistente.clase}. Please choose another time.</p>`;
        return;
    }

    if (nombre && dia && hora && telefono) {
        contadorReservas++;
        reservas.push({ clase: clases[claseIndex], dia, hora, telefono });
        const detalles = [
            `<strong>Reservation Number: ${contadorReservas}</strong>`,
            `Class: ${clases[claseIndex]}`,
            `Name: ${nombre}`,
            `Day: ${dia}`,
            `Time: ${hora}`,
            `Phone: ${telefono}`,
            "Message: Your reservation has been successfully received. We will confirm shortly.",
            "ETA: 15 minutes before the class starts."
        ].map((detalle) => `<p>${detalle}</p>`).join("");
        output.innerHTML = `
            <h2>Reservation Received</h2>
            ${detalles}
        `;
        formularioReserva.style.display = "none";
        let agradecimiento = document.getElementById("agradecimiento");
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
