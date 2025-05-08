const clases = ["Tango", "Milonga", "Vals"];

let output = document.getElementById("output"),
    formularioReserva = document.getElementById("formularioReserva"),
    claseSeleccionada = document.getElementById("claseSeleccionada"),
    contadorReservas = 0,
    reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Set minimum date for the date picker to today
const diaInput = document.getElementById("dia");
const today = new Date().toISOString().split("T")[0];
diaInput.setAttribute("min", today);

// Event Listeners
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
document.getElementById("dia").addEventListener("change", generarOpcionesHorarios); // Fixed event listener for day selection
document.getElementById("telefono").addEventListener("input", (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
});

// Background Image
const img = `
    <img 
        src="./assets/imagenes/imagen1.jpeg" 
        alt="Class Reservation" 
        style="
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: calc(100vh - 50px); 
            z-index: -1; 
            object-fit: cover;
        "
    />
`;
document.body.insertAdjacentHTML("afterbegin", img);

// Initialize
if (reservas.length) mostrarHorariosReservados();

function mostrarClases(listaClases) {
    output.innerHTML = `
        <h2>Available Classes</h2>
        ${listaClases
            .map(
                (clase, index) => `
                <button class="clase-item" onclick="seleccionarClase(${index})">
                    ${index + 1}. ${clase}
                </button>
            `
            )
            .join("")}
    `;
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
    const dia = diaInput.value.trim();

    if (!dia) {
        horaSelect.innerHTML = "<option value=''>Select a day first</option>";
        return;
    }

    const horariosDisponibles = mostrarHorariosDisponibles(dia);

    horaSelect.innerHTML = horariosDisponibles.length
        ? horariosDisponibles
              .map((hora) => `<option value="${hora}">${hora}</option>`)
              .join("")
        : "<option value=''>No available schedules</option>";
}

function seleccionarClase(index) {
    formularioReserva.style.display = "block";
    claseSeleccionada.textContent = `Selected class: ${clases[index]}`;
    formularioReserva.dataset.claseIndex = index;
    output.innerHTML = "";
    generarOpcionesHorarios();
}

function confirmarReserva() {
    const nombre = document.getElementById("nombre").value.trim();
    const dia = diaInput.value.trim();
    const hora = document.getElementById("hora").value;
    const telefono = document.getElementById("telefono").value.trim();
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

    contadorReservas++;
    reservas.push({ clase: clases[claseIndex], dia, hora, telefono });

    // Save updated reservations to localStorage
    localStorage.setItem("reservas", JSON.stringify(reservas));

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
}

function mostrarHorariosReservados() {
    const horariosReservadosDiv = document.getElementById("horariosReservados");
    horariosReservadosDiv.innerHTML = "<h2>Reserved Schedules</h2>";

    if (reservas.length === 0) {
        horariosReservadosDiv.innerHTML += "<p>No schedules reserved.</p>";
    } else {
        horariosReservadosDiv.innerHTML += reservas
            .map(
                (reserva, index) => `
                <div style="margin-bottom: 10px;">
                    <p>
                        Class: ${reserva.clase}, Day: ${reserva.dia}, Time: ${reserva.hora}, Phone: ${reserva.telefono}
                    </p>
                    <button onclick="editarReserva(${index})">Edit</button>
                    <button onclick="borrarReserva(${index})">Delete</button>
                </div>
            `
            )
            .join("");
    }
}

function editarReserva(index) {
    const reserva = reservas[index];
    const newName = prompt("Enter new name:", reserva.nombre || "");
    const newDay = prompt("Enter new day (yyyy-mm-dd):", reserva.dia || "");
    const newTime = prompt("Enter new time (hh:mm):", reserva.hora || "");
    const newPhone = prompt("Enter new phone number:", reserva.telefono || "");

    if (newName && newDay && newTime && newPhone) {
        reservas[index] = { clase: reserva.clase, dia: newDay, hora: newTime, telefono: newPhone };
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarHorariosReservados();
        output.innerHTML = "<p style='color: green;'>Reservation updated successfully.</p>";
    } else {
        alert("All fields are required. Action canceled.");
    }
}

function borrarReserva(index) {
    if (confirm("Are you sure you want to delete this reservation?")) {
        reservas.splice(index, 1);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarHorariosReservados();
        output.innerHTML = "<p style='color: red;'>Reservation deleted.</p>";
    }
}

function cancelarReserva() {
    formularioReserva.style.display = "none";
    output.innerHTML = "<p>Reservation canceled. You can select another class.</p>";
}

function vaciarReservas() {
    if (confirm("Are you sure you want to delete all reservations?")) {
        reservas = [];
        localStorage.removeItem("reservas");
        mostrarHorariosReservados();
        output.innerHTML = "<p style='color: red;'>All reservations have been deleted.</p>";
    }
}