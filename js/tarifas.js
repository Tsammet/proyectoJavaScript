const listaTarifas = [];

const loadTarifas =  async () => {
    try {
        listaTarifas.length = 0;
        const respuesta = await fetch('http://localhost:3000/tarifas');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Tarifas. Estado', respuesta.status);
        }

        const tarifas = await respuesta.json();
        listaTarifas.push(...tarifas);

    } catch (error) {
        console.error("Error al cargar Tarifas", error.message)
    }

}

const mostrarListadoTarifas = async () => {

    await loadTarifas();
    const tablaTarifas = document.getElementById('tablaTarifas');
    tablaTarifas.innerHTML = `` 

    for (const tarifa of listaTarifas){
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${tarifa.id}</td>
        <td>${tarifa.costo_credito}</td>
        <td>${tarifa.periodo_id}</td>
        <td>${tarifa.programa_id}</td>
    `;

        tablaTarifas.appendChild(tr)

    }


}