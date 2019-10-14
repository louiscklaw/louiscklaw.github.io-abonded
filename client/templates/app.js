
const DEFAULT_PAGE = 'proj_home';

function helloworld () {
    alert( 'helloworld' );
}

function check_mobile () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function get_current_url () {
    return window.location.href;
}

function get_current_url_without_hash ( ) {
    return get_current_url().replace( window.location.hash, '' );
}

function fetch_page_into_ele ( url, target_ele ) {
    return fetch(url)
    .then( res => { return res.text(); } )
        .then( content_html => {
            // console.log( content_html );
            document.querySelector( target_ele ).innerHTML = content_html;
            // window.history.pushState( { page: 2 }, "", window.location.href );
            // console.log( 'push 2:' + window.location.href );
            // window.history.pushState( { page: 1 }, "", get_current_url_without_hash() + "#" + url );
            // console.log( ' push 1:' + get_current_url_without_hash() + "#" + url );
        } );
}

function hello_proj ( cell_in ) {
    console.log( cell_in.id );
    console.log( cell_in.id + '.html' );

    // cell_in.id ==> hash
    fetch_page_into_ele( cell_in.id + '.html', '.content' );

}

function load_hello_proj() {
    fetch(
            'hello_proj_post.html'
        )
        .then( res => {
            return res.text();
        } )
        .then( res => {
            document.querySelector( '.content' ).innerHTML = res;
        } );
}

function back_to_project_home() {
    fetch( 'proj_home.html' )
        .then( res => {
            return res.text()
        } )
        .then( res => {
            document.querySelector( '.content' ).innerHTML = res;
            history.pushState( {
                page: 2
            }, "title 1", window.location.href );
        } );
}

function render_viz_graph () {
    ( function () {
        var vizPrefix = "language-viz-";
        Array.prototype.forEach.call( document.querySelectorAll( "[class^=" + vizPrefix + "]" ),
            function ( x ) {
                var engine;
                x.getAttribute( "class" ).split( " " ).forEach( function ( cls ) {
                    if ( cls.startsWith( vizPrefix ) ) {
                        engine = cls.substr( vizPrefix.length );
                    }
                } );
                var image = new DOMParser().parseFromString( Viz( x.innerText, {
                    format: "svg",
                    engine: engine
                } ), "image/svg+xml" );
                x.parentNode.insertBefore( image.documentElement, x );
                x.style.display = 'none'
            } );
    } )();
}

function redirect_helloworld () {
    console.log( 'redirect_helloworld' );
    console.log( window.location.href );
    console.log( "hash:" + window.location.hash );

    if ( window.location.hash == "" ) {
        console.log( "hash is empty" );
        fetch_page_into_ele(
            "proj_home.html",
            '.content'
        )
            .then( res => {
                // rerun the javascript after ajax load complete for js content inside ajax result
                Prism.highlightAll();
                render_viz_graph();
                // get_gist( "f9a49076aff09449a5e5e0078b30ce65" );
            } );
    } else {
        console.log( "page to load:" + window.location.hash.replace( '#', '' ) + ".html" );
        fetch_page_into_ele(
            window.location.hash.replace( '#', '' ) + ".html",
            '.content'
        )
            .then( res => {
                // rerun the javascript after ajax load complete for js content inside ajax result
                Prism.highlightAll();
                render_viz_graph();
                // get_gist( "f9a49076aff09449a5e5e0078b30ce65" );
            } );
    }



    document.querySelector( '.content' ).scrollTop = 0;
}

function load_hash (hash) {
    fetch_page_into_ele( hash.replace("#",'') + ".html", '.content' );
}

main_menu_ele = document.querySelector( '.main-menu' );
hamburger_ele = document.querySelector( '.hamburger' );

function need_to_hide_menu () {
    return check_mobile();
}

function show_menu_body () {
    if ( need_to_hide_menu() ) {
        main_menu_ele.style.visibility = "visible";
        main_menu_ele.style.opacity = "1";

    }
}

function hide_menu_body () {
    if ( need_to_hide_menu() ) {
        main_menu_ele.style.visibility = "hidden";
        main_menu_ele.style.opacity = "0";
    }
}

function show_menu () {
    document.querySelector( '.hamburger' ).classList.add( 'is-active' );
    show_close = true;
    show_menu_body();
}

function hide_menu () {
    document.querySelector( '.hamburger' ).classList.remove( 'is-active' );
    show_close = false;
    hide_menu_body();
}

show_close = false;
// is-active => back-arrow
function process_menu () {

    if (show_close){
        hide_menu();

    }else{
        show_menu();
    }
}

function get_gist(gist_id)
{
    fetch('https://api.github.com/gists/'+gist_id)
        .then( res => {
            return res.json();
        })
        .then( val => {
            // document.querySelector('.test').innerHTML = eval(val);
            fetch(Object.values(val['files'])[0]['raw_url'])
                .then( res => {
                    return res.text();
                })
                .then( val => {
                    document.querySelector( '.gist' ).innerHTML = val;
                })
        });
}

window.onload = function () {
    new ClipboardJS( '.btn' );

    redirect_helloworld();

};

window.onhashchange = function () {
    // helloworld();
    redirect_helloworld();
};
