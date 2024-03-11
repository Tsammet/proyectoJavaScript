const listaMatriculas = [];

const cargarFormularioMatriculas = async () => {
    
    await loadMatriculas()

    const matriculasForm = document.getElementById('matriculas-form');
    matriculasForm.innerHTML = `
    <form>

    <div id="matriculas-form-container">
    <div id="matriculas-formulario">

    <h1> Nueva Matricula </h1>

    
        <label for = "estudiante_id">Estudiante ID </label>
        <select  id = "estudiante_id" required>
            ${estudianteMatricula()}        
       </select>

       <div id = "asignaturas-container">
       </div>


       <label for = "periodo_id">Periodo ID </label>
       <select type = "select" id = "periodo_id" required>
            ${periodoMatricula()}
       </select>

        <br>
        
        <button type="button" onclick="agregarAsignatura()">Agregar asignatura</button>

        <br>
        
        <button type="button" onclick="crearMatricula()">Crear Matricula</button>
        
        <br>

       <button type="button" onclick="mostrarListadoMatriculas()">Mostrar Matricula</button>


    </form>
    `

    
    const listadoMatriculas = document.getElementById('listado-matriculas');
    listadoMatriculas.style.display = "none"

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
    const matriculasForm = document.getElementById('matriculas-form');

    matriculasForm.style.display = "none";
    listadoMatriculas.style.display = "block";

    const tablaMatriculas = document.getElementById('tablaMatriculas')
    tablaMatriculas.innerHTML = `` 


    for (const matricula of listaMatriculas){
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${matricula.id}</td>
        <td>${matricula.estudiante_id}</td>            
        <td>${matricula.asignaturas}</td>
        <td>${matricula.periodo_id}</td>            
        <td>${matricula.precio}</td>
    
        `
        tablaMatriculas.appendChild(tr)
    }

    const existingButton = listadoMatriculas.querySelector('#volverButton');
    if (!existingButton) {


        const volverButton=document.createElement('button');
        volverButton.textContent='Volver al Formulario';
        volverButton.id = 'volverButton'
        volverButton.addEventListener('click',volverAlFormularioMatriculas);
        listadoMatriculas.appendChild(volverButton);
    }


}

const volverAlFormularioMatriculas = () => {

    const matriculasForm = document.getElementById('matriculas-form');
    const listadoMatriculas = document.getElementById('listado-matriculas');

    matriculasForm.style.display = "block";
    listadoMatriculas.style.display = "none";

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
        opcionesPeriodo += `<option value = ${periodo.id}> ${periodo.codigo}</option>`
    }

    return opcionesPeriodo
}

const crearMatricula = async () => {

    const estudianteIdInput = document.getElementById('estudiante_id')
    const periodoIdInput = document.getElementById('periodo_id')

    const estudianteId = estudianteIdInput.value;
    const periodoId = periodoIdInput.value;


    const asignaturas  = [];
    const asignaturasInput = document.querySelectorAll('.asignaturaClass');
    
    for (const asignaturaInput of asignaturasInput) {
        const asignaturaIdInput = asignaturaInput.value;
        if (asignaturas.includes(asignaturaIdInput)) {
            alert("Esta Matricula no se puede registrar debido a que estás registrando dos veces la misma asignatura");
            return;
        }
        asignaturas.push(asignaturaIdInput);
    }

    
    let precioMatricula = 0;

    asignaturas.forEach(asignatura_id => {
        const asignatura = listaAsignaturas.find((element) => element.id === asignatura_id)
        const tarifaAsignatura = listaTarifas.find((tarifa) => tarifa.programa_id === asignatura.programa_id &&
        tarifa.periodo_id === parseInt(periodoId))
        const precioAsignatura = tarifaAsignatura.costo_credito * asignatura.creditos 
        precioMatricula += precioAsignatura
    });


    const nuevaMatricula = {
        id : listaMatriculas.length + 1,
        estudiante_id : estudianteId,
        asignaturas : asignaturas,
        periodo_id : parseInt(periodoId),
        precio : precioMatricula

    }

    await guardarMatriculaJson(nuevaMatricula)
    await loadMatriculas()

    estudianteIdInput.value = '';
    periodoIdInput.value = '';
    asignaturasInput.forEach(asignaturaInput => {
    asignaturaInput.value = '';
});



    alert('Matricula Registrada con Exito! :D')

    return nuevaMatricula
    
}

const guardarMatriculaJson = async (nuevaMatricula) => {

    try {
        const respuesta = await fetch('http://localhost:3000/matriculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaMatricula),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar el matriculas. Estado: ', respuesta.status);
        }
        const matriculaCreada = await respuesta.json();

        console.log('Matricula registrado:', matriculaCreada);


    } catch (error) {
        console.log("Error al cargar Matriculas", error.meesage)
        
    }
    
    
}


const agregarAsignatura = () => {

    const asignaturasContainer = document.getElementById('asignaturas-container');
    const nuevaAsignatura = document.createElement('div');
    nuevaAsignatura.classList.add('asignatura');
    nuevaAsignatura.innerHTML = `
    <label for = "asignaturaClass">Asignatura ID </label>
    <select type = "select" class = "asignaturaClass" required>
         ${asignaturaMatricula()}
    </select>
    `;

    asignaturasContainer.appendChild(nuevaAsignatura);

};

