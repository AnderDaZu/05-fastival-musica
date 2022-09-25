// tareas o funciones en gulp son lo mismo

// function tarea( done ) {
//     console.log('Mi primer tarea');
//     done();
// }
// exports.primerTarea = tarea();
// exports.primerTarea = tarea;
// exports.tarea = tarea;

const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css( done ) {

    src('src/scss/app.scss') // Identificar archivo de SASS
        .pipe( sass() ) // Compilarlo
        .pipe( dest('build/css') ); // Almacenarla en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final
}

function dev(done) {
    // watch recibe la ruta del arcivo que va a escuchar
    // luego pide que funcion quiere que se ejecute
    watch('src/scss/app.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;