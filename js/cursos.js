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
    const tablaCursos = document.getElementById('tablaCursos');
    tablaCursos.innerHTML = ''

    for (const curso of listaCursos){
        const tr = document.createElement('tr');
        tr.innerHTML = `

            <td>${curso.id}</td>
            <td>${curso.nombre}</td>
            <td>${curso.codigo}</td>
            <td>${curso.guia_catedra}</td>
        `;
        tablaCursos.appendChild(tr)
    }


}
