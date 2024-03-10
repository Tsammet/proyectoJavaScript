const listaDepartamentos = [];

const loadDepartamentos =  async () => {
    try {
        listaDepartamentos.length = 0;
        const respuesta = await fetch('http://localhost:3000/departamentos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Departamentos. Estado', respuesta.status);
        }

        const departamentos = await respuesta.json();
        listaDepartamentos.push(...departamentos);


    } catch (error) {
        console.error("Error al cargar Departamentos", error.message)
    }

}

const mostrarListadoDepartamentos = async () => {

    await loadDepartamentos();

    const tablaDeptos = document.getElementById('tablaDeptos');
    tablaDeptos.innerHTML = `` 

    for (const departamento of listaDepartamentos){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${departamento.id}</td>
            <td>${departamento.nombre}</td>
        `;
        tablaDeptos.appendChild(tr);
    }


}
