/*
Descargar http_otecald desde:
	https://github.com/ArtEze/arteze.github.io/Lenguajes/NodeJS/http_otecald/index.js

node "/eze/Node/BotsVsBots/NodeChatovod_BotsVsBots_2.js" nekonwn 0
*/

var bajar = require("http_otecald")

var descargar_usuarios = function(){
	var página = 0
	var chat = "nekonwn"
	var host = "http://"+chat+".chatovod.com"
	var host_español = host + "/es/"
	var url_1 = host_español+"users/?p="+(página*20)+"&s=0&_a=on&a=1"

	bajar.descargar(...bajar.objeto_a_pedido(bajar.retrollamadas({
		url: url_1
		, método: "GET"
		, cabezas: {}
		, cbs: {
			estado: {
				error: function(x){cb_err_analizar_usuarios(x)}
				, correcto: function(x){cb_analizar_usuarios(x)}
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
function cb_analizar_usuarios(x){
	console.log(x)
	var usuarios = x.match(/<li.*?>.+?<\/li>/g)
	console.log(usuarios)
}
function cb_err_analizar_usuarios(x){
	console.log(x)
}
descargar_usuarios()

