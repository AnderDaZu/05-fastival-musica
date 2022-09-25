// tareas o funciones en gulp son lo mismo

function tarea( done ) {
    console.log('Mi primer tarea');
    done();
}

// exports.primerTarea = tarea();
// exports.primerTarea = tarea;
exports.tarea = tarea;