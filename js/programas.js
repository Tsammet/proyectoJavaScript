const listaProgramas = []

const loadProgramas =  async () => {
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
    const listadoProgramas = document.getElementById('listado-programas');
    listadoProgramas.innerHTML = `` 
    const ul = document.createElement('ul');

    for (const programa of listaProgramas){
        const li = document.createElement('li');
        li.textContent = `ID: ${programa.id} Nombre: ${programa.nombre} Nivel: ${programa.nivel}`
        ul.appendChild(li)
    }

    listadoProgramas.appendChild(ul)

}
