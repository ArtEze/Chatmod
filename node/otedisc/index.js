/*

// Modo de uso:

// https://discordapp.com/developers/applications/me

cd ~/documentos/github/charlavod/node
node

// Carga clave desde archivo "../../../clave.txt"
require("./otedisc").iniciar()

// Enlace para invitar con ClienId:
// https://discordapp.com/oauth2/authorize?&client_id=373132327842349056&scope=bot&permissions=8

*/

var externo = {
	fs: require("fs")
	, crypto: require("crypto")

	, discord: require("discord.js")
	, image_to_ascii: require("image-to-ascii")
}

module.exports = {
	funs: {
		salida: function(){
			return process.stdout.write(...arguments)
		}
		, titular: function(título){
			this.salida(`\x1B]2;${título}\x07`)
		}
		, mostrar: function(){
			console.log(...arguments)
			this.salida("\x1b[00m>\x20")
		}
		, enviar: function(canal,contenido){
			// this.mostrar( "Mensaje: ",JSON.stringify(contenido) )
			if( contenido!=undefined && !/^\s*$/.test(contenido) ){
				var procesado = contenido.toString()
				var longitud = procesado.length
				//canal.send(longitud.toString())
				if(procesado.length<2000){
					canal.send(procesado)
				}
			}
		}
		, aleatorio_siete: function aleatorio_siete(x){
			return Math.floor(Date.now()/1000).toString(7).slice(-7)
		}
		, otecald: function otecald(x){
			return ote.funs.aleatorio_siete().split("").map(x=>"otecald"[x]).join("")
		}
		, procesar: function(canal,contenido){
			try{
				if(contenido.includes("fs.")){
					return ote.funs.otecald()
				}
				return eval(contenido)
			}catch(e){
				var pila = e.stack
				var sentencias = `Error:\n\x60\x60\x60\js\n${pila}\x60\x60\x60`
				var futuro = sentencias//.replace(/\/node_modules\/(.+?)\//g,"/node_modules/__$1__/")
				//this.enviar( canal, futuro )
				this.mostrar(e)
				return contenido
			}
		}
		, desprefijar: function(contenido,prefijo,es_imagen){
			var salida = ""
			var texto = es_imagen?(
				prefijo.replace(/\//g,"\\/").replace(/\+/g,"\\+")
			):"^\\s*"+prefijo+"\\s+"
			var regex = new RegExp(texto,"gi")
			var prefijo_encontrado = contenido.match(regex)
			if(prefijo_encontrado!=null){
				salida = contenido.replace(prefijo_encontrado,"")
			}
			return salida
		}
		, elegir_compacto: function(a,b){
			if(a==undefined&&b==undefined){return undefined}
			if(a!=undefined&&b==undefined){return a}
			if(a==undefined&&b!=undefined){return b}
			return a.length<b.length?a:b
		}
		, elegir_nombre_compacto: function(mensaje){
			var nombre = mensaje && mensaje.author && mensaje.author.username
			var alias  = mensaje && mensaje.member && mensaje.member.nickname
			return ote.funs.elegir_compacto(nombre,alias) || "desconocido"
		}
		, obtener_mencionados_array: function obtener_mencionados(mensaje){
			return mensaje.mentions.users.map(function(x){return x})
		}
		, obtener_mencionados_matriz: function obtener_mencionados_matriz(mensaje){
			return (this.obtener_mencionados_array(mensaje)
				.map(function(x){return [
					x.id
					, x.username
					, mensaje.guild && mensaje.guild.member(x).nickname
				]})
			)
		}
		, quitar_menciones: function quitar_menciones(mensaje){
			var salida = mensaje
			var regex_usuarios = new RegExp(`<@!?\\d+>`,"g")
			salida = salida.replace(regex_usuarios,"")
			return salida
		}
		, formatear_fecha: function(fecha){
			var tiempos = "Year Month Date Hours Minutes Seconds".
				split(" ").map(x=>`10${fecha["get"+x]()}`.slice(-2))
			return `\x1b[01;31m${tiempos.slice(0,3).join("")} ${tiempos.slice(-3).join(" ")}`
		}
		, imagen_hacia_texto: function imagen_hacia_texto(canal,url,puede_mostrar){
			var ancho = puede_mostrar?26:51
			if(url==null){return;}
			externo.image_to_ascii(url, {
				colored: !puede_mostrar
				, size: {width: ancho}
			},(e, procesado) => {
				if(e){
					console.log(`Error: ${e.toString()}`)
				}else{
					var lenguaje = "js"
					procesado = `\n\x60\x60\x60${lenguaje}\n${procesado}\x60\x60\x60`
					if(!puede_mostrar){
						ote.funs.mostrar(procesado)
					}else{
						ote.funs.enviar(canal,procesado)
					}
				}
			})
		}
		, obtener_enlaces: function(mensaje){
			var contenido = mensaje.content
			var adjuntos = mensaje.attachments.map(function(x){return x.url})
			var abecedario = "a-z"
			var a_1 = `${abecedario}\\d-.`
			var a_2 = `${a_1}_+()\\?=`
			var regex_urls = new RegExp(`(https?://)?[${a_1}]+(/[${a_2}]+)+`,"gi")
			// console.log( regex_urls )
			var enlaces = contenido.match(regex_urls)
			if(enlaces){
				enlaces = enlaces.map(x=>{
					return /^https?:\/\//i.test(x)?x:`http://${x}`
				})
				adjuntos = adjuntos.concat(enlaces)
			}
			return adjuntos
		}
		, graficar: function(contenido,adjuntos,puede_mostrar){
			procesado = contenido
			adjuntos.map(function(x){
				var es_imagen = true
				procesado = ote.funs.desprefijar(procesado,x,es_imagen)
				if( /bmp|jpg|gif/i.test() ){
					ote.funs.imagen_hacia_texto(externo.canal,x,puede_mostrar)
				}else{
					ote.funs.mostrar("El enlace no es coincidente con la extensión.")
				}
				return x
			})
			return procesado
		}
		, listar_servidores: function(){
			return ote.externo.bot.guilds.cache.map(x=>[x.name,[x]])
		}
		, listar_presentes: function(nombre_servidor){
			var servidor = ote.funs.listar_servidores()
				.filter(x=>x[0].includes(nombre_servidor))[0][1][0]
			var presentes = servidor.presences.cache
				.map(x=>[x.userID,x.status,x])
				.map(x=>{
					var array = x
					var array_nuevo = []
					var usuario = array.slice(-1)[0].guild.member(array[0]).user
					array_nuevo.push(
						usuario.bot?"bot":"usuario"
						, array[1]
						, usuario.username
						, [ array[2], usuario ]
					)
					return array_nuevo
				}).filter(x=>x[0]=="usuario")
			return presentes
		}
		, archivo_hacia_json: function(x){
			return JSON.parse(fs.readFileSync(x).toString())
		}
		, criptorar: function(cifrado,clave,puede_encriptar){
			var bases = ["base64","utf8"]
			var array = (!puede_encriptar)?[ "Dec",...bases]:["C",...bases.reverse()]
			var vector_inicial = "0123456789abcdef"
			var llave = new Buffer.alloc(16,clave).toString()
			var criptura = externo.crypto[`create${array[0]}ipheriv`]("aes-128-cbc",llave,vector_inicial,{})
			var salida = criptura.update(cifrado,array[1],array[2])
			salida += criptura.final(array[2])
			return salida
		}
		, desencriptar: function desencriptar(token_encriptado,clave){
			return ote.funs.criptorar(token_encriptado,clave,false)
		}
		, encriptar: function encriptar(token_original ,clave) {
			return ote.funs.criptorar(token_original,clave,true)
		}
	}
	, iniciar: function(clave){
		ote.externo = externo
		externo.bot = new externo.discord.Client()

		ote.depurado = {
			dichos: []
		}
		var depurado = ote.depurado

		var prefijo = "ot+ec?a?l?d?"
		depurado.regex_prefijo = new RegExp(prefijo,"i")
		depurado.regex_prefijo_ote = new RegExp("^\s*"+prefijo+"\s*$","i")

		externo.bot.on("ready", function() {
			ote.funs.mostrar(`Listo y sin errores. ${new Date()}`)
			ote.funs.titular("Otecald Bot Discord")
		})

		externo.bot.on("message", function(mensaje) {
			var contenido = mensaje.content
			depurado.contenido = contenido
			externo.canal = mensaje.channel

			externo.mensaje = mensaje

			depurado.servidor = mensaje.guild && mensaje.guild.name || `privado`

			depurado.receptor = ( externo.canal && (
					externo.canal.name
					|| externo.canal.recipient && externo.canal.recipient.username
				) || `desconocido`
			)

			depurado.autor_mensaje = mensaje.author.id
			depurado.autor = ote.funs.elegir_nombre_compacto(mensaje)

			depurado.fecha = new Date()
			
			depurado.consola = contenido
			depurado.titulado = contenido
			
			var naranja = (0x8a1b39de504n*0x10n**4n+6n).toString()
			var color_autor = 32 // Color autor
			if(depurado.autor_mensaje==naranja){
				color_autor = 30
			}

			depurado.conteo = 0
			ote.funs.obtener_mencionados_matriz(mensaje).map(function(x){
				var regex_usuarios = new RegExp(`<@!?(${x[0]})>`,"g")
				var nick = ote.funs.elegir_compacto(x[1],x[2])
				color = depurado.conteo%2?35:36
				if(x[0]==naranja){
					color = 30
				}
				depurado.consola = depurado.consola.replace(
					regex_usuarios,`\x1b[01;${color}m@${nick}\x1b[01;37m`
				)
				depurado.titulado = depurado.titulado.replace(
					regex_usuarios,`@${nick}`
				)
				++depurado.conteo
			})
			depurado.titulado_nombre_y_mensaje = `${depurado.autor}: ${depurado.titulado}`

			depurado.canal_final = `\x1b[01;${color_autor}m${depurado.autor} `
				+`\x1b[01;34m${depurado.servidor} \x1b[01;33m${depurado.receptor}`

			depurado.mensaje_final = `\x1b[01;37m${depurado.consola}\x1b[00m`

			var dicho_final = depurado.dichos.slice(-1)[0]
			if( dicho_final && dicho_final[1]!=depurado.canal_final || dicho_final==null ){
				ote.funs.mostrar(depurado.canal_final)
			}
			ote.funs.mostrar(ote.funs.formatear_fecha(depurado.fecha), depurado.mensaje_final)

			depurado.dicho = [
				depurado.fecha, depurado.canal_final, depurado.titulado_nombre_y_mensaje
			].filter(x=>x)
			depurado.dichos.push(depurado.dicho)

			ote.funs.titular(`${depurado.titulado_nombre_y_mensaje}`) // otedisc

			depurado.adjuntos = ote.funs.obtener_enlaces(mensaje)

			var desprefijado = ote.funs.desprefijar(contenido,prefijo)
			var args = desprefijado.split(/\s+/g)

			//if (mensaje.author.bot) return;
			if ( !depurado.regex_prefijo.test(contenido) ){
				var puede_mostrar = false
				ote.funs.graficar("",depurado.adjuntos,puede_mostrar)
				return;
			}

			var procesado = ""
			var pref_mp = "mp"
			var argumento = args[0]
			switch( argumento ){
				case "info":
					procesado = "Un mensaje."
					break;
				case "+":
					procesado = args.slice(1).join(" ")
					break;
				case pref_mp:
					procesado = args.slice(1).join(" ")
					procesado = ote.funs.quitar_menciones(procesado)
					procesado = ote.funs.procesar(mensaje,procesado)
					break;
				case "img":
					var puede_mostrar = true
					procesado = args.slice(1).join(" ")
					procesado = ote.funs.graficar(procesado,depurado.adjuntos,puede_mostrar)
					break;
				case "kill":
					var aleatorio = Math.floor(Date.now()/30)%8+2
					if(aleatorio>=5&&aleatorio<=9){
						//if (mensaje.author.username.includes("ari")) return;
						//return;
					}
					if(aleatorio==2){
	 					procesado = `<@!${mensaje.author.id}> Le has robado `
	 						+`${aleatorio} kills a ${args[1]}.`
					}
					if(aleatorio>=3&&aleatorio<=8){
						var menciona_a_ari = [...mensaje.mentions.users]
							.map(function(x){return x[1].username})
							.includes("ari ☯")
						if( menciona_a_ari ){
							procesado = `No se puede matar a la reina.`
						}else{
							procesado = `<@!${mensaje.author.id}> Mataste a ${args[1]}.`
						}
						
					}
 					break;
				default:
					procesado = desprefijado
					procesado = ote.funs.quitar_menciones(procesado)
					procesado = ote.funs.procesar(mensaje,procesado)
					break;
			}
			if( ote.depurado.regex_prefijo_ote.test(mensaje) ){
				procesado = ote.funs.otecald()
			}
			if(argumento==pref_mp){
				var receptores = undefined
				var menciones = [...ote.funs.obtener_mencionados_array(mensaje)]
				if(menciones.length!=0){
					receptores = [...new Set(menciones)]
				}else{
					receptores = [mensaje.author]
				}
				receptores.map(function(x){
					if(!x.bot){
						var dm = externo.discord.DMChannel
						var privado = new externo.discord.DMChannel(
							externo.bot
							, { recipients: [x] }
						)
						try{
							privado.recipient.send(procesado)
						}catch(e){
							ote.funs.mostrar(x,e.toString())
						}
					}
				})
			}else{
				ote.funs.enviar(externo.canal,procesado)
			}

			return;
		})

		var inicio = ote.funs.archivo_hacia_json(
			`${__dirname}/../../../../otedis/inicio.json`
		)
		var token_encriptado = ote.funs.archivo_hacia_json(
			`${__dirname}/token_encriptado.json`
		).token_encriptado
		if(clave==undefined){
			clave = inicio.clave
		}
		var token_desencriptado = ote.funs.desencriptar(token_encriptado,clave)
		externo.inicio = externo.bot.login(token_desencriptado)
	}
}

ote = module.exports // Variable global
var puede_iniciar = process.argv[2]
if(puede_iniciar=="sip"){
	var clave = process.argv[3]
	ote.iniciar(clave)
}

