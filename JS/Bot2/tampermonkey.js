﻿// ==UserScript==
// @name		 Bot Otecald Chatovod
// @version	  3.0.0
// @description  Cargador del cargador del Bot Otecald para Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

"use strict";

window.número_aleatorio = hasta=>Math.floor(Math.random()*hasta)
window.cargar_cargador = function()
{
	if(document.querySelector(".chat")==null){return;}
	window.dirección_bot = "https://github.com/ArtEze/Chatovod_Mod/blob/master/JS/Bot2/tampermonkey.js"
	window.dir_partes = JSON.parse(window.dirección_bot.replace(
		/^(.+):\/\/(.+)\.([^/]+)\/(.+)\/(.+)\/blob\/master([^.]+)\/([^.]+)\.(.+)$/gi,'["$1","$2","$3","$4","$5","$6","$7","$8"]')
	)
	var a = window.dir_partes
	window.raw_dir = a[0]+"://"+a[3].toLowerCase()+"."+a[1]+".io/"+a[4]+a[5]+"/"
	var archivo = "navegador"
	var interrogación = "?"
	var ruta = window.raw_dir + archivo + ".js" + interrogación + window.número_aleatorio(100000000000)
	var b = document.createElement("script")
	b.src = ruta
	document.head.appendChild(b)
}
window.cargar_cargador()
