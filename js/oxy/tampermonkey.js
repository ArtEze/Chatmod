// ==UserScript==
// @name         Bot Oxy para Chatovod
// @version      2.7.9
// @description  Cargador del bot Oxy para Chatovod.
// @author       ArtEze
// @match        *://*.chatovod.com/*
// @exclude	     *://*.chatovod.com/widget/rpframe
// @exclude	     *://account.chatovod.com/*
// @grant        none
// ==/UserScript==

window.obtener_carpeta = url=>url.split("/").slice(0,-1).concat("").join("/")
window.carpeta = obtener_carpeta("https://arteze.github.io/charlavod/js/oxy/tampermonkey.js")
var etiqueta = document.createElement("script")
etiqueta.src = `${carpeta}iniciar.js?${Date.now()}`
document.head.appendChild(etiqueta)

