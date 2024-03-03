document.addEventListener('DOMContentLoaded', async () => {
    funcionPaginas();
    mainPage();

    await loadEstudiantes();
    cargarFormularioEstudiantes();

    await loadProfesor();
    cargarFormularioProfesores();

    await loadAsignaturas();
    cargarFormularioAsignaturas();
    agregarHorario();

    await loadPeriodos();
    mostrarListadoPeriodos();

    await loadProgramas();
    mostrarListadoProgramas();

    await loadTarifas();
    mostrarListadoTarifas();

    await loadDepartamentos();
    mostrarListadoDepartamentos();

    await loadCursos();
    mostrarListadoCursos();

    await loadSalones();
    mostrarListadoSalones();

})