const listaMatriculas = [];

const cargarFormularioMatriculas = async () => {
    
    await loadMatriculas()

    const matriculasForm = document.getElementById('matriculas-form');
    matriculasForm.innerHTML = `
    <form>
        <label for = "estudiante_id">Estudiante ID </label>
        <select  id = "estudiante_id" required>
            ${estudianteMatricula()}        
       </select>

       <label for = "asignatura_id">Asignatura ID </label>
       <select type = "select" id = "asignatura_id" required>
            ${asignaturaMatricula()}
       </select>

       <label for = "periodo_id">Periodo ID </label>
       <select type = "select" id = "periodo_id" required>
            ${periodoMatricula()}
       </select>

       <label for = "precio"> Precio </label>
       <input type = "number" id = "precio" required>


    </form>
    `
}



const loadMatriculas = async () => {

    try {
        listaMatriculas.length = 0;
        const respuesta = await fetch('http://localhost:3000/matriculas');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Matriculas. Estado', respuesta.status);
        }

        const matriculas = await respuesta.json();
        listaMatriculas.push(...matriculas);

    } catch (error) {
        console.error("Error al cargar Matriculas", error.message)
    }

}

const mostrarListadoMatriculas = async () => {
    await loadMatriculas();
    const listadoMatriculas = document.getElementById('listado-matriculas');
    listadoMatriculas.innerHTML = ''

    const ul = document.createElement('ul');

    for (const matricula of listaMatriculas){
        const li = document.createElement('li');
        li.textContent = `ID: ${matricula.id} Estudiante ID: ${matricula.estudiante_id} Asignatura ID: ${matricula.asignatura_id}
        , Periodo ID: ${matricula.periodo_id}, Precio ${matricula.precio}`
        ul.appendChild(li)
    }

    listadoMatriculas.appendChild(ul)

}

const estudianteMatricula = () => {

    let opcionesEstudiantes = '';

    for (const estudiante of listaEstudiantes){
        opcionesEstudiantes += `<option value = "${estudiante.id}"> ${estudiante.nombre} </option>`
    }

    return opcionesEstudiantes;

}

const asignaturaMatricula = () => {

    let opcionesAsignaturas = '';
    
    for (const asignatura of listaAsignaturas){

        opcionesAsignaturas += `<option value = "${asignatura.id}"> ${asignatura.codigo} </option>`

    }

    return opcionesAsignaturas;

}

const periodoMatricula = () => {

    let opcionesPeriodo = '';

    for (const periodo of listaPeriodos){
        opcionesPeriodo += `<option value = ${periodo.id}"> ${periodo.codigo}</option>`
    }

    return opcionesPeriodo
}

const crearMatricula = async () => {

    const estudianteIdInput = document.getElementById('estudiante_id')
    const asignaturaIdInput = document.getElementById('asignatura_id')
    const periodoIdInput = document.getElementById('periodo_id')
    const precioInput = document.getElementById('precio')

    const estudianteId = estudianteIdInput.value;
    const asignaturaId = asignaturaIdInput.value;
    const periodoId = periodoIdInput.value;
    const precio = precioInput.value;

    const nuevaMatricula = {
        id : listaMatriculas.length + 1,
        estudiante_id : estudianteId,
        asignatura_id : asignaturaId,
        periodo_id : periodoId,
        precio : precio

    }

    estudianteIdInput.value = '';
    asignaturaIdInput.value = '';
    periodoIdInput.value = '';
    precioInput.value = '';

    alert('Matricula Registrada con Exito! :D')

    return nuevaMatricula
    
}