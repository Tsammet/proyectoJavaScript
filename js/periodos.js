const listaPeriodos = [];

const mostrarListadoPeriodos = async () => {
    await loadPeriodos();

    const tablaPeriodos = document.getElementById('tablaPeriodos');

    tablaPeriodos.innerHTML = ''

    for (const periodo of listaPeriodos){
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${periodo.id}</td>
        <td>${periodo.codigo}</td>
        <td>${periodo.ano}</td>
        <td>${periodo.semestre}</td>
    `;
      
    tablaPeriodos.appendChild(tr)
    }


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