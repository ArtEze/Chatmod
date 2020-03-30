// ==UserScript==
// @name		 Bot Oxy para Chatovod
// @version	  2.7.7
// @description  Cargador del bot Oxy para Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @exclude	  *://*.chatovod.com/widget/rpframe
// @exclude	  *://account.chatovod.com/*
// @grant		none
// ==/UserScript==

window.oxy = {}

var oxy = window.oxy

oxy.iniciar = function()
{
	oxy.funciones = {
		cargar: {
			obtener_url_sin_cache: function(){
				var devuelve = undefined
				var url = oxy.url
				var tampermonkey = url.tampermonkey
				devuelve = tampermonkey.carpeta + tampermonkey.archivo + url.extensión + url.anticache
				return devuelve
			}
		}
		, general: {
			obtener_carpeta: function(url){
				return url.split("/").slice(0,-1).concat("").join("/")
			}
			, agregar_código: function(url){
				var etiqueta = document.createElement("script")
				etiqueta.src = url
				document.head.appendChild(etiqueta)
				return etiqueta
			}
		}
	}
	oxy.variables = {
		cargar: {}
		, general: {}
	}
	oxy.url = {
		tampermonkey: {
			completo: "https://arteze.github.io/charlavod/js/oxy/tampermonkey.js"
			, archivo: "cargar_lista_archivos"
		}
		, interrogación: "?"
		, punto: "."
		, tipo_de_archivo: "js"
	}

	var url = oxy.url
	var variables = oxy.variables.cargar
	var funciones = oxy.funciones
	
	oxy.funciones.general.cargar.iniciar = oxy.iniciar
	delete oxy.iniciar

	url.extensión = url.punto + url.tipo_de_archivo
	url.anticache = url.interrogación + Date.now()
	url.tampermonkey.carpeta = funciones.obtener_carpeta(url.tampermonkey.completo)
	url.tampermonkey.sin_cache = funciones.obtener_url_sin_cache()
	variables.etiqueta_script = funciones.agregar_código(url.tampermonkey.sin_cache)
}

oxy.iniciar()

