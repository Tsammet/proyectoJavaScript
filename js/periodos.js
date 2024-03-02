const listaPeriodos = [];

const mostrarListadoPeriodos = async () => {
    await loadPeriodos();
    const listadoPeriodos = document.getElementById('listado-periodos');
    listadoPeriodos.innerHTML = ''
    const ul = document.createElement('ul');

    for (const periodo of listaPeriodos){
        const li = document.createElement('li');
        li.textContent = `ID: ${periodo.id} codigo: ${periodo.codigo} Año: ${periodo.ano}, Semestre: ${periodo.semestre}`
        ul.appendChild(li)
    }

    listadoPeriodos.appendChild(ul)

}

const loadPeriodos = async () => {

    try {
        listaPeriodos.length = 0;
        const respuesta = await fetch('http://localhost:3000/periodos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Periodos. Estado', respuesta.status);
        }

        const periodos = await respuesta.json();
        listaPeriodos.push(...periodos);

    } catch (error) {
        console.error("Error al cargar Periodos", error.message)
    }
}