/*
Descargar http_otecald desde:
	https://github.com/ArtEze/arteze.github.io/Lenguajes/NodeJS/http_otecald/index.js

node "/eze/Node/BotsVsBots/NodeChatovod_BotsVsBots_2.js" nekonwn 0
*/

console.log("Comenzando análisis")

var bajar = require("http_otecald")
var analizar_usuarios = require("analizar_usuarios")

var descargar_usuarios = function(){
	var página = 965
	página = process.argv[2]
	if(página==undefined){página=1}
	var opciones = "&s=0&_a=on&a=0"
	var opciones = "&s=0&as=&ae=&n=&f=1&m=1&_a=on"
	var opciones = "&s=0&_a=on&a=1"
	var chat = "chat"
/*
	var opciones = "&s=0&_a=on"
	var chat = "propiedaddejocelyn"
	var chat = "blackchat-dead"
*/
	var host = "http://"+chat+".chatovod.com"
	var host_español = host + "/es/"


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
1     BroyoneLayer
2     DaddySwitch
3     TinyOne
4     GilGamer
5     LaMatraca
6 803 AmitArora
7 965 PonMani

Uno cada 138 páginas. Estimado total 296
Estimado total: Math.floor( (815146/20)/(965/7) )
*/

function cb_analizar_usuarios(x,chat){
	//console.log(x)
	var usuarios = analizar_usuarios.analizar_usuarios(x,chat)
	var usuarios_filtrados = usuarios.filter(function(x){
			return !(
				x.gen=="neutro"
				// x.estado
				&& x.poder == "usuario"
				&& x.vip == false
				&& x.color == undefined
				// x.servidor
				// x.id
				// x.nombre
				&& x.edad == undefined
				&& x.lugar == undefined
				// x.presente
				&& x.avatar == 0
				&& /^([A-ZÑÁÉÍÓÚ][a-zñáéíóú]+){2}$/.test(x.nombre)
			)
		})
	console.log( usuarios )
	var id_y_nombre = usuarios_filtrados.map(function(x){
		return [ x.id, x.nombre, x.avatar, x.color ]
	})
	console.log( id_y_nombre.length, id_y_nombre )

	console.log("Fin análisis")

}
function cb_err_analizar_usuarios(x,chat){
	//console.log(x)
}
descargar_usuarios()

