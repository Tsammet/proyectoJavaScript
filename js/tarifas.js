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
    const listadoTarifas = document.getElementById('listado-tarifas');
    listadoTarifas.innerHTML = `` 
    const ul = document.createElement('ul');

    for (const tarifa of listaTarifas){
        const li = document.createElement('li');
        li.textContent = `ID: ${tarifa.id} Costo Credito: ${tarifa.costo_credito} Periodo: ${tarifa.periodo_id}, Programa ${tarifa.programa_id}`
        ul.appendChild(li)
    }

    listadoTarifas.appendChild(ul)

}