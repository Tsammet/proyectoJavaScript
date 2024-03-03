const paginaAsignaturas = document.getElementById('asignaturas')
const paginaDepartamentos = document.getElementById('departamentos')
const paginaEstudiantes = document.getElementById('estudiantes')
const paginaPeriodos = document.getElementById('periodos')
const paginaProfesores = document.getElementById('profesores')
const paginaProgramas = document.getElementById('programas')
const paginaSalones = document.getElementById('salones')
const paginaTarifas = document.getElementById('tarifas')


const asignaturasPage = () => {
    paginaAsignaturas.style.display = "block";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
}

const departamentosPage = () => {
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "block";
    paginaEstudiantes.style.display = "none";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
}

const estudiantesPage = () => {
    paginaAsignaturas.style.display = "none";
    paginaDepartamentos.style.display = "none";
    paginaEstudiantes.style.display = "block";
    paginaPeriodos.style.display = "none";
    paginaProfesores.style.display = "none";
    paginaProgramas.style.display = "none";
    paginaSalones.style.display = "none";
    paginaTarifas.style.display = "none";
}

const funcionPaginas = () => {
    const asignaturasNavLink = document.getElementById('asignaturasNav');
    asignaturasNavLink.addEventListener('click', asignaturasPage);

    const departamentosNavLink = document.getElementById('departamentosNav');
    departamentosNavLink.addEventListener('click', departamentosPage)

    const estudiantesNavLink = document.getElementById('estudiantesNav');
    estudiantesNavLink.addEventListener('click', estudiantesPage)
}