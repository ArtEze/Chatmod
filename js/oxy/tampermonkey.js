// ==UserScript==
// @name         Bot Oxy para Chatovod
// @version      2.8.0
// @description  Cargador del bot Oxy para Chatovod.
// @author       ArtEze
// @match        *://*.chatovod.com/*
// @exclude	     *://*.chatovod.com/widget/rpframe
// @exclude	     *://account.chatovod.com/*
// @grant        none
// ==/UserScript==

window.oxy_tampermonkey = function(){ // La declaración con window permite borrarla.
	window.obtener_carpeta = url=>url.split("/").slice(0,-1).concat("").join("/")
	window.carpeta = window.obtener_carpeta("https://arteze.github.io/charlavod/js/oxy/tampermonkey.js")
	var etiqueta = document.createElement("script")
	etiqueta.src = `${window.carpeta}iniciar.js?${Date.now()}`
	document.head.appendChild(etiqueta)
}
window.oxy_tampermonkey()

