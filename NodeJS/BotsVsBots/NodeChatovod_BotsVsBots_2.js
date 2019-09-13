/*
Descargar http_otecald desde:
	https://github.com/ArtEze/arteze.github.io/Lenguajes/NodeJS/http_otecald/index.js

node "/eze/Node/BotsVsBots/NodeChatovod_BotsVsBots_2.js" nekonwn 0
*/

var bajar = require("http_otecald")

var descargar_usuarios = function(){
	var página = 1
	var chat = "propiedaddejocelyn"
	var host = "http://"+chat+".chatovod.com"
	var host_español = host + "/es/"
	var opciones = "&s=0&_a=on&a=0"
	var opciones = "&s=0&as=&ae=&n=&f=1&m=1&_a=on"
	var opciones = "&s=0&_a=on"
	var url_1 = host_español+"users/?p="+((página-1)*20)+opciones

	bajar.descargar(...bajar.objeto_a_pedido(bajar.retrollamadas({
		url: url_1
		, método: "GET"
		, cabezas: {}
		, cbs: {
			estado: {
				error: function(x){cb_err_analizar_usuarios(x,chat)}
				, correcto: function(x){cb_analizar_usuarios(x,chat)}
			}
		}, poderes: {
			mostrar: {
				$: true
				, url: true
				, cuerpo: {
					error: false
					, correcto: false
				}
			}, estado: {
				redireccionar: true
				, abortar_pedido: true
			}
		}
	})))

}

/*

mobchatroom    mobchatroom
chatadda       allinonechat
chatroomcorner chatroomcorner
*/
function analizar_usuarios(texto_html,chat){

	var regexs = [
			/<a href=".+?">/
			, /<div class="avatar pull-left" style="background-image: url(.+?)/
			, /<span class="nickWrapper(\s.+)?">/
			, /<span class="nickIcon"/
			, /<div class="">.+?<\/div>/
			, /<div class="onlineLine">/
	]
	var regexs_sub = [
		/"(.+)"/
		, /(".+?")/g
		, /color:#([0-9a-zA-Z]{6})/
		, /id/
		, /d\d+">([^<]+)</
		, /e">(.+)<\/span></
		, /<div class="">(.*)<\/div>/
	]
	var usuarios = texto_html.split("<div class=\"clearfix\">")
		.slice(1)
	usuarios[usuarios.length-1] = usuarios[usuarios.length-1].split("</li>").slice(0,1)[0]
	usuarios = usuarios.map(function(x){
		var devuelve = {}
		x
		.split("\r\n")
		.filter(function(x){
			//return x
			var c = regexs.map(function(y){return y.test(x)})
			if(regexs[2].test(x)){
				//console.log(222,x,222,c,333)
			}
			var n = regexs[1].test(x)
			return c[0] || c[2] || c[3] || c[4] || c[5]
			//return /*c[0] ||*/ c[2] /* || c[3] || c[4] || c[5]*/
			//return /*c[0] || c[2] || c[3] ||*/ c[4] /*|| c[5]*/
		})
		.map(function(x){
			if(regexs[2].test(x)){
				// Tipo 2: Género, estado, poder y VIP
				var y = x
					.match( regexs_sub[0] )[1]
					.split(" ")
					.slice(1)
				devuelve.gen = y.includes("male")?"hombre":y.includes("female")?"mujer":"neutro"
				devuelve.estado = y.includes("away")?"ausente":y.includes("dnd")?"ocupado":"ninguno"
				devuelve.poder = y.includes("admin")?"administrador":y.includes("moderator")?"moderador":"usuario"
				devuelve.vip = y.includes("vip")?true:false // VIP
			}
			if(regexs[3].test(x)){
				// Tipo 3: Color. Chat e id. Nombre. Edad. (VIP no se agrega)
				var color_chat_id_nick_edad = x
					.match( regexs_sub[1] )
					.map(function(x){return x.slice(1,-1)})
					.filter(function(x){
						var c = [
							regexs_sub[2].test(x)
							, regexs_sub[3].test(x)
						]
						return c[0] || c[1]
					}).map(function(x){
						if( regexs_sub[2] .test(x) ){
							var y = x.match( regexs_sub[2] )[1]
							devuelve.color = +("0x" + y) // Color
						}
						if( regexs_sub[3] .test(x) ){ // Chat e id
							var y = x.split("/id")
							devuelve.chat = y[0]==""?chat:y[0]
							devuelve.id = +y[1]
						}
						return devuelve
					})
				var nombre = x.match( regexs_sub[4] )[1] // Nombre
				var edad = x.match( regexs_sub[5] )
				edad = edad==null?0:+edad[1]  // Edad
				devuelve.nombre = nombre
				devuelve.edad = edad
			}
			if(regexs[4].test(x)){
				console.log(x)
				// Tipo 4: País.
				var lugar = x
					.match( regexs_sub[6] )[1] // País (Lugar).
				devuelve.lugar = lugar 
			}
			devuelve.presente = regexs[5].test(x)
		})
 		devuelve.lugar = devuelve.lugar?devuelve.lugar:""
		return devuelve
	})
	return usuarios
}
function cb_analizar_usuarios(x,chat){
	//console.log(x)
	var usuarios = analizar_usuarios(x,chat)
	console.log(usuarios,usuarios.length)
}
function cb_err_analizar_usuarios(x,chat){
	//console.log(x)
}
descargar_usuarios()

