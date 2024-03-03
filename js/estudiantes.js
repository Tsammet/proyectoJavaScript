// ESTA LÍNEA LA UTILIZO PARA CREAR NUEVOS DATOS Y CARGARLOS 
const listaEstudiantes = []

const cargarFormularioEstudiantes = async () => {

    await loadProgramas();

    const estudiantesForm = document.getElementById('estudiantes-form');
    estudiantesForm.innerHTML = `
    <form>
    
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
        
        
        <button type = "button" onclick = "crearEstudiante()">Agregar Estudiante</button>
        <button type = "button" onclick = "mostrarListadoEstudiantes()">Ver los Estudiantes</button>
        
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
        opcionesProgramas += `<option value = ${programa.id}>${programa.nombre}</options>`
    }

    return opcionesProgramas
}

const mostrarListadoEstudiantes = async() => {
    await loadEstudiantes();
    const estudiantesForm = document.getElementById('estudiantes-form');
    const listadoEstudiantes = document.getElementById('listado-estudiantes');
    
    estudiantesForm.style.display = "none";
    listadoEstudiantes.style.display = "block";

    const ul = document.createElement('ul')

    for (const estudiante of listaEstudiantes){
        const li = document.createElement('li')
        li.textContent = `ID : ${estudiante.id} Nombre Estudiante: ${estudiante.nombre + " " + estudiante.apellido} 
        Tipo Documento: ${estudiante.tipo_documento} Numero Documento: ${estudiante.numero_documento} Ciudad Residencia: ${estudiante.ciudad_residencia}
        Direccion: ${estudiante.direccion} Telefono: ${estudiante.telefono} Fecha Nacimiento: ${estudiante.fecha_nacimiento} Genero: ${estudiante.sexo}
        Programa: ${estudiante.programa_id}`
        ul.appendChild(li)
    }

    listadoEstudiantes.innerHTML = '';
    listadoEstudiantes.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverAlFormulario);
    listadoEstudiantes.appendChild(volverButton);


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
