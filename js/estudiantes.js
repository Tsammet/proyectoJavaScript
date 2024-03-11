// ESTA LÍNEA LA UTILIZO PARA CREAR NUEVOS DATOS Y CARGARLOS
const listaEstudiantes = []

const cargarFormularioEstudiantes = async () => {

    await loadProgramas();

    const estudiantesForm = document.getElementById('estudiantes-form');
    estudiantesForm.innerHTML = `
    <form>

    <div id="estudiantes-form-container">
        <div id="estudiantes-formulario">

        <h1> Nuevo Estudiante </h1>

        <label for = "nombreEstudiante">Nombres: </label>
        <input type = "text" id = "nombreEstudiante" required>

        <label for = "apellidosEstudiante">Apellidos: </label>
        <input type = "text" id = "apellidoEstudiante" required>

        <label for = "tipoDocumentoEstudiante">Tipo de documento: </label>
        <select type = "select" id = "tipoDocumentoestudiante" required>
            <option value="">Selecciona un tipo de documento</option>
            <option value="CC">Cédula Cidadana</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Carnet de identidad">Carnet de identidad</option>
        </select>

        <label for = "numeroDocumentoEstudiante">Número Documento: </label>
        <input type = "number" id = "numeroDocumentoEstudiante" required>

        <label for = "ciudadResidenciaEstudiante">Ciudad De Residencia: </label>
        <input type = "text" id = "ciudadResidenciaEstudiante" required>

        <label for = "direccionEstudiante">Dirección: </label>
        <input type = "text" id = "direccionEstudiante" required>

        <label for = "telefonoEstudiante">Telefono: </label>
        <input type = "number" id = "telefonoEstudiante" required>

        <label for = "fechaNacimientoEstudiante">Fecha Nacimiento: </label>
        <input type = "date" id = "fechaNacimientoEstudiante" required>

        <label for = "generoEstudiante">Género: </label>
        <select type = "select" id = "generoEstudiante" required>
            <option value="">Selecciona un tipo de documento</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
        </select>


        <label for="programaEstudiante">Programa:</label>
        <select id="programaEstudiante" required>
            ${programaEstudiante()}
        </select>

        <br>

        <button type = "button" id = "botonCrearEstudiante" onclick = "crearEstudiante()">Agregar Estudiante</button>
        <br>
        <button type = "button" onclick = "mostrarListadoEstudiantes()">Ver los Estudiantes</button>
    </div>
    </div>
        </form>
        `;

        const listadoEstudiantes = document.getElementById('listado-estudiantes');
        listadoEstudiantes.style.display = "none"


    }

const crearEstudiante = async () => {

        const nombreEstudianteInput = document.getElementById('nombreEstudiante');
        const apellidoEstudianteInput = document.getElementById('apellidoEstudiante');
        const tipoDocumentoEstudianteInput = document.getElementById('tipoDocumentoestudiante');
        const numeroDocumentoEstudianteInput = document.getElementById('numeroDocumentoEstudiante');
        const ciudadResidenciaEstudianteInput = document.getElementById('ciudadResidenciaEstudiante');
        const direccionEstudianteInput = document.getElementById('direccionEstudiante');
        const telefonoEstudianteInput = document.getElementById('telefonoEstudiante');
        const fechaNacimientoEstudianteInput = document.getElementById('fechaNacimientoEstudiante');
        const generoEstudianteInput = document.getElementById('generoEstudiante');
        const programaEstudianteSelect = document.getElementById('programaEstudiante')


        const nombreEstudiante = nombreEstudianteInput.value;
        const apellidoEstudiante = apellidoEstudianteInput.value;
        const tipoDocumentoestudiante = tipoDocumentoEstudianteInput.value;
        const numeroDocumentoEstudiante = numeroDocumentoEstudianteInput.value;
        const ciudadResidenciaEstudiante = ciudadResidenciaEstudianteInput.value;
        const direccionEstudiante = direccionEstudianteInput.value;
        const telefonoEstudiante = telefonoEstudianteInput.value;
        const fechaNacimientoEstudiante = fechaNacimientoEstudianteInput.value;
        const generoEstudiante = generoEstudianteInput.value;
        const programaEstudiante = programaEstudianteSelect.value;

        const nuevoEstudiante = {

            id: listaEstudiantes.length + 1,
            nombre: nombreEstudiante,
            apellido: apellidoEstudiante,
            tipo_documento: tipoDocumentoestudiante,
            numero_documento: numeroDocumentoEstudiante,
            ciudad_residencia: ciudadResidenciaEstudiante,
            direccion: direccionEstudiante,
            telefono: telefonoEstudiante,
            fecha_nacimiento: fechaNacimientoEstudiante,
            sexo: generoEstudiante,
            programa_id : programaEstudiante

        };

        // SE UTILIZA ESTA FUNCIÓN PARA GUARDAR EL NUEVO DEPARTAMENTO
        await guardarEstudiantesJson(nuevoEstudiante);

        // se llama esta función pararecargar la lista de departamentos desde el servidor.
        // Esto asegura que la lista de departamentos se actualice cn la que se acabó de crear
        await loadEstudiantes();

        nombreEstudianteInput.value = '';
        apellidoEstudianteInput.value = '';
        tipoDocumentoEstudianteInput.value = '';
        numeroDocumentoEstudianteInput.value = '';
        ciudadResidenciaEstudianteInput.value = '';
        direccionEstudianteInput.value = '';
        telefonoEstudianteInput.value = '';
        fechaNacimientoEstudianteInput.value = '';
        generoEstudianteInput.value = '';


        alert('Estudiante Registrado Con Exito! :D');

        return nuevoEstudiante;
    }

const programaEstudiante = () => {

    let opcionesProgramas = '';
    for(const programa of listaProgramas){
        opcionesProgramas += `<option value = ${programa.id}>${programa.nombre}</option>`
    }

    return opcionesProgramas
}

const mostrarListadoEstudiantes = async() => {
    await loadEstudiantes();
    const estudiantesForm = document.getElementById('estudiantes-form');
    const listadoEstudiantes = document.getElementById('listado-estudiantes');

    estudiantesForm.style.display = "none";
    listadoEstudiantes.style.display = "block";

    const tablaEstudiantes = document.getElementById('tablaEstudiantes')
    tablaEstudiantes.innerHTML = `` 


    for (const estudiante of listaEstudiantes){
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <td>${estudiante.id}</td>
        <td>${estudiante.nombre}</td>            
        <td>${estudiante.tipo_documento}</td>
        <td>${estudiante.numero_documento}</td>            
        <td>${estudiante.ciudad_residencia}</td>
        <td>${estudiante.direccion}</td>            
        <td>${estudiante.telefono}</td>
        <td>${estudiante.fecha_nacimiento}</td>
        <td>${estudiante.sexo}</td>
        <td>${estudiante.programa_id}</td>
        `

        
        tablaEstudiantes.appendChild(tr)
    }


    const existingButton = listadoEstudiantes.querySelector('#volverButton');
    if (!existingButton) {

        const volverButton=document.createElement('button');
        volverButton.textContent='Volver al Formulario';
        volverButton.id = 'volverButton'
        volverButton.addEventListener('click',volverAlFormulario);
        listadoEstudiantes.appendChild(volverButton);
    }

}

const volverAlFormulario = () => {

    const estudiantesForm = document.getElementById('estudiantes-form');
    const listadoEstudiantes = document.getElementById('listado-estudiantes');

    estudiantesForm.style.display = "block";
    listadoEstudiantes.style.display = "none";

}

const loadEstudiantes = async () => {

    try {
        listaEstudiantes.length = 0;
        const respuesta = await fetch('http://localhost:3000/alumnos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Estudiantes. Estado', respuesta.status);
        }

        // si la respuesta del servidor es exitosa se convierte la respuesta en formato json y los objetos se guardan en departamentos <3
        const estudiantes = await respuesta.json();
        listaEstudiantes.push(...estudiantes);


    } catch (error) {
        console.error("Error al cargar Estudiantes", error.meesage)
    }

}

const guardarEstudiantesJson = async (nuevoEstudiante) => {
    try {
        const respuesta = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEstudiante),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar el estudiante. Estado: ', respuesta.status);
        }

        const estudianteCreado = await respuesta.json();

        console.log('Estudiante registrado:', estudianteCreado);


    } catch (error) {
        console.log("Error al cargar Estudiantes", error.meesage)
    }
}
