const paginaAsignaturas = document.getElementById('asignaturas')
const paginaDepartamentos = document.getElementById('departamentos')
const paginaEstudiantes = document.getElementById('estudiantes')
const paginaPeriodos = document.getElementById('periodos')
const paginaProfesores = document.getElementById('profesores')
const paginaProgramas = document.getElementById('programas')
const paginaSalones = document.getElementById('salones')
const paginaTarifas = document.getElementById('tarifas')
const paginaCursos = document.getElementById('cursos')
const paginaMain = document.getElementById('main-page')

const mainPage = () => {
    paginaMain.style.display = "block"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "none"
}

const asignaturasPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "block";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "none"
}

const departamentosPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "block";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaCursos.style.display = "none"
    paginaTarifas.style.display = "none";
}

const estudiantesPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "block";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "none"
}

const periodosPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "block";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "none"
}

const profesoresPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "block";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaCursos.style.display = "none"
    paginaTarifas.style.display = "none";
}

const programasPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "block";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "none"
}

const salonesPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "block";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "none"
}

const tarifasPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaCursos.style.display = "none"
    paginaTarifas.style.display = "block";
}

const cursosPage = () => {
    paginaMain.style.display = "none"
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
    paginaCursos.style.display = "block"
}

const funcionPaginas = () => {
    const mainPageNavLink = document.getElementById('main-pageNav');
    mainPageNavLink.addEventListener('click', mainPage);

    const asignaturasNavLink = document.getElementById('asignaturasNav');
    asignaturasNavLink.addEventListener('click', asignaturasPage);

    const departamentosNavLink = document.getElementById('departamentosNav');
    departamentosNavLink.addEventListener('click', departamentosPage)

    const estudiantesNavLink = document.getElementById('estudiantesNav');
    estudiantesNavLink.addEventListener('click', estudiantesPage)

    const periodosNavLink = document.getElementById('periodosNav');
    periodosNavLink.addEventListener('click', periodosPage)

    const profesoresNavLink = document.getElementById('profesoresNav');
    profesoresNavLink.addEventListener('click', profesoresPage)

    const programasNavlink = document.getElementById('programasNav');
    programasNavlink.addEventListener('click', programasPage)

    const tarifasNavLink = document.getElementById('tarifasNav');
    tarifasNavLink.addEventListener('click', tarifasPage)

    const cursosNavLink = document.getElementById('cursosNav');
    cursosNavLink.addEventListener('click', cursosPage)

    const salonesNavLink = document.getElementById('salonesNav');
    salonesNavLink.addEventListener('click', salonesPage)
}