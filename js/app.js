document.addEventListener('DOMContentLoaded', async () => {
    funcionPaginas();
    mainPage();
    
    await loadEstudiantes();
    cargarFormularioEstudiantes();

    await loadProfesor();
    cargarFormularioProfesores();    
    
    await loadAsignaturas();
    cargarFormularioAsignaturas();
    
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

    await loadMatriculas();
    cargarFormularioMatriculas();

    cargarInformes()



if (parseInt(paginaActual) == null) {

    mainPage();
  }

if (parseInt(paginaActual) == 1) {

    asignaturasPage();
  }

if (parseInt(paginaActual) == 2) {

    departamentosPage();
  }

if (parseInt(paginaActual) == 3) {

    estudiantesPage();
  }

if (parseInt(paginaActual) == 4) {

    periodosPage();
  }

if (parseInt(paginaActual) == 5) {

    programasPage();
  }

  
if (parseInt(paginaActual) == 6) {

    profesoresPage();
}

if (parseInt(paginaActual) == 7) {
  
  tarifasPage();
}

if (parseInt(paginaActual) == 8) {

    salonesPage();
  }

if (parseInt(paginaActual) == 9) {

    cursosPage();
  }

if (parseInt(paginaActual) == 10) {

    matriculasPage();
  } 
if (parseInt(paginaActual) == 11) {

    informesPage();
  } 
})