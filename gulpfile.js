// tareas o funciones en gulp son lo mismo

// function tarea( done ) {
//     console.log('Mi primer tarea');
//     done();
// }
// exports.primerTarea = tarea();
// exports.primerTarea = tarea;
// exports.tarea = tarea;

const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); // mejoran css
const cssnano = require('cssnano'); // mejoran css -> comprime
const postcss = require('gulp-postcss'); // mejoran css 

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {

    src('src/scss/**/*.scss') // Identificar archivo de SASS
        .pipe( plumber() ) // evita que se detenga el workflow
        .pipe( sass() ) // Compilarlo
        .pipe( postcss([autoprefixer(), cssnano()]) )
        .pipe( dest('build/css') ) // Almacenarla en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final
}

function versionAvif( done ) 
{
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') );

    done();
}

function imagenes( done ) 
{
    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(opciones)) )
        .pipe( dest('build/img') );    

    done();
}

function versionWebp( done ) 
{
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') );

    done();
}

function javascript( done ) {
    
    src('src/js/**/*.js')
        .pipe( dest('build/js') );

    done();
}

function dev(done) {
    // watch recibe la ruta del arcivo que va a escuchar
    // luego pide que funcion quiere que se ejecute
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);