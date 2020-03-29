// ==UserScript==
// @name         Bot Otecald Chatovod
// @version      2.7.7
// @description  Cargador del bot Oxy para Chatovod.
// @author       ArtEze
// @match        *://*.chatovod.com/*
// @exclude      *://*.chatovod.com/widget/rpframe
// @exclude      *://account.chatovod.com/*
// @grant        none
// ==/UserScript==

window.oxy = {
	funciones: {}
}

var oxy = window.oxy
var funciones = oxy.funciones

funciones.obtener_carpeta = function(url){
	return url.split("/").slice(0,-1).concat("").join("/")
}
funciones.agregar_código = function(url){
	var etiqueta = document.createElement("script")
	etiqueta.src = url
	document.head.appendChild(etiqueta)
	return etiqueta
}
funciones.obtener_url_sin_cache = function(){
	var devuelve = undefined
	var url = oxy.url
	devuelve = url.tampermonkey.carpeta + url.tampermonkey.archivo + oxy.extensión + oxy.url.anticache
	return devuelve
}
funciones.cargar = function()
{
	oxy.url = {
		tampermonkey: {
			completo: "https://arteze.github.io/charlavod/js/oxy/tampermonkey.js"
			, archivo: "cargar_lista_archivos"
		}
		, cargar: {}
		, interrogación: "?"
		, punto: "."
        , tipo_de_archivo: "js"
    }

    var url = oxy.url

    url.extensión = url.punto + url.tipo_de_archivo
	url.anticache = url.interrogación + Date.now()
	url.tampermonkey.carpeta = funciones.obtener_carpeta(url.tampermonkey.completo)
	url.tampermonkey.sin_cache = funciones.obtener_url_sin_cache()
	oxy.cargar.etiqueta_script = funciones.agregar_código(url.tampermonkey.sin_cache)
}

oxy.cargar()

