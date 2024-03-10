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
    const tablaSalones = document.getElementById('tablaSalones');
    tablaSalones.innerHTML = `` 

    for (const salon of listaSalones){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.capacidad_alumnos}</td>
            <td>${salon.edificio}</td>
            <td>${salon.piso}</td>
            <td>${salon.numero_identificacion}</td>
            `
        tablaSalones.appendChild(tr)
    }


}