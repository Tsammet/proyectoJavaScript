const listadoAsignaturas = [];

const cargarFormularioAsignaturas = () => {
    const formularioAsignaturas = document.getElementById('asignaturas-form');
    formularioAsignaturas.innerHTML = `
        <form>
            <label for="codigoAsignatura">Código:</label>
            <input type="text" id="codigoAsignatura" required>

            <label for="creditos">Créditos:</label>
            <input type="number" id="creditos" required>

            <label for="cuposDisponibles">Cupos Disponibles:</label>
            <input type="number" id="cuposDisponibles" required>

            <div id="horarios-container">
            </div>

            <button type="button" onclick="agregarHorario()">Agregar Horario</button>
            <button type="button" onclick="crearAsignatura()">Agregar Asignatura</button>
        </form>
    `;
};
const agregarHorario = () => {
    const horariosContainer = document.getElementById('horarios-container');
    const nuevoHorario = document.createElement('div');
    nuevoHorario.classList.add('horario');
    nuevoHorario.innerHTML = `
        <label for="diaSemana">Día de la Semana:</label>
        <select class="diaSemana">
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <option value="miercoles">Miércoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
        </select>

        <label for="horaInicio">Hora de Inicio:</label>
        <input type="time" class="horaInicio" required>

        <label for="horaFin">Hora de Finalización:</label>
        <input type="time" class="horaFin" required>
    `;
    horariosContainer.appendChild(nuevoHorario);
};



const crearAsignatura = async () => {

    const codigoAsignaturaInput = document.getElementById('codigoAsignatura');
    const creditosInput = document.getElementById('creditos');
    const cuposDisponiblesInput = document.getElementById('cuposDisponibles');


    const codigoAsignatura = codigoAsignaturaInput.value;
    const creditos = creditosInput.value;
    const cuposDisponibles = cuposDisponiblesInput.value;


    const horarios = [];
    const horariosInputs = document.querySelectorAll('.horario');
    horariosInputs.forEach(horarioInput => {
        const diaSemana = horarioInput.querySelector('.diaSemana').value;
        const horaInicio = horarioInput.querySelector('.horaInicio').value;
        const horaFin = horarioInput.querySelector('.horaFin').value;
        horarios.push({ dia: diaSemana, hora_inicio: horaInicio, hora_fin: horaFin });
    });


    const nuevaAsignatura = {
        id : listadoAsignaturas.length + 1,
        codigo : codigoAsignatura,
        creditos : creditos,
        cupos_disponibles : cuposDisponibles,
        horario_clases : horarios
    }

    await loadAsignaturas ();
    await guardarAsignaturaJson(nuevaAsignatura);

    codigoAsignaturaInput.value = ''
    creditosInput.value = ''
    cuposDisponiblesInput.value = ''


    alert('Nueva Asignatura creada con exito!')

    return nuevaAsignatura
}


const guardarAsignaturaJson = async (nuevaAsignatura) => {
    try {
        const respuesta = await fetch('http://localhost:3000/asignaturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaAsignatura),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar la nueva asignatura. Estado: ', respuesta.status);
        }

        const asignaturaCreada = await respuesta.json();

        console.log('asignatura registrada:', asignaturaCreada);


    } catch (error) {
        console.log("Error al cargar Asignaturas", error.meesage)
    }
}

const loadAsignaturas = async () => {

    try {
        listadoAsignaturas.length = 0;
        const respuesta = await fetch('http://localhost:3000/asignaturas');

        if (!respuesta.ok) {
            throw new Error('Error al cargar nueva Asingatura. Estado', respuesta.status);
        }

        // si la respuesta del servidor es exitosa se convierte la respuesta en formato json y los objetos se guardan en departamentos <3
        const asignatura = await respuesta.json();
        listadoAsignaturas.push(...asignatura);

    } catch (error) {
        console.error("Error al cargar nueva Asignatura", error.meesage)
    }
}
