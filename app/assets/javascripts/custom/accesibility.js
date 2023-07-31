jQuery(document).ready(function ($) {

    'use strict';

    var html = '<div id="block-accesibilidad"><h2 class="block-title">Accesibilidad</h2><div class="bloque-accesibilidad">'+
        '<span class="titulo">Balizas</span><label class="switch">'+
        '<input class="input-balizas" type="checkbox">'+
        '<span class="slider round balizas">&nbsp;</span></label><br>'+
        '<span class="titulo">Modo noche</span><label class="switch">'+
        '<input class="input-noche" type="checkbox">'+
        '<span class="slider round noche">&nbsp;</span></label><br>'+
        '<span class="titulo">Navegación sencilla</span><label class="switch">'+
        '<input class="input-sencilla" type="checkbox">'+
        '<span class="slider round sencilla">&nbsp;</span></label><br>'+
        '<span class="titulo">Navegación virtual</span><label class="switch">'+
        '<input class="input-virtual" type="checkbox">'+
        '<span class="slider round virtual">&nbsp;</span></label><br>'+
        '<span class="titulo">Navegación 1 botón</span><label class="switch">'+
        '<input class="input-1boton" type="checkbox">'+
        '<span class="slider round 1boton">&nbsp;</span></label>'+
        '</div>'+
        '<div class="navegacion-virtual">'+
            '<div class="virtual-left">&nbsp;</div>'+
            '<div class="virtual-up">&nbsp;</div>'+
            '<div class="virtual-down">&nbsp;</div>'+
            '<div class="virtual-right">&nbsp;</div>'+
            '<div class="virtual-mover">M</div>'+
            '<div class="virtual-click">C</div>'+
        '</div></div>';

    $('.main-container .region-header').append(html);

    //funciones para cookies
    function setCookie(key, value, expiry) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    function eraseCookie(key) {
        var keyValue = getCookie(key);
        setCookie(key, keyValue, '-1');
    }



    $('#block-accesibilidad .block-title').click( function (){

        if ($('#block-accesibilidad').css('bottom') == "0px"){
            $('#block-accesibilidad').animate({
                bottom: "-215px"
            }, 500, function() {
                // Animation complete.
            });
        }else{
            $('#block-accesibilidad').animate({
                bottom: "0px"
            }, 500, function() {
                // Animation complete.
            });
        }


    });

    //balizas rojas
    $(document).on("click", ".balizas", function(){

        if ($('header').hasClass('accesibilidadheader')){
            $('header').removeClass('accesibilidadheader')
            $('.main-container').removeClass('accesibilidadmain')
            $('footer').removeClass('accesibilidadfooter')
            eraseCookie('balizas');

        }else{
            $('header').addClass('accesibilidadheader')
            $('.main-container').addClass('accesibilidadmain')
            $('footer').addClass('accesibilidadfooter')
            setCookie('balizas','1','1'); //(key,value,expiry in days)
        }
    });

    var cookie_balizas = getCookie('balizas');
    if (cookie_balizas == 1){
        $('header').addClass('accesibilidadheader')
        $('.main-container').addClass('accesibilidadmain')
        $('footer').addClass('accesibilidadfooter')
        $('.input-balizas').prop('checked', true);
    }



    //modo noche
    $(document).on("click", ".noche", function(){

        var loaded = $("LINK[href*='/modules/custom/accesibility/css/dark.css']");
        if (loaded.length > 0){
            $("LINK[href*='/modules/custom/accesibility/css/dark.css']").remove();
            eraseCookie('dark');
        }else{
            var style = document.createElement('link')
            style.href = '/modules/custom/accesibility/css/dark.css'
            style.type = 'text/css'
            style.rel = 'stylesheet'
            style.id = 'dark'
            document.head.appendChild(style);
            setCookie('dark','1','1'); //(key,value,expiry in days)
        }

    });

    var cookie_dark = getCookie('dark');
    if (cookie_dark == 1){
        var style = document.createElement('link')
        style.href = '/modules/custom/accesibility/css/dark.css'
        style.type = 'text/css'
        style.rel = 'stylesheet'
        style.id = 'dark'
        document.head.appendChild(style);
        $('.input-noche').prop('checked', true);
    }


    //modo navegacion sencilla
    $(document).on("click", ".sencilla", function(){

        var loaded = $("LINK[href*='/modules/custom/accesibility/css/simple.css']");
        if (loaded.length > 0){
            $("LINK[href*='/modules/custom/accesibility/css/simple.css']").remove();
            eraseCookie('sencilla');
        }else{
            var style = document.createElement('link')
            style.href = '/modules/custom/accesibility/css/simple.css'
            style.type = 'text/css'
            style.rel = 'stylesheet'
            style.id = 'simple'
            document.head.appendChild(style);
            setCookie('sencilla','1','1'); //(key,value,expiry in days)
        }

    });
    var cookie_sencilla = getCookie('sencilla');
    if (cookie_sencilla == 1){
        var style = document.createElement('link')
        style.href = '/modules/custom/accesibility/css/simple.css'
        style.type = 'text/css'
        style.rel = 'stylesheet'
        style.id = 'simple'
        document.head.appendChild(style);
        $('.input-sencilla').prop('checked', true);
    }


    //modo navegacion con botones virtuales
    $(document).on("click", ".virtual", function(){
        if ($('.input-virtual').prop('checked') == false){
            $('.navegacion-virtual').css('display', 'flex');
            setCookie('virtual','1','1'); //(key,value,expiry in days)
        }else{
            $('.navegacion-virtual').css('display', 'none');
            eraseCookie('virtual');
        }

    });


    var cookie_virtual = getCookie('virtual');
    if (cookie_virtual == 1){
        $('#block-accesibilidad').animate({
            bottom: "0px"
        }, 500, function() {
            // Animation complete.
        });
        $('.input-virtual').prop('checked', true);
        $('.navegacion-virtual').css('display', 'flex');
    }

    $('.virtual-left').on('click', function (){
        history.back();
    });
    $('.virtual-right').on('click', function (){
        history.forward()
    });
    $('.virtual-up').on('click', function (){
        $("html, body").animate({ scrollTop: '-=200px' }, 500);
    });
    $('.virtual-down').on('click', function (){
        $("html, body").animate({ scrollTop: '+=200px' }, 500);
    });
    var clicks = 0;
    $('.virtual-mover').on('click', function (){
        clicks++;
        $("body", "html").find('.highlight-selected-element').removeClass("highlight-selected-element");
        var nextEl = findNextTabStop(document.activeElement,clicks);
        nextEl.focus();
        var $focused = $(':focus');
        $focused.addClass("highlight-selected-element");
    });
    $('.virtual-click').on('click', function (){
        let temp = $('.highlight-selected-element').attr('href')
        if (temp == undefined){
            var $focused = $(':focus');
            $('.highlight-selected-element').trigger('click');
        }else{
            if ($('.highlight-selected-element').attr('target') == "_blank"){
                window.open($('.highlight-selected-element').attr('href'));
            }else{
                location.href=$('.highlight-selected-element').attr('href');
            }

        }
    });

    //modo navegacion con 1 boton
    $(document).on("click", ".1boton", function(){
        if ($('.input-1boton').prop('checked') == false){
            setCookie('1boton','1','1'); //(key,value,expiry in days)
            window.keypressed = {};
            var counter = 0;
            var myInterval = "";
            $(document).keydown(function(e) {
                var code = (e.keyCode ? e.keyCode : e.which);

                if (code == 9) {

                    if ( window.keypressed[code] ) {
                        e.preventDefault();
                    } else {
                        window.keypressed[code] = true;
                        myInterval = setInterval(function () {
                            ++counter;
                        }, 500);
                    }

                }
            }).keyup(function(ee){
                var code = (ee.keyCode ? ee.keyCode : ee.which);

                if (code == 9) {
                    window.keypressed[code] = false;
                    clearInterval(myInterval);
                    navegacion1botonfunc(counter);
                    counter = 0;
                }


            });
        }else{
            /*$('.navegacion-1boton').remove();*/
            eraseCookie('1boton');
        }

    });


    var cookie_1boton = getCookie('1boton');
    if (cookie_1boton == 1){
        $('#block-accesibilidad').animate({
            bottom: "0px"
        }, 500, function() {
            // Animation complete.
        });
        $('.input-1boton').prop('checked', true);
        window.keypressed = {};
        var counter = 0;
        var myInterval = "";
        $(document).keydown(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);

            if (code == 9) {

                if ( window.keypressed[code] ) {
                    e.preventDefault();
                } else {
                    window.keypressed[code] = true;
                    myInterval = setInterval(function () {
                        ++counter;
                    }, 500);
                }

            }
        }).keyup(function(ee){
            var code = (ee.keyCode ? ee.keyCode : ee.which);

            if (code == 9) {
                window.keypressed[code] = false;
                clearInterval(myInterval);
                navegacion1botonfunc(counter);
                counter = 0;
            }
        });
    }

    var clicks2 = 0;
    function navegacion1botonfunc(c){
        if (c >= 2){
            let temp = $('.highlight-selected-element').attr('href')
            if (temp == undefined){
                var $focused = $(':focus');
                $('.highlight-selected-element').trigger('click');
            }else{
                if ($('.highlight-selected-element').attr('target') == "_blank"){
                    window.open($('.highlight-selected-element').attr('href'));
                }else{
                    location.href=$('.highlight-selected-element').attr('href');
                }

            }
        }else{
            clicks2++;
            $("body", "html").find('.highlight-selected-element').removeClass("highlight-selected-element");
            var $focused = $(':focus');
            $focused.addClass("highlight-selected-element");
        }
    }

    function findNextTabStop(el,clicks) {
        var universe = document.querySelectorAll('input, button, textarea, a[href]');
        var list = Array.prototype.filter.call(universe, function(item) {return item});
        var index = list.indexOf(el);
        return list[index + clicks];
    }


});