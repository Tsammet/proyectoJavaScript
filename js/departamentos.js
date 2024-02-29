// ESTA LÍNEA LA UTILIZO PARA CREAR NUEVOS DATOS Y CARGARLOS 
const listaDepartamentos = []

const cargarFormularioDepartamentos = () => {

    const departamentosForm = document.getElementById('departamentos-form');
    departamentosForm.innerHTML = `
    <form>
    
        <label for = "nombreDepartamento">Nombre del departamento: </label>
        <input type = "text" id = "nombreDepartamento" required> 

        <button type = "button" onclick = "crearDepartamento()">Crear Departamento</button>

    </form>
    `;
    
}

const loadDepartamento = async () => {
    
    try{
        listaDepartamentos.length = 0 ;
        const respuesta = await fetch('http://localhost:3000/departamentos');

        if(!respuesta.ok){
            throw new Error('Error al cargar Departamentos. Estado', respuesta.status);
        }

        // si la respuesta del servidor es exitosa se convierte la respuesta en formato json y los objetos se guardan en departamentos <3
        const departamentos = await respuesta.json();
        listaDepartamentos.push(...departamentos);

    }catch(error){
        console.error("Error al cargar departamentos",error.meesage)
    }
}

const guardarDepartamento = async(nuevoDepartamento) => {
    try{
        const respuesta = await fetch('http://localhost:3000/departamentos',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(nuevoDepartamento),
        });

        if(!respuesta.ok){
            throw new Error('Error al crear el Departamento. Estado: ',respuesta.status);
        }
        const departamentoCreado = await respuesta.json();

        console.log('Departamento creado:', departamentoCreado);


    }catch(error){
        console.log("Error al cargar Departamentos", error.meesage)
    }
}

const crearDepartamento = async () => {

    const nombreDepartamentoInput = document.getElementById('nombreDepartamento');

    const nombreDepartamento = nombreDepartamentoInput.value;

    const nuevoDepartamento  = {

        id : listaDepartamentos.length + 1,
        nombre: nombreDepartamento
    };

    await guardarDepartamento(nuevoDepartamento);
    await loadDepartamento();

    nombreDepartamento.value = '';

    alert('Departamento Creado Con Exito! :D');

    return nuevoDepartamento;
}