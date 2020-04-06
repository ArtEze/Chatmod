// ==UserScript==
// @name         Bot Oxy para Chatovod
// @version      2.8.4
// @description  Cargador del bot Oxy para Chatovod.
// @author       ArtEze
// @updateURL    https://arteze.github.io/charlavod/js/oxy/tampermonkey.js
// @match        *://*.chatovod.com/*
// @exclude	     *://*.chatovod.com/widget/rpframe
// @exclude	     *://account.chatovod.com/*
// @grant        none
// ==/UserScript==

window.oxy_tampermonkey = function(){
	/*
		La declaración con window permite borrarla.
		Tampermonkey necesita declarar variables de alguna manera.
		No se usa "var oxy" porque de esa manera no sería accesible desde el tag "<script>".
	*/

	window.obtener_carpeta = url=>url.split("/").slice(0,-1).concat("").join("/")
	var carpeta = window.obtener_carpeta("https://arteze.github.io/charlavod/js/oxy/tampermonkey.js")
	var etiqueta = document.createElement("script")
	etiqueta.src = `${carpeta}iniciar.js?${Date.now()}`
	document.head.appendChild(etiqueta)
}
window.oxy_tampermonkey()

