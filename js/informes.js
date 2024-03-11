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


    let maximoContadorPer1 = 0
    let maximoContadorPer2 = 0
    let materiaMasMatriculadaPer1 = ''
    let materiaMasMatriculadaPer2 = ''

    const periodo1 = 1
    const periodo2 = 2

    const contadorAsignaturasPer1 = {}
    const contadorAsignaturasPer2 = {}

    listaAsignaturas.forEach(asignatura => {
        contadorAsignaturasPer1[asignatura.id] = 0
        contadorAsignaturasPer2[asignatura.id] = 0
    })

    listaMatriculas.forEach(matricula => {
        if (matricula.periodo_id === periodo1) {
            matricula.asignaturas.forEach(asignatura => {
                contadorAsignaturasPer1[asignatura]++
                if (contadorAsignaturasPer1[asignatura] > maximoContadorPer1) {
                    maximoContadorPer1 = contadorAsignaturasPer1[asignatura]
                    materiaMasMatriculadaPer1 = asignatura
                }
            })
        } else if (matricula.periodo_id === periodo2) {
            matricula.asignaturas.forEach(asignatura => {
                contadorAsignaturasPer2[asignatura]++
                if (contadorAsignaturasPer2[asignatura] > maximoContadorPer2) {
                    maximoContadorPer2 = contadorAsignaturasPer2[asignatura]
                    materiaMasMatriculadaPer2 = asignatura
                }
            })
        }
    })

    return {
        materiaMasMatriculadaPer1: materiaMasMatriculadaPer1,
        contadorPer1: maximoContadorPer1,
        materiaMasMatriculadaPer2: materiaMasMatriculadaPer2,
        contadorPer2: maximoContadorPer2
    }


}

const mostrarAsignaturaMasMatriculada = () => {

    const botonesDeLosInformes = document.getElementById('botonesInformes')
    const masMatriculada = document.getElementById('asignaturaMasMatriculada')
    let mostrarMasMatriculad = masMatriculada.querySelector('.matriMasMatriculada');


    if (!mostrarMasMatriculad) { // Verifica si ya existe un elemento de resultado

        botonesDeLosInformes.style.display = "none";
        masMatriculada.style.display = "block"

        const asignaturasMasMatriculadas = asignaturaMasMatriculada();


        const mostrarResultado = document.createElement('div')
        mostrarResultado.classList.add('matriMasMatriculada')

        mostrarResultado.innerHTML = `
            <h1> la asignatura mas matriculada del periodo1 tiene el ID : ${asignaturasMasMatriculadas.materiaMasMatriculadaPer1} </h1>
            <h1> la asignatura mas matriculada del periodo2 tiene el ID : ${asignaturasMasMatriculadas.materiaMasMatriculadaPer2} </h1>
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

    for (const periodo of listaPeriodos) {
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
    <form>
    <label for = "estudiantex">Estudiante ID </label>
    <select  id = "estudiantex" required>
            ${estudianteParaHorario()}
    </select>
    
    <label for = "periodox">Periodo ID </label>
    <select  id = "periodox" required>
            ${periodoParaHorario()}
    </select>
    
    <button type = "button" onclick = "horarioEstudiante()">Mostrar Horarios</button>
    </form>
    `;

    horarioxEstudiante.appendChild(mostrarhorarioxEstudiante)


    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver a los Informes';
    volverButton.addEventListener('click', volverBotones);
    horarioxEstudiante.appendChild(volverButton);
}

const estudianteParaHorario = () => {

    let opcionesEstudiante = '';

    for (const estudiante of listaEstudiantes) {
        opcionesEstudiante += `<option value = ${estudiante.id}> ${estudiante.nombre}</option>`
    }

    return opcionesEstudiante

}

const periodoParaHorario = () => {

    let opcionesPeriodo = '';

    for (const periodo of listaPeriodos) {
        opcionesPeriodo += `<option value = ${periodo.id}> ${periodo.codigo}</option>`
    }

    return opcionesPeriodo

}

const horarioEstudiante = () => {

    const estudianteInput = document.getElementById('estudiantex')
    const estudianteId = estudianteInput.value;

    const periodoInput = document.getElementById('periodox')
    const periodoId = periodoInput.value;

    console.log(periodoId + "PERIODO ID")
    console.log(estudianteId + "ESTUDIANTE ID")

    const matricula = listaMatriculas.find((elementoMatricula) => elementoMatricula.estudiante_id === estudianteId &&
        elementoMatricula.periodo_id === parseInt(periodoId))


    if (matricula) {
        const asignaturasMatriculadas = []

        matricula.asignaturas.forEach(asignaturaId => {

            const asignatura = listaAsignaturas.find((elementoAsignatura) => asignaturaId === elementoAsignatura.id)
            asignaturasMatriculadas.push(asignatura)
        });

        asignaturasMatriculadas.forEach(asignaturaHorario => {
            asignaturaHorario.horario_clases.forEach(horario => {
                alert(`Código de la asignatura: ${asignaturaHorario.codigo} 
            Periodo: ${periodoId}
            Estudiante: ${estudianteId}
            Día: ${horario.dia}
            Horario: ${horario.hora_inicio} - ${horario.hora_fin}
            Salón: ${horario.salon_id}`);
            })
            console.log(periodoId + "aaaaaaaaaaaa")
        });
    } else {
        alert("No se encontró matrícula para el estudiante y período seleccionados.");
    }
}