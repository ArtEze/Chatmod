// ==UserScript==
// @name		 Bot2 Otecald Chatovod
// @version	  3.0.1
// @description  El bot versión 2.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

"use strict";

window.número_aleatorio = hasta=>Math.floor(Math.random()*hasta)
window.interrogación = "?"
window.no_chache = ()=>window.interrogación + window.número_aleatorio(100000000000)
window.cargar_cargador = function()
{
	if(document.querySelector(".chat")==null){return;}
	window.dir_bot2 = "https://github.com/ArtEze/Chatovod_Mod/blob/master/JS/Bot2/tampermonkey.js"
	window.dir_partes = JSON.parse(window.dir_bot2.replace(
		/^(.+):\/\/(.+)\.([^/]+)\/(.+)\/(.+)\/blob\/master([^.]+)\/([^.]+)\.(.+)$/gi,'["$1","$2","$3","$4","$5","$6","$7","$8"]')
	)
	var a = window.dir_partes
	window.raw_dir_bot2 = a[0]+"://"+a[3].toLowerCase()+"."+a[1]+".io/"+a[4]+a[5]+"/"
	var archivo = "navegador"
	var ruta = window.raw_dir_bot2 + archivo + ".js" + window.no_chache()
	var b = document.createElement("script")
	b.src = ruta
	document.head.appendChild(b)
}
window.cargar_cargador()
