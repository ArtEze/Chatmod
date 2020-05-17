// ==UserScript==
// @name         Bot doxy para Chatovod
// @version      2.8.5
// @description  Cargador del bot doxy para Chatovod.
// @author       ArtEze
// @updateURL    https://arteze.github.io/charlavod/js/doxy/tampermonkey.js
// @match        *://*.chatovod.com/?bot=1
// @exclude      *://*.chatovod.com/id*
// @exclude      *://*.chatovod.com/register
// @exclude      *://*.chatovod.com/users/*
// @exclude      *://*.chatovod.com/widget/rpframe
// @exclude      *://account.chatovod.com/*
// @grant        none
// ==/UserScript==

window.doxy_tampermonkey = function(){
	/*
		La declaración con window permite borrarla.
		Tampermonkey necesita declarar variables de alguna manera.
		No se usa "var doxy" porque de esa manera no sería accesible desde el tag "<script>".
	*/

	window.obtener_carpeta = url=>url.split("/").slice(0,-1).concat("").join("/")
	var carpeta = window.obtener_carpeta("https://arteze.github.io/charlavod/js/doxy/tampermonkey.js")
	var etiqueta = document.createElement("script")
	etiqueta.src = `${carpeta}iniciar.js?${Date.now()}`
	document.head.appendChild(etiqueta)
}
window.doxy_tampermonkey()

