// ==UserScript==
// @name		 Chatovod
// @version	  1.3.8
// @description  Mejoras para el Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

"use strict";

window.descargar = function(dirección,función)
{
	var descarga = new XMLHttpRequest()
	descarga.onreadystatechange = function(){
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			if(función!=undefined)
			{
				función(descarga.responseText)
			}else
			{
				var descargado = descarga.responseText
				var hecho = false
				if(/error/gi.test(descargado)){console.log("error",{a:dirección,b:descargado});hecho = true}
				if(/{}/gi.test(descargado)&!hecho){console.log("correcto",{a:dirección});hecho = true}
				if(!hecho){console.log({a:descargado})}
			}
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
