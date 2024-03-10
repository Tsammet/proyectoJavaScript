const cargarInformes = () => {

    const informes = document.getElementById('botonesInformes')

    informes.innerHTML = `
    <form>

    <button type = "button" onclick = "mostrarHorarioEstudiante()">Mostrar Horario Estudiante</button>
    <button type = "button" onclick = "mostrarAsignaturaMasMatriculada()">Asignatura Más Matriculada</button>
    <button type = "button" onclick = "mostrarCostoTotalxPeriodo()">Total Por Periodo</button>
    
    </form>
        
    `

}

const asignaturaMasMatriculada = () => {

    let maximoContador = 0
    let materiaMasMatriculada = ''

    listaAsignaturas.forEach(asignatura => {

        let countAsignatura = 0

        listaMatriculas.forEach(matricula => {

            if (matricula.asignaturas.includes(asignatura.id)) {
                countAsignatura += 1
            }
        })

        if (countAsignatura > maximoContador) {
            maximoContador = countAsignatura
            materiaMasMatriculada = asignatura.id
        }

    })

    return materiaMasMatriculada


}

const mostrarAsignaturaMasMatriculada = () => {

    const botonesDeLosInformes = document.getElementById('botonesInformes')
    const masMatriculada = document.getElementById('asignaturaMasMatriculada')
    let mostrarMasMatriculad = masMatriculada.querySelector('.matriMasMatriculada');


    if (!mostrarMasMatriculad) { // Verifica si ya existe un elemento de resultado

        botonesDeLosInformes.style.display = "none";
        masMatriculada.style.display = "block"

        const mostrarResultado = document.createElement('div')
        mostrarResultado.classList.add('matriMasMatriculada')

        mostrarResultado.innerHTML = `
            <h1> la asignatura mas matriculada tiene el ID : ${asignaturaMasMatriculada()} </h1>
        `;

        masMatriculada.appendChild(mostrarResultado)

        const volverButton = document.createElement('button');
        volverButton.textContent = 'Volver a los Informes';
        volverButton.addEventListener('click', volverBotones);
        masMatriculada.appendChild(volverButton);

    }
}

const volverBotones = () => {

    const botonesDeLosInformes = document.getElementById('botonesInformes')
    const masMatriculada = document.getElementById('asignaturaMasMatriculada')
    const costoTotalPeriodo = document.getElementById('costoTotalxPer')
    const horarioxEstudiante = document.getElementById('horarioxEstudiante')


    botonesDeLosInformes.style.display = "block";
    masMatriculada.style.display = "none"
    costoTotalPeriodo.style.display = "none"
    horarioxEstudiante.style.display = "none"

    costoTotalPeriodo.innerHTML = "";
    masMatriculada.innerHTML = "";
    horarioxEstudiante.innerHTML = "";

}

const costoTotalMatriculasPorPeriodo = () => {

    const periodoIdInput = document.getElementById('costo_periodo_id')

    const periodoId = periodoIdInput.value

    let totalPrecioMatricula = 0

    listaMatriculas.forEach(matricula => {
        console.log("periodoId:", periodoId);
        console.log("matricula.periodo_id:", matricula.periodo_id);
        if (matricula.periodo_id === parseInt(periodoId)) {
            totalPrecioMatricula += matricula.precio
        }
    });

    alert(`El costo total del periodo ${periodoId} es : ${totalPrecioMatricula}`)

}

const mostrarCostoTotalxPeriodo = () => {

    const botonesDeLosInformes = document.getElementById('botonesInformes')
    const costoTotalPeriodo = document.getElementById('costoTotalxPer')
    let mostrarResultadoCosto = costoTotalPeriodo.querySelector('.costoTotal');

  
    if (!mostrarResultadoCosto) { 
        botonesDeLosInformes.style.display = "none";
        costoTotalPeriodo.style.display = "block";


        const mostrarResultadoCosto = document.createElement('div')
        mostrarResultadoCosto.classList.add('costoTotal')

        mostrarResultadoCosto.innerHTML = `

            <label for = "costo_periodo_id">Periodo ID </label>
            <select type = "select" id = "costo_periodo_id" required>
                ${periodoParaCosto()}
            </select>

            <button type = "button" onclick = "costoTotalMatriculasPorPeriodo()">GenerarTotal</button>

        `;

        costoTotalPeriodo.appendChild(mostrarResultadoCosto)

        const volverButton = document.createElement('button');
        volverButton.textContent = 'Volver a los Informes';
        volverButton.addEventListener('click', volverBotones);
        costoTotalPeriodo.appendChild(volverButton);
    }
}

const periodoParaCosto = () => {

    let opcionesPeriodo = '';

    for (const periodo of listaPeriodos){
        opcionesPeriodo += `<option value = ${periodo.id}> ${periodo.codigo}</option>`
    }

    return opcionesPeriodo
}

const mostrarHorarioEstudiante = () => {

    const botonesDeLosInformes = document.getElementById('botonesInformes')
    const horarioxEstudiante = document.getElementById('horarioxEstudiante')

    botonesDeLosInformes.style.display = "none";
    horarioxEstudiante.style.display = "block";

    const mostrarhorarioxEstudiante = document.createElement('div')
    mostrarhorarioxEstudiante.classList.add('horarioEstudiante')

    mostrarhorarioxEstudiante.innerHTML = `
    <label for = "horario_estudiante">Estudiante ID </label>
    <select type = "select" id = "horario_estudiante" required>
            ${estudianteParaHorario()}
    </select>
    
    <button type = "button" onclick = "costoTotalMatriculasPorPeriodo()">Mostrar Horarios</button>

    `;

    horarioxEstudiante.appendChild(mostrarhorarioxEstudiante)


    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver a los Informes';
    volverButton.addEventListener('click', volverBotones);
    horarioxEstudiante.appendChild(volverButton);
}

const estudianteParaHorario = () => {

    let opcionesEstudiante = '';

    for (const estudiante of listaEstudiantes){
        opcionesEstudiante += `<option value = ${estudiante.id}> ${estudiante.nombre}</option>`
    }

    return opcionesEstudiante

}