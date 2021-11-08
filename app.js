require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const { Tareas } = require('./models/tareas');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        //Crear menú de opciones
        opt = await inquirerMenu();

        //Validar opción seleccionadada desde la terminal
        switch (opt) {
            case '1':
                //Crear nueva tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);

                //Guardo en el fichero los datos
                guardarDB(tareas.listadoArr);
            break;

            case '2':
                //Listar tareas
                tareas.listadoCompleto();
            break;    

            case '3':
                //Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
            break;  

            case '4':
                //Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
            break; 

            case '5':
                //Completado | Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);

                //Guardo en el fichero los datos
                guardarDB(tareas.listadoArr);
            break; 

            case '6':
                //Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if(id !== '0'){
                    const ok = await confirmar('¿Estás seguro?');

                    if(ok){
                        //Elimino el registro
                        tareas.borrarTarea(id);
    
                        //Guardo en el fichero los datos actualiados (Borrado de tarea)
                        guardarDB(tareas.listadoArr);
    
                        //Muestro por pantalla la información del registro eliminado correctamente
                        console.log('Registro eliminado correctamente');
                    }
                }
            break; 
        }
                
        await pausa();
    
    }while(opt !== '0');
}

main();