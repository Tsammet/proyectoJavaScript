const listaCursos = [];

const loadCursos = async () => {

    try {
        listaCursos.length = 0;
        const respuesta = await fetch('http://localhost:3000/cursos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Cursos. Estado', respuesta.status);
        }

        const cursos = await respuesta.json();
        listaCursos.push(...cursos);

    } catch (error) {
        console.error("Error al cargar Cursos", error.message)
    }
}

const mostrarListadoCursos = async () => {
    await loadCursos();
    const listadoCursos = document.getElementById('listado-cursos');
    listadoCursos.innerHTML = ''

    const ul = document.createElement('ul');

    for (const curso of listaCursos){
        const li = document.createElement('li');
        li.textContent = `ID: ${curso.id} Nombre: ${curso.nombre} Código: ${curso.codigo}, Guia Catedra: ${curso.guia_catedra}`
        ul.appendChild(li)
    }

    listadoCursos.appendChild(ul)

}
