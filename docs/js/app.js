proj_link = {
    "post_project.html": "",
    "abcde.html": "",
    "hello_proj_post.html":"",
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9zZXR0aW5ncy5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInByb2pfbGluayA9IHtcbiAgICBcInBvc3RfcHJvamVjdC5odG1sXCI6IFwiXCIsXG4gICAgXCJhYmNkZS5odG1sXCI6IFwiXCIsXG4gICAgXCJoZWxsb19wcm9qX3Bvc3QuaHRtbFwiOlwiXCIsXG59XG4iLCJcbmNvbnN0IERFRkFVTFRfUEFHRSA9ICdwcm9qX2hvbWUnO1xuXG5mdW5jdGlvbiBoZWxsb3dvcmxkICgpIHtcbiAgICBhbGVydCggJ2hlbGxvd29ybGQnICk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrX21vYmlsZSAoKSB7XG4gICAgcmV0dXJuIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfdXJsICgpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWY7XG59XG5cbmZ1bmN0aW9uIGdldF9jdXJyZW50X3VybF93aXRob3V0X2hhc2ggKCApIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfdXJsKCkucmVwbGFjZSggd2luZG93LmxvY2F0aW9uLmhhc2gsICcnICk7XG59XG5cbmZ1bmN0aW9uIGZldGNoX3BhZ2VfaW50b19lbGUgKCB1cmwsIHRhcmdldF9lbGUgKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybClcbiAgICAudGhlbiggcmVzID0+IHsgcmV0dXJuIHJlcy50ZXh0KCk7IH0gKVxuICAgICAgICAudGhlbiggY29udGVudF9odG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCBjb250ZW50X2h0bWwgKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHRhcmdldF9lbGUgKS5pbm5lckhUTUwgPSBjb250ZW50X2h0bWw7XG4gICAgICAgICAgICAvLyB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoIHsgcGFnZTogMiB9LCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZiApO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coICdwdXNoIDI6JyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICk7XG4gICAgICAgICAgICAvLyB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoIHsgcGFnZTogMSB9LCBcIlwiLCBnZXRfY3VycmVudF91cmxfd2l0aG91dF9oYXNoKCkgKyBcIiNcIiArIHVybCApO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coICcgcHVzaCAxOicgKyBnZXRfY3VycmVudF91cmxfd2l0aG91dF9oYXNoKCkgKyBcIiNcIiArIHVybCApO1xuICAgICAgICB9ICk7XG59XG5cbmZ1bmN0aW9uIGhlbGxvX3Byb2ogKCBjZWxsX2luICkge1xuICAgIGNvbnNvbGUubG9nKCBjZWxsX2luLmlkICk7XG4gICAgY29uc29sZS5sb2coIGNlbGxfaW4uaWQgKyAnLmh0bWwnICk7XG5cbiAgICAvLyBjZWxsX2luLmlkID09PiBoYXNoXG4gICAgZmV0Y2hfcGFnZV9pbnRvX2VsZSggY2VsbF9pbi5pZCArICcuaHRtbCcsICcuY29udGVudCcgKTtcblxufVxuXG5mdW5jdGlvbiBsb2FkX2hlbGxvX3Byb2ooKSB7XG4gICAgZmV0Y2goXG4gICAgICAgICAgICAnaGVsbG9fcHJval9wb3N0Lmh0bWwnXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnRleHQoKTtcbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5jb250ZW50JyApLmlubmVySFRNTCA9IHJlcztcbiAgICAgICAgfSApO1xufVxuXG5mdW5jdGlvbiBiYWNrX3RvX3Byb2plY3RfaG9tZSgpIHtcbiAgICBmZXRjaCggJ3Byb2pfaG9tZS5odG1sJyApXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KClcbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5jb250ZW50JyApLmlubmVySFRNTCA9IHJlcztcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCB7XG4gICAgICAgICAgICAgICAgcGFnZTogMlxuICAgICAgICAgICAgfSwgXCJ0aXRsZSAxXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmICk7XG4gICAgICAgIH0gKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyX3Zpel9ncmFwaCAoKSB7XG4gICAgKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2aXpQcmVmaXggPSBcImxhbmd1YWdlLXZpei1cIjtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggXCJbY2xhc3NePVwiICsgdml6UHJlZml4ICsgXCJdXCIgKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICggeCApIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5naW5lO1xuICAgICAgICAgICAgICAgIHguZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKS5zcGxpdCggXCIgXCIgKS5mb3JFYWNoKCBmdW5jdGlvbiAoIGNscyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjbHMuc3RhcnRzV2l0aCggdml6UHJlZml4ICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmUgPSBjbHMuc3Vic3RyKCB2aXpQcmVmaXgubGVuZ3RoICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyggVml6KCB4LmlubmVyVGV4dCwge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwic3ZnXCIsXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZTogZW5naW5lXG4gICAgICAgICAgICAgICAgfSApLCBcImltYWdlL3N2Zyt4bWxcIiApO1xuICAgICAgICAgICAgICAgIHgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGltYWdlLmRvY3VtZW50RWxlbWVudCwgeCApO1xuICAgICAgICAgICAgICAgIHguc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgfSApO1xuICAgIH0gKSgpO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdF9oZWxsb3dvcmxkICgpIHtcbiAgICBjb25zb2xlLmxvZyggJ3JlZGlyZWN0X2hlbGxvd29ybGQnICk7XG4gICAgY29uc29sZS5sb2coIHdpbmRvdy5sb2NhdGlvbi5ocmVmICk7XG4gICAgY29uc29sZS5sb2coIFwiaGFzaDpcIiArIHdpbmRvdy5sb2NhdGlvbi5oYXNoICk7XG5cbiAgICBpZiAoIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09IFwiXCIgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBcImhhc2ggaXMgZW1wdHlcIiApO1xuICAgICAgICBmZXRjaF9wYWdlX2ludG9fZWxlKFxuICAgICAgICAgICAgXCJwcm9qX2hvbWUuaHRtbFwiLFxuICAgICAgICAgICAgJy5jb250ZW50J1xuICAgICAgICApXG4gICAgICAgICAgICAudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXJ1biB0aGUgamF2YXNjcmlwdCBhZnRlciBhamF4IGxvYWQgY29tcGxldGUgZm9yIGpzIGNvbnRlbnQgaW5zaWRlIGFqYXggcmVzdWx0XG4gICAgICAgICAgICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyX3Zpel9ncmFwaCgpO1xuICAgICAgICAgICAgICAgIC8vIGdldF9naXN0KCBcImY5YTQ5MDc2YWZmMDk0NDlhNWU1ZTAwNzhiMzBjZTY1XCIgKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJwYWdlIHRvIGxvYWQ6XCIgKyB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCAnIycsICcnICkgKyBcIi5odG1sXCIgKTtcbiAgICAgICAgZmV0Y2hfcGFnZV9pbnRvX2VsZShcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoICcjJywgJycgKSArIFwiLmh0bWxcIixcbiAgICAgICAgICAgICcuY29udGVudCdcbiAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVydW4gdGhlIGphdmFzY3JpcHQgYWZ0ZXIgYWpheCBsb2FkIGNvbXBsZXRlIGZvciBqcyBjb250ZW50IGluc2lkZSBhamF4IHJlc3VsdFxuICAgICAgICAgICAgICAgIFByaXNtLmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICAgICAgICAgIHJlbmRlcl92aXpfZ3JhcGgoKTtcbiAgICAgICAgICAgICAgICAvLyBnZXRfZ2lzdCggXCJmOWE0OTA3NmFmZjA5NDQ5YTVlNWUwMDc4YjMwY2U2NVwiICk7XG4gICAgICAgICAgICB9ICk7XG4gICAgfVxuXG5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuY29udGVudCcgKS5zY3JvbGxUb3AgPSAwO1xufVxuXG5mdW5jdGlvbiBsb2FkX2hhc2ggKGhhc2gpIHtcbiAgICBmZXRjaF9wYWdlX2ludG9fZWxlKCBoYXNoLnJlcGxhY2UoXCIjXCIsJycpICsgXCIuaHRtbFwiLCAnLmNvbnRlbnQnICk7XG59XG5cbm1haW5fbWVudV9lbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLm1haW4tbWVudScgKTtcbmhhbWJ1cmdlcl9lbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmhhbWJ1cmdlcicgKTtcblxuZnVuY3Rpb24gbmVlZF90b19oaWRlX21lbnUgKCkge1xuICAgIHJldHVybiBjaGVja19tb2JpbGUoKTtcbn1cblxuZnVuY3Rpb24gc2hvd19tZW51X2JvZHkgKCkge1xuICAgIGlmICggbmVlZF90b19oaWRlX21lbnUoKSApIHtcbiAgICAgICAgbWFpbl9tZW51X2VsZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgIG1haW5fbWVudV9lbGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoaWRlX21lbnVfYm9keSAoKSB7XG4gICAgaWYgKCBuZWVkX3RvX2hpZGVfbWVudSgpICkge1xuICAgICAgICBtYWluX21lbnVfZWxlLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBtYWluX21lbnVfZWxlLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNob3dfbWVudSAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5oYW1idXJnZXInICkuY2xhc3NMaXN0LmFkZCggJ2lzLWFjdGl2ZScgKTtcbiAgICBzaG93X2Nsb3NlID0gdHJ1ZTtcbiAgICBzaG93X21lbnVfYm9keSgpO1xufVxuXG5mdW5jdGlvbiBoaWRlX21lbnUgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuaGFtYnVyZ2VyJyApLmNsYXNzTGlzdC5yZW1vdmUoICdpcy1hY3RpdmUnICk7XG4gICAgc2hvd19jbG9zZSA9IGZhbHNlO1xuICAgIGhpZGVfbWVudV9ib2R5KCk7XG59XG5cbnNob3dfY2xvc2UgPSBmYWxzZTtcbi8vIGlzLWFjdGl2ZSA9PiBiYWNrLWFycm93XG5mdW5jdGlvbiBwcm9jZXNzX21lbnUgKCkge1xuXG4gICAgaWYgKHNob3dfY2xvc2Upe1xuICAgICAgICBoaWRlX21lbnUoKTtcblxuICAgIH1lbHNle1xuICAgICAgICBzaG93X21lbnUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldF9naXN0KGdpc3RfaWQpXG57XG4gICAgZmV0Y2goJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vZ2lzdHMvJytnaXN0X2lkKVxuICAgICAgICAudGhlbiggcmVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggdmFsID0+IHtcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXN0JykuaW5uZXJIVE1MID0gZXZhbCh2YWwpO1xuICAgICAgICAgICAgZmV0Y2goT2JqZWN0LnZhbHVlcyh2YWxbJ2ZpbGVzJ10pWzBdWydyYXdfdXJsJ10pXG4gICAgICAgICAgICAgICAgLnRoZW4oIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMudGV4dCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oIHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuZ2lzdCcgKS5pbm5lckhUTUwgPSB2YWw7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IENsaXBib2FyZEpTKCAnLmJ0bicgKTtcblxuICAgIHJlZGlyZWN0X2hlbGxvd29ybGQoKTtcblxufTtcblxud2luZG93Lm9uaGFzaGNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBoZWxsb3dvcmxkKCk7XG4gICAgcmVkaXJlY3RfaGVsbG93b3JsZCgpO1xufTtcbiJdfQ==
