const listaProfesores = [];

const cargarFormularioProfesores = () => {

    const profesoresForm = document.getElementById('profesores-form');
    profesoresForm.innerHTML = `
    <form>

        <label for = "tipoDocumento" >Tipo Documento: </label>
        <select type = "select" id = "tipoDocumento" required>
            <option value="">Selecciona un tipo de documento</option>
            <option value="CC">Cédula Cidadana</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Carnet de identidad">Carnet de identidad</option>
        </select>

        <label for = "numeroDocumento">Número Documento: </label>
        <input type = "number" id = "numeroDocumento" required> 

        <label for = "nombreProfesor">Nombres: </label>
        <input type = "text" id = "nombreProfesor" required> 

        <label for = "apellidosProfesor">Apellidos: </label>
        <input type = "text" id = "apellidoProfesor" required> 

        <button type = "button" onclick = "crearProfesor()">Agregar Docente</button>

    </form>
    `;
}

const crearProfesor = async () => {

    const tipoDocumentoInput = document.getElementById('tipoDocumento');
    const numeroDocumentoInput = document.getElementById('numeroDocumento');
    const nombreProfesorInput = document.getElementById('nombreProfesor');
    const apellidoProfesorInput = document.getElementById('apellidoProfesor');

    const tipoDocumento = tipoDocumentoInput.value;
    const numeroDocumento = numeroDocumentoInput.value;
    const nombreProfesor = nombreProfesorInput.value;
    const apellidoProfesor = apellidoProfesorInput.value;

    const nuevoProfesor = {
        id: listaProfesores.length + 1,
        tipo_documento: tipoDocumento,
        numero_documento: numeroDocumento,
        nombre: nombreProfesor,
        apellido: apellidoProfesor,
    }

    await guardarProfesorJson(nuevoProfesor);
    await loadProfesor();

    tipoDocumentoInput.value = '';
    numeroDocumentoInput.value = '';
    nombreProfesorInput.value = '';
    apellidoProfesorInput.value = '';

    alert('Profesor Registrado Con Exito! :D');

    return nuevoProfesor

}

const guardarProfesorJson = async (nuevoProfesor) => {

    try {
        const respuesta = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProfesor),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar el profesor. Estado: ', respuesta.status);
        }
        const profesorCreado = await respuesta.json();

        console.log('Profesor registrado:', profesorCreado);


    } catch (error) {
        console.log("Error al cargar Profesores", error.meesage)
        
    }
    
}

const loadProfesor = async () => {
    try {
        listaProfesores.length = 0;
        const respuesta = await fetch('http://localhost:3000/profesores');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Docentes. Estado', respuesta.status);
        }

        // si la respuesta del servidor es exitosa se convierte la respuesta en formato json y los objetos se guardan en docentes <3
        const profesores = await respuesta.json();
        listaProfesores.push(...profesores);

    } catch (error) {
        console.error("Error al cargar Docentes", error.meesage)
    }
}
