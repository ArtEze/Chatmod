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
			obtener: {
				url_sin_cache: function(url){
					var devuelve = undefined
					var tm = url.tampermonkey
					var anti_cache = funciones.general.obtener.anti_cache()
					devuelve = tm.carpeta + tm.archivo + url.extensión + anti_cache
					return devuelve
				}
			}
		}
		, general: {
			obtener: {
				carpeta: function(url){
					return url.split("/").slice(0,-1).concat("").join("/")
				}
				, tiempo: function(){
					return +Date.now()
				}
				, anti_cache: function(){
					var tiempo = oxy.funciones.general.obtener.tiempo()
					oxy.url.tiempos.push(tiempo)
					return oxy.url.interrogación + tiempo
				}
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
		, tiempos: []
	}

	var url = oxy.url
	var variables = oxy.variables.cargar
	var funciones = oxy.funciones

	oxy.funciones.cargar.iniciar = oxy.iniciar
	delete oxy.iniciar

	url.extensión = url.punto + url.tipo_de_archivo
	url.tampermonkey.carpeta = funciones.general.obtener.carpeta(url.tampermonkey.completo)

	var sin_cache = funciones.cargar.obtener.url_sin_cache(url)

	variables.etiqueta_script = funciones.general.agregar_código(sin_cache)
}

oxy.iniciar()

