const clases = ["Tango", "Milonga", "Vals"];

let output, formularioReserva, claseSeleccionada, contadorReservas = 0, reservas = [];

document.addEventListener("DOMContentLoaded", () => {
    output = document.getElementById("output");
    formularioReserva = document.getElementById("formularioReserva");
    claseSeleccionada = document.getElementById("claseSeleccionada");

    document.getElementById("verClases").addEventListener("click", () => mostrarClases(clases));
    document.getElementById("salir").addEventListener("click", () => {
        output.innerHTML = "<p>Thank you for using the simulator.</p>";
    });
    document.getElementById("confirmarReserva").addEventListener("click", confirmarReserva);
    document.getElementById("cancelarReserva").addEventListener("click", cancelarReserva);

    document.getElementById("nombre").addEventListener("input", (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });

    document.getElementById("dia").addEventListener("input", (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9/]/g, ""); // Allow only numbers and "/"
        generarOpcionesHorarios(); // Update the "hora" dropdown when the day is entered
    });

    document.getElementById("telefono").addEventListener("input", (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, "");
    });
});

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

function mostrarHorariosDisponibles(dia) {
    const horarios = [];
    for (let hora = 9; hora <= 21; hora++) {
        const horaTexto = `${hora.toString().padStart(2, "0")}:00`;
        const reservaExistente = reservas.find(
            (reserva) => reserva.dia === dia && reserva.hora === horaTexto
        );
        if (!reservaExistente) {
            horarios.push(horaTexto);
        }
    }
    return horarios;
}

function generarOpcionesHorarios() {
    const horaSelect = document.getElementById("hora");
    const dia = document.getElementById("dia").value.trim();

    horaSelect.innerHTML = ""; // Clear previous options

    if (!dia) {
        horaSelect.innerHTML = "<option value=''>Select a day first</option>";
        return;
    }

    const horariosDisponibles = mostrarHorariosDisponibles(dia);

    if (horariosDisponibles.length === 0) {
        horaSelect.innerHTML = "<option value=''>No available schedules</option>";
        return;
    }

    horariosDisponibles.forEach((hora) => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });
}

function seleccionarClase(index) {
    formularioReserva.style.display = "block";
    claseSeleccionada.textContent = `Selected class: ${clases[index]}`;
    formularioReserva.dataset.claseIndex = index;
    output.innerHTML = "";
    generarOpcionesHorarios(); // Populate the "hora" dropdown with available schedules
}

function confirmarReserva() {
    const nombre = document.getElementById("nombre").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const telefono = document.getElementById("telefono").value;
    const claseIndex = formularioReserva.dataset.claseIndex;

    if (!nombre || !dia || !hora || !telefono) {
        output.innerHTML = "<p style='color: red;'>Please complete all fields.</p>";
        return;
    }

    const reservaExistente = reservas.find(
        (reserva) => reserva.dia === dia && reserva.hora === hora
    );
    if (reservaExistente) {
        output.innerHTML = `<p style='color: red;'>The time ${hora} is already reserved for the class ${reservaExistente.clase}. Please choose another time.</p>`;
        return;
    }

    contadorReservas++; // Increment the reservation counter
    reservas.push({ clase: clases[claseIndex], dia, hora, telefono }); // Add reservation to the list

    output.innerHTML = `
        <h2>Reservation Confirmed</h2>
        <p>Class: ${clases[claseIndex]}</p>
        <p>Name: ${nombre}</p>
        <p>Day: ${dia}</p>
        <p>Time: ${hora}</p>
        <p>Phone: ${telefono}</p>
        <p>Total Reservations: ${contadorReservas}</p>
    `;
    formularioReserva.style.display = "none";
    mostrarHorariosReservados();
    mostrarMensajeFooter(); // Display footer message
}

function mostrarMensajeFooter() {
    let footerMessage = document.getElementById("footerMessage");
    if (!footerMessage) {
        footerMessage = document.createElement("div");
        footerMessage.id = "footerMessage";
        footerMessage.style.textAlign = "center";
        footerMessage.style.marginTop = "20px";
        footerMessage.style.padding = "10px";
        footerMessage.style.backgroundColor = "#000";
        footerMessage.style.color = "#ffd700";
        footerMessage.style.borderTop = "2px solid #ffd700";
        document.body.appendChild(footerMessage);
    }
    footerMessage.innerHTML = `
        <p>Thank you for reserving with us!</p>
        <p>Segunda pre entrega</p>
    `;
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

function cancelarReserva() {
    formularioReserva.style.display = "none";
    output.innerHTML = "<p>Reservation canceled. You can select another class.</p>";
}
