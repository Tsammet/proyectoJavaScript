document.addEventListener('DOMContentLoaded', async () => {
    await loadEstudiantes();
    cargarFormularioEstudiantes();
    await loadProfesor();
    cargarFormularioProfesores();
    await loadAsignaturas();
    cargarFormularioAsignaturas();
    agregarHorario();

})