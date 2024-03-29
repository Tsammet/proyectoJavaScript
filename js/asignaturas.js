const listaAsignaturas = [];

const cargarFormularioAsignaturas = async () => {

    await loadCursos();

    const formularioAsignaturas = document.getElementById('asignaturas-form');
    formularioAsignaturas.innerHTML = `
    <form>

    <div id="asignaturas-form-container">
        <div id="asignaturas-formulario">

        <h1> Nueva Asignatura </h1>


        <label for="cursoAsignatura">Curso:</label>
        <select id="cursoAsignatura" required>
            ${cursoAsignatura()}
        </select>

        <label for="codigoAsignatura">Código:</label>
        <input type="text" id="codigoAsignatura" required>

        <label for="creditos">Créditos:</label>
        <input type="number" id="creditos" required>

        <label for="profesorAsignatura">Profesor:</label>
        <select id="profesorAsignatura" required>
            ${profesorAsignatura()}
        </select>

        <label for="cuposDisponibles">Cupos Disponibles:</label>
        <input type="number" id="cuposDisponibles" required>

        <label for="programaAsignatura">Programa:</label>
        <select id="programaAsignatura" required>
            ${programaAsignatura()}
        </select>

        <div id="horarios-container">
        </div>

        <br>
        
        <button type="button" onclick="agregarHorario()">Agregar Horario</button>
        
        <br>

        <button type="button" onclick="crearAsignatura()">Agregar Asignatura</button>

        <br>
        
        <button type="button" onclick="mostrarListadoAsignaturas()">Mostrar Asignaturas</button>
        
        </form>
        `;

        
    const listadoAsignaturas = document.getElementById('listado-asignaturas');
    listadoAsignaturas.style.display = "none"
    };
    
const crearAsignatura = async () => {

    const codigoAsignaturaInput = document.getElementById('codigoAsignatura');
    const creditosInput = document.getElementById('creditos');
    const cuposDisponiblesInput = document.getElementById('cuposDisponibles');
    const cursoAsignaturaSelect = document.getElementById('cursoAsignatura')
    const profesorAsignaturaSelect = document.getElementById('profesorAsignatura')
    const programaAsignaturaSelect = document.getElementById('programaAsignatura')


    const cursoAsignatura = cursoAsignaturaSelect.value;
    const profesorAsignatura = profesorAsignaturaSelect.value;
    const programaAsignatura = programaAsignaturaSelect.value;
    const codigoAsignatura = codigoAsignaturaInput.value;
    const creditos = creditosInput.value;
    const cuposDisponibles = cuposDisponiblesInput.value;

    let horaInicio = ""
    let horaFin = ""
    const horarios = [];
    const horariosInputs = document.querySelectorAll('.horario');
    horariosInputs.forEach(horarioInput => {
        const diaSemana = horarioInput.querySelector('.diaSemana').value;
        const salonHora = horarioInput.querySelector('.salonHorarioAsignatura').value;
        if(horarioInput.querySelector('.franja-horaria').value === "horario1"){
            horaInicio = "6:00 am"
            horaFin = "8:00 am"

        }else if(horarioInput.querySelector('.franja-horaria').value === "horario2"){
            horaInicio = "8:00 am"
            horaFin = "10:00 am"

        }else if(horarioInput.querySelector('.franja-horaria').value === "horario3"){
            horaInicio = "10:00 am"
            horaFin = "12:00 pm"

        }else if(horarioInput.querySelector('.franja-horaria').value === "horario4"){
             horaInicio = "12:00 pm"
             horaFin = "2:00 pm"

        }
        else if(horarioInput.querySelector('.franja-horaria').value === "horario5"){
             horaInicio = "2:00 pm"
             horaFin = "4:00 pm"

        }else if(horarioInput.querySelector('.franja-horaria').value === "horario6"){
             horaInicio = "4:00 pm"
             horaFin = "6:00 pm"

        }
        horarios.push({ dia: diaSemana, hora_inicio: horaInicio, hora_fin: horaFin, salon_id : salonHora });
    });
    
    for (const asignatura of listaAsignaturas) {
        for (const horario of asignatura.horario_clases) {
            for (const nuevoHorario of horarios) {

                if (horario.dia === nuevoHorario.dia && horario.salon_id === nuevoHorario.salon_id) {
                    
                    const horaInicioAsignatura = parseInt(horario.hora_inicio.split(':')[0]);
                    const minutosInicioAsignatura = parseInt(horario.hora_inicio.split(':')[1]);
                    const horaFinAsignatura = parseInt(horario.hora_fin.split(':')[0]);
                    const minutosFinAsignatura = parseInt(horario.hora_fin.split(':')[1]);
        
                    const horaInicioNuevo = parseInt(nuevoHorario.hora_inicio.split(':')[0]);
                    const minutosInicioNuevo = parseInt(nuevoHorario.hora_inicio.split(':')[1]);
                    const horaFinNuevo = parseInt(nuevoHorario.hora_fin.split(':')[0]);
                    const minutosFinNuevo = parseInt(nuevoHorario.hora_fin.split(':')[1]);
        
                    // Comparar las horas y minutos
                    if ((horaInicioNuevo * 60 + minutosInicioNuevo >= horaInicioAsignatura * 60 + minutosInicioAsignatura && horaInicioNuevo * 60 + minutosInicioNuevo < horaFinAsignatura * 60 + minutosFinAsignatura) ||
                        (horaFinNuevo * 60 + minutosFinNuevo > horaInicioAsignatura * 60 + minutosInicioAsignatura && horaFinNuevo * 60 + minutosFinNuevo <= horaFinAsignatura * 60 + minutosFinAsignatura)) {
                        // Horarios se cruzan, mostrar mensaje de error y evitar la creación de la asignatura
                        alert('El horario seleccionado se cruza con otra asignatura existente en el mismo salón.');
                        return;
                    }
                }
            }
        }
    }


    const nuevaAsignatura = {
        id: listaAsignaturas.length + 1,
        curso_id: cursoAsignatura,
        codigo: codigoAsignatura,
        creditos: creditos,
        profesor_id : profesorAsignatura,
        cupos_disponibles: cuposDisponibles,
        programa_id : programaAsignatura,
        horario_clases: horarios
    }

    await loadAsignaturas();
    await guardarAsignaturaJson(nuevaAsignatura);

    codigoAsignaturaInput.value = ''
    cursoAsignaturaSelect.value = ''
    profesorAsignaturaSelect.value = ''
    creditosInput.value = ''
    cuposDisponiblesInput.value = ''
    programaAsignaturaSelect.value = ''


    alert('Nueva Asignatura creada con exito!')

    return nuevaAsignatura
}

const cursoAsignatura = () => {

    let opcionesCursos = '';
    for (const curso of listaCursos) {
        opcionesCursos += `<option value = ${curso.id}>${curso.nombre}</options>`
    }

    return opcionesCursos
}

const profesorAsignatura = () => {

    let opcionesProfesores = '';
    for (const profesor of listaProfesores) {
        opcionesProfesores += `<option value = ${profesor.id}>${profesor.nombre + " " + profesor.apellido}</options>`
    }

    return opcionesProfesores
}

const programaAsignatura = () => {

    let programaAsignatura = '';
    for (const programa of listaProgramas) {
        programaAsignatura += `<option value = ${programa.id}>${programa.nombre}</options>`
    }

    return programaAsignatura
}

const salonHorarioPrograma = () => {

    let salonAsignatura = '';

    for (const salon of listaSalones){
        salonAsignatura +=  `<option value = ${salon.id}>${salon.numero_identificacion}</options>`
    }

    return salonAsignatura

}

const mostrarListadoAsignaturas = async () => {
    
    const asignaturasForm = document.getElementById('asignaturas-form')
    const listadoAsignaturas = document.getElementById('listado-asignaturas')

    asignaturasForm.style.display = "none";
    listadoAsignaturas.style.display = "block";


    const tablaAsignaturas = document.getElementById('tablaAsignaturas')
    tablaAsignaturas.innerHTML = `` 
    
    for (const asignatura of listaAsignaturas) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${asignatura.id}</td>
        <td>${asignatura.curso_id}</td>
        <td>${asignatura.codigo}</td>            
        <td>${asignatura.creditos}</td>
        <td>${asignatura.profesor_id}</td>
        <td>${asignatura.cupos_disponibles}</td>            
        <td>${asignatura.programa_id}</td>            
        `
        const horarioInfo = asignatura.horario_clases.map(horario => `DÍA: ${horario.dia} HORA INICIO: ${horario.hora_inicio} HORA FIN: ${horario.hora_fin} SALÓN: ${horario.salon_id}`).join('<br>');
        const horarioElement = document.createElement('td');
        horarioElement.innerHTML = horarioInfo;


        tr.appendChild(horarioElement);
        tablaAsignaturas.appendChild(tr)
    }


    
    const existingButton = listadoAsignaturas.querySelector('#volverButton');
    if (!existingButton) {

        const volverButton = document.createElement('button');
        volverButton.textContent = 'Volver al Formulario';
        volverButton.id = 'volverButton'
        volverButton.addEventListener('click', volverAlFormularioAsignaturas);
        listadoAsignaturas.appendChild(volverButton);
    }
}

const volverAlFormularioAsignaturas = () => {


    const asignaturasForm = document.getElementById('asignaturas-form');
    const listadoAsignaturas = document.getElementById('listado-asignaturas');

    asignaturasForm.style.display = "block";
    listadoAsignaturas.style.display = "none";
}

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

        <label for="franja-horaria">Horario:</label>
        <select class="franja-horaria" required>
            <option value = "horario1"> 6:00 am - 8:00 am </option>
            <option value = "horario2"> 8:00 am - 10:00 pm </option>
            <option value = "horario3"> 10:00 am - 12:00 pm </option>
            <option value = "horario4"> 12:00 pm - 2:00 pm </option>
            <option value = "horario5"> 2:00 pm - 4:00 pm </option>
            <option value = "horario6"> 4:00 pm - 6:00 pm </option>
        </select>

        <label for="salonHorarioAsignatura">Salón:</label>
        <select class="salonHorarioAsignatura" required>
            ${salonHorarioPrograma()}
        </select>
    `;

    horariosContainer.appendChild(nuevoHorario);

};

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
        listaAsignaturas.length = 0;
        const respuesta = await fetch('http://localhost:3000/asignaturas');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Asignaturas. Estado', respuesta.status);
        }

        // si la respuesta del servidor es exitosa se convierte la respuesta en formato json y los objetos se guardan en departamentos <3
        const asignatura = await respuesta.json();
        listaAsignaturas.push(...asignatura);

        
    } catch (error) {
        console.error("Error al cargar Asignatura", error.meesage)
    }
    
    return cargarFormularioAsignaturas()

}
