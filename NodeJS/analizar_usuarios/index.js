/*
Descargar analizador_html desde:
	Archivo en proyecto: https://github.com/arteze/arteze.github.io/blob/master/lenguaje/node_js/analizador_html/index.js
	Ruta en GitHub Pages: https://arteze.github.io/lenguaje/node_js/analizador_html/index.js
*/

var html = require("analizador_html")

var analizar_usuarios = function(texto_html,chat){
	var analizado = html.html(texto_html)

	var lista_usuarios = html.buscar( analizado, "div", [["class","list-unstyled"]] )[0]
	var usuarios = html.buscar( lista_usuarios, "div", [["class","clearfix"]] )
	var procesado = usuarios.map(function(x){
		var devuelve = {}
		var nickWrapper = html.buscar( x, "span", [["class","nickWrapper"]] )[0]
		var contenedor_nombre = html.buscar( x, "a", [["class","nick"]] )[0]
		var edad = html.buscar( nickWrapper, "span", [["class","age"]] )[0]
		var lugar = html.buscar( x, "div", [["class",""]] )[0]
		var presente = html.buscar( x, "div", [["class","onlineLine"]] )[0]
		var imagen = html.buscar( x, "div", [["class","avatar"]] )[0]

		var y = nickWrapper[0][3][0][1].split(" ").slice(1)
		var z = contenedor_nombre
		var a = edad && +edad[1][2]
		var b = lugar && lugar.length==3 && lugar[1][2]
		var c = !!presente
		var d = imagen

		var color = z[0][3].filter(function(x){return x[0]=="style"})[0]
		var chat_usuario = z[0][3].filter(function(x){return x[0]=="href"})[0]
		var fondo = d[0][3].filter(function(x){return x[0]=="style"})[0]

		devuelve.gen = y.includes("male")?"hombre":y.includes("female")?"mujer":"neutro"
		devuelve.estado = y.includes("away")?"ausente":y.includes("dnd")?"ocupado":"ninguno"
		devuelve.poder = y.includes("admin")?"administrador":y.includes("moderator")?"moderador":"usuario"
		devuelve.vip = y.includes("vip")?true:false

		if( color[1] ){
			devuelve.color = +("0x" + color[1].split("#")[1])
		}
		var nombre_chat = Array.from( chat_usuario[1].match( /(.+?)(\d+)$/ ) ).slice(1)
		var nombre_servidor = nombre_chat[0].match(/[^/]+/)[0].replace(/\.chatovod\.com$/,"")
		devuelve.servidor = nombre_servidor==""?chat:nombre_servidor
		devuelve.id = +nombre_chat[1]
		devuelve.nombre = z[1][2]
		if( a ){ devuelve.edad = a }
		if( b ){ devuelve.lugar = b }
		devuelve.presente = c
		devuelve.avatar = +fondo[1].split(/[()?]/)[2]
		return devuelve
	})
	return procesado
}
module.exports = {
	analizar_usuarios: analizar_usuarios
}

