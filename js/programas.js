const listaProgramas = []

const loadProgramas = async () => {
    try {
        listaProgramas.length = 0;
        const respuesta = await fetch('http://localhost:3000/programas');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Programas. Estado', respuesta.status);
        }

        const programas = await respuesta.json();
        listaProgramas.push(...programas);

    } catch (error) {
        console.error("Error al cargar Programas", error.message)
    }

}

const mostrarListadoProgramas = async () => {

    await loadProgramas();
    const tablaProgramas = document.getElementById('tablaProgramas');
    tablaProgramas.innerHTML = ``

    for (const programa of listaProgramas) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${programa.id}</td>
            <td>${programa.nombre}</td>
            <td>${programa.nivel}</td>
        `

        tablaProgramas.appendChild(tr)
    }


}
