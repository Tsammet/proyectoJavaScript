const listaSalones = [];

const loadSalones =  async () => {
    try {
        listaSalones.length = 0;
        const respuesta = await fetch('http://localhost:3000/salones');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Salones. Estado', respuesta.status);
        }

        const salones = await respuesta.json();
        listaSalones.push(...salones);

    } catch (error) {
        console.error("Error al cargar Salones", error.message)
    }
}

const mostrarListadoSalones = async () => {

    await loadSalones();
    const listadoSalones = document.getElementById('listado-salones');
    listadoSalones.innerHTML = `` 
    const ul = document.createElement('ul');

    for (const salon of listaSalones){
        const li = document.createElement('li');
        li.textContent = `ID: ${salon.id} Capacidad Alumnos: ${salon.capacidad_alunmons} Edificio: ${salon.edificio}, Piso: ${salon.piso} No_Identificación: ${salon.numero_identificacion}`
        ul.appendChild(li)
    }

    listadoSalones.appendChild(ul)

}