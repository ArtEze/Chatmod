/*
Descargar http_otecald desde:
	https://github.com/ArtEze/arteze.github.io/Lenguajes/NodeJS/http_otecald/index.js

node "/eze/Node/BotsVsBots/NodeChatovod_BotsVsBots_2.js" nekonwn 0
*/

var http_otecald = require("http_otecald")
var descargar = http_otecald.descargar_normal

var descargar_usuarios = function(){
	var página = 0
	var chat = "nekonwn"
	var host = "http://"+chat+".chatovod.com"
	var host_español = host + "/es/"
	var url_1 = host_español+"users/?p="+(pagina*20)+"&s=0&_a=on&a=1"

	console.log(url_1)

	var opciones = {
		correcto: opciones.cbs.estado.correcto
		, error: opciones.cbs.estado.error
	}

	descargar(url_1,"GET",opciones)
	
	descargar(url_1,"GET",callback({
		headers: undefined,
		callback_start: function(res){
			console.log("aaaaaaaaaaaaa")
			if(res.statusCode==302){
				var y00 = res.headers.location
				console.log("aaaaaaaaaaaaa")
				comprobar_avatar_predeterminado(y00,id_cola,num_hilo,array_usuarios,usuario,resultado)
				this.abort()
			}
			return true
		},
		callback_end: function(x){
			cb(x)
			return true
		},
		respuesta: {
			$: true,
			sub: { start: true, cb_start: false, data: true,
				end: {
					$: true, analizar: { json: false, html: false }, cb_end: true }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}

