const listaProfesores = [];

const cargarFormularioProfesores = async () => {

    await loadDepartamentos()

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

        <label for="departamentoProfesor">Departamento:</label>
            <select id="departamentoProfesor" required>
            ${departamentoProfesor()}
        </select>

        <button type = "button" onclick = "crearProfesor()">Agregar Docente</button>
        <button type = "button" onclick = "mostrarListadoProfesores()">Mostrar Docentes</button>

    </form>
    `;
}

const mostrarListadoProfesores = async () => {
    await loadProfesor();
    const profesoresForm = document.getElementById('profesores-form');
    const listadoProfesores = document.getElementById('listado-profesores');

    profesoresForm.style.display = "none";
    listadoProfesores.style.display = "block";

    const ul = document.createElement('ul');

    for (const profesor of listaProfesores){
        const li = document.createElement('li');
        li.textContent = `ID: ${profesor.id} Nombres: ${profesor.nombre + " " + profesor.apellido}
        Tipo Documento: ${profesor.tipo_documento} Número Documento: ${profesor.numero_documento} Departamento ID: ${profesor.departamento_id}`
        ul.appendChild(li)
    }

    listadoProfesores.innerHTML = '';
    listadoProfesores.appendChild(ul)

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverAlFormularioProfesores);
    listadoProfesores.appendChild(volverButton);

}

const volverAlFormularioProfesores = () => {

    const profesoresForm = document.getElementById('profesores-form');
    const listadoProfesores = document.getElementById('listado-profesores');

    profesoresForm.style.display = "block";
    listadoProfesores.style.display = "none";

}

const crearProfesor = async () => {

    const tipoDocumentoInput = document.getElementById('tipoDocumento');
    const numeroDocumentoInput = document.getElementById('numeroDocumento');
    const nombreProfesorInput = document.getElementById('nombreProfesor');
    const apellidoProfesorInput = document.getElementById('apellidoProfesor');
    const departamentoProfesorSelect = document.getElementById('departamentoProfesor')

    const tipoDocumento = tipoDocumentoInput.value;
    const numeroDocumento = numeroDocumentoInput.value;
    const nombreProfesor = nombreProfesorInput.value;
    const apellidoProfesor = apellidoProfesorInput.value;
    const departamentoProfesor = departamentoProfesorSelect.value;


    const nuevoProfesor = {
        id: listaProfesores.length + 1,
        tipo_documento: tipoDocumento,
        numero_documento: numeroDocumento,
        nombre: nombreProfesor,
        apellido: apellidoProfesor,
        departamento_id : departamentoProfesor,
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

const departamentoProfesor = () => {
    let opcionesDepartamento = '';
    for(const departamento of listaDepartamentos){
        opcionesDepartamento += `<option value = ${departamento.id}>${departamento.nombre}</options>`
    }

    return opcionesDepartamento
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
