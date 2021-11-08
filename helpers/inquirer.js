const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`    
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas` 
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`    
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(0)`    
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`    
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {
    //Mostramos el menú en la terminal
    console.clear();
    console.log('=====================\n'.green);
    console.log('Selecciona una opción\n'.white);
    console.log('=====================\n'.green);

    //Esperamos la selección del usuario en la terminal
    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;
}

const pausa = async() => {

    //Pausa para controlar la salida del programa
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'Enter'.green } para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async(message) => {

    //Lectura de valor de la tarea a ser registrada desde la terminal
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingresa un valor';      
                }   
                return true;    
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });
    
    //Construimos el selector de preguntas
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const mostrarListadoChecklist = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}