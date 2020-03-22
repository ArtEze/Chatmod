// ==UserScript==
// @name         Bot Otecald Chatovod
// @version      2.7.6
// @description  Cargador del cargador del Bot Otecald para Chatovod.
// @author       ArtEze
// @match        *://*.chatovod.com/*
// @grant        none
// ==/UserScript==

window.número_aleatorio = function(hasta){
	return Math.floor(Math.random()*hasta)
}
window.cargar_cargador = function()
{
	if(document.querySelector(".chat")==null){return;}

	/*
		Tampermonkey
		Archivo en proyecto: https://github.com/arteze/charlavod/blob/master/JS/Bot/tampermonkey.js
		Ruta en GitHub Pages: https://arteze.github.io/charlavod/JS/Bot/tampermonkey.js
	*/
	window.dirección_bot = "https://github.com/arteze/charlavod/blob/master/JS/Bot/tampermonkey.js"

	window.dir_partes = JSON.parse(window.dirección_bot.replace(
		/^(.+):\/\/(.+)\.([^/]+)\/(.+)\/(.+)\/blob\/master([^.]+)\/([^.]+)\.(.+)$/gi,'["$1","$2","$3","$4","$5","$6","$7","$8"]')
	)
	var a = window.dir_partes
	window.raw_dir = a[0]+"://"+a[3].toLowerCase()+"."+a[1]+".io/"+a[4]+a[5]+"/"
	var archivo = "Cargar_lista_archivos"
	var interrogación = "?"
	var ruta = window.raw_dir + archivo + ".js" + interrogación + window.número_aleatorio(100000000000)
	var b = document.createElement("script")
	b.src = ruta
	document.head.appendChild(b)
}
window.cargar_cargador()
