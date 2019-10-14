// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename gulp-sourcemaps --save -D
const {
    src,
    dest,
    parallel,
    series
} = require( 'gulp' );
const pug = require( 'gulp-pug' );
const less = require( 'gulp-less' );
const minifyCSS = require( 'gulp-csso' );
const concat = require( 'gulp-concat' );

const sourcemaps = require( 'gulp-sourcemaps' );
const rename = require( 'gulp-rename' );
const javascriptObfuscator = require( 'gulp-javascript-obfuscator' );
const sort = require( 'gulp-sort' );

const imageResize = require( 'gulp-image-resize' );


function html() {
    return src( 'client/templates/*.pug' )
        .pipe( pug() )
        .pipe( dest( 'docs' ) )
}

function css() {
    return src( 'client/templates/*.less' )
        .pipe( less() )
        .pipe( minifyCSS() )
        .pipe( dest( 'docs/css' ) )
}

function js() {
    return src( [ 'client/templates/*.js' ], {
            sourcemaps: true
        } )
        .pipe( sort() )
        .pipe( concat( 'app.js' ) )
        .pipe( dest( 'docs/js', {
            sourcemaps: true
        } ) )
}

function js_compress() {
    return src( './docs/js/app.js' )
        .pipe( javascriptObfuscator( {
            compact: true
        } ) )
        .pipe( rename( 'app.min.js' ) )
        .pipe( sourcemaps.write() )
        .pipe( dest( 'docs/js', ) )
}

function handle_img_files () {
    src( 'client/templates/assets/share-button/*' )
        .pipe( dest( 'docs/assets/share-button' ) );

    src( 'client/templates/assets/**/*' ).pipe( dest( 'docs/assets' ) );

    src( 'client/templates/assets/proj_thumbnails/*.jpg' )
        .pipe( imageResize( {
            width: 500,
            height: 400,
            crop: true,
            upscale: false
        } ) )
        .pipe( dest( 'docs/assets/proj_thumbnails' ) );

    return src( 'client/templates/assets/proj_thumbnails/*.png' )
        .pipe( imageResize( {
            width: 500,
            height: 400,
            crop: true,
            upscale: false
        } ) )
        .pipe( dest( 'docs/assets/proj_thumbnails' ) );
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = series(
    parallel(handle_img_files,css, js),
    js_compress, html
    );
