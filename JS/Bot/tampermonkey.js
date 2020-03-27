// ==UserScript==
// @name         Bot Otecald Chatovod
// @version      2.7.6
// @description  Cargador del cargador del Bot Otecald para Chatovod.
// @author       ArtEze
// @match        *://*.chatovod.com/*
// @grant        none
// ==/UserScript==

window.cargar_cargador = function()
{
	if(document.querySelector(".chat")==null){return;}

	window.dirección_bot = "https://arteze.github.io/charlavod/JS/Bot/tampermonkey.js"
	window.raw_dir = window.dirección_bot.split("/").slice(0,-1).concat("").join("/")
	var archivo = "cargar_lista_archivos"
	var interrogación = "?"
	var ruta = window.raw_dir + archivo + ".js" + interrogación + Date.now()
	var b = document.createElement("script")
	b.src = ruta
	document.head.appendChild(b)
}
window.cargar_cargador()
