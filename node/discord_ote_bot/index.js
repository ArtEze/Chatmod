/*

// Modo de uso:

// https://discordapp.com/developers/applications/me

cd ~/documentos/github/charlavod/node
node

// Carga clave desde archivo "../../../clave.txt"
require("./discord_ote_bot").iniciar()

// Enlace para invitar con ClienId:
// https://discordapp.com/oauth2/authorize?&client_id=373132327842349056&scope=bot&permissions=8

*/

var discord = require("../../../node_modules/discord.js")
var fs = require("fs")
var crypto = require("crypto")
var image_to_ascii = require("image-to-ascii")

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
		, enviar: function(mensaje_objeto,mensaje){
			// this.mostrar( "Mensaje: ",JSON.stringify(mensaje) )
			if(mensaje!=undefined){
				var procesado = mensaje.toString()
				var longitud = procesado.length
				//mensaje_objeto.channel.send(longitud.toString())
				if(procesado.length<2000){
					mensaje_objeto.channel.send(procesado)
				}
				
			}
		}
		, procesar: function(mensaje_objeto,mensaje){
			try{
				return eval(mensaje)
			}catch(error){
				e = error
				var pila = error.stack
				var c = `Error:\n\x60\x60\x60\js\n${pila}\x60\x60\x60`
				var por_enviar = c//.replace(/\/node_modules\/(.+?)\//g,"/node_modules/__$1__/")
				//this.enviar( mensaje_objeto, por_enviar )
				this.mostrar(error)
				return mensaje
			}
		}
		, desprefijar: function(mensaje,prefijo){
			var salida = ""
			var regex = new RegExp("^\\s*"+prefijo+"\\s+","gi")
			var prefijo_encontrado = mensaje.match(regex)
			if(prefijo_encontrado!=null){
				salida = mensaje.replace(prefijo_encontrado,"")
			}
			return salida
		}
		, obtener_mencionados_array: function obtener_mencionados(mensaje){
			return mensaje.mentions.users.map(function(x){return x})
		}
		, elegir_compacto: function(a,b){
			if(a==undefined&&b==undefined){return undefined}
			if(a!=undefined&&b==undefined){return a}
			if(a==undefined&&b!=undefined){return b}
			return a.length<b.length?a:b
		}
		, elegir_nombre_compacto: function(mensaje){
			var no_definido = "desconocido"
			var m = mensaje
			var n = no_definido
			var nombre = m && m.author && m.author.username
			var alias = m && m.member && m.member.nickname
			return o.funs.elegir_compacto(nombre,alias) || "desconocido"
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
			var d = fecha
			var tener_dos_cifras_finales = x => `10${x}`.slice(-2)
			var ab = x=>tener_dos_cifras_finales(x)
			var c = "Year Month Date Hours Minutes Seconds".
				split(" ").map(x=>ab(d["get"+x]()))
			return  `\x1b[01;31m${c.slice(0,3).join("")} ${c.slice(-3).join(" ")}`
		}
		, aleatorio_siete: function aleatorio_siete(x){
			return Math.floor(Date.now()/1000).toString(7).slice(-7)
		}
		, otecald: function otecald(x){
			return o.funs.aleatorio_siete().split("").map(x=>"otecald"[x]).join("")
		}
		, imagen_hacia_texto: function imagen_hacia_texto(mensaje,url,ancho){
			if(url==null){return;}
			image_to_ascii(url, {
				colored: false
				, size: {width: ancho}
			},(err, procesado) => {
				if(err){
					console.log(err)
				}else{
					var lenguaje = "cs"
					procesado = `\n\x60\x60\x60${lenguaje}\n${procesado}\x60\x60\x60`
					console.log(procesado)
					o.funs.enviar(mensaje,procesado)
				}
			})
		}
		, archivo_hacia_json: function(x){
			return JSON.parse(fs.readFileSync(x).toString())
		}
		, generar_iv_y_clave: function(clave){
			return {iv: "0123456789abcdef"
				,clave: new Buffer.alloc(16,clave).toString()
			}
		}
		, desencriptar: function desencriptar(token_encriptado,clave){
			var c = o.funs.generar_iv_y_clave(clave)
			var desencriptador = crypto.createDecipheriv("aes-128-cbc",c.clave,c.iv,{})
			var salida = desencriptador.update(token_encriptado, "base64", "utf8")
			salida += desencriptador.final("utf8")
			return salida
		}
		, encriptar: function encriptar(token,clave) {
			var c = o.funs.generar_iv_y_clave(clave)
			var encriptador = crypto.createCipheriv("aes-128-cbc",c.clave,c.iv,{})
			var salida = encriptador.update(token, "utf8", "base64")
			salida += encriptador.final("base64")
			return salida
		}
	}
	, iniciar: function(clave){
		var bot = new discord.Client()
		o.externo = {
			bot: bot
			, discord: discord
			, crypto: crypto
			, fs: fs
		}
		o.e = o.externo
		bot.ote = ote

		o.g = {}
		o.g.dichos = []
		
		var prefijo = "ot+ec?a?l?d?"
		o.g.regex_prefijo = new RegExp(prefijo,"i")
		o.g.regex_prefijo_b = new RegExp("^\s*"+prefijo+"\s*$","i")

		bot.on("ready", function() {
			o.funs.mostrar(`Listo y sin errores. ${new Date()}`)
			o.funs.titular("Otecald Bot Discord")
		})

		bot.on("message", function(message) {

			var u = o.g

			o.e.m = message
			var m = o.e.m
			
			u.g = m.guild && m.guild.name || `privado`

			u.c = ( m.channel && (
					m.channel.name
					|| m.channel.recipient && m.channel.recipient.username
				) || `desconocido`
			)
			u.a = o.funs.elegir_nombre_compacto(m)
			u.n = m.content

			u.d = new Date()
			
			u.p = u.n
			u.q = u.n
			
			var naranja = (0x8a1b39de504n*0x10n**4n+6n).toString()
			var c_autor = 32 // Color autor
			if(o.e.m.author.id==naranja){
				c_autor = 30
			}
			u.r = o.funs.obtener_mencionados_matriz(m)
			u.i = 0
			u.r.map(function(x){
				var regex_usuarios = new RegExp(`<@!?(${x[0]})>`,"g")
				var nick = o.funs.elegir_compacto(x[1],x[2])
				color = u.i%2?35:36
				if(x[0]==naranja){
					color = 30
				}
				u.p = u.p.replace(regex_usuarios,`\x1b[01;${color}m@${nick}\x1b[01;37m`)
				u.q = u.q.replace(regex_usuarios,`@${nick}`)
				++u.i
			})
			u.t = `${u.a}: ${u.q}`
			u.b = `\x1b[01;${c_autor}m${u.a} \x1b[01;34m${u.g} \x1b[01;33m${u.c}`
			u.o = `\x1b[01;37m${u.p}\x1b[00m`

			var dicho_final = o.g.dichos.slice(-1)[0]
			if( dicho_final && dicho_final[1]!=u.b || dicho_final==null ){
				o.funs.mostrar(u.b)
			}
			o.funs.mostrar(o.funs.formatear_fecha(u.d), u.o)

			u.l = [ u.d, u.b, u.t ].filter(x=>x)
			o.g.dichos.push(u.l)

			var mensaje = message.content
			o.funs.titular(`${u.t} - OteDiscord`)

			var adjuntos = m.attachments
			var array_adjuntos = adjuntos.map(function(x){
				o.funs.imagen_hacia_texto(m,x.url,28)
				return x.attachment
			})

			//if (m.author.bot) return;

			if ( !o.g.regex_prefijo.test(mensaje) ) return;

			var desprefijado = o.funs.desprefijar(mensaje,prefijo)
			var args = desprefijado.split(/\s+/g)
			var argumento = args[0]
			var procesado = ""
			var pref_mp = "mp"
			switch( argumento ){
				case "info":
					procesado = "Un mensaje."
					break;
				case "+":
					procesado = args.slice(1).join(" ")
					break;
				case pref_mp:
					procesado = args.slice(1).join(" ")
					procesado = o.funs.quitar_menciones(procesado)
					procesado = o.funs.procesar(message,procesado)
					break;
				case "kill":
					var aleatorio = Math.floor(Date.now()/30)%8+2
					if(aleatorio>=5&&aleatorio<=9){
						//if (message.author.username.includes("ari")) return;
						//return;
					}
					if(aleatorio==2){
	 					procesado = `<@!${message.author.id}> Le has robado ${aleatorio} kills a ${args[1]}.`
					}
					if(aleatorio>=3&&aleatorio<=8){
						var menciona_a_ari = [...m.mentions.users].map(function(x){return x[1].username}).includes("ari ☯")
						if( menciona_a_ari ){
							procesado = `No se puede matar a la reina.`
						}else{
							procesado = `<@!${message.author.id}> Mataste a ${args[1]}.`
						}
						
					}
 					break;
				default:
					procesado = desprefijado
					procesado = o.funs.quitar_menciones(procesado)
					procesado = o.funs.procesar(message,procesado)
					break;
			}
			if( o.g.regex_prefijo_b.test(mensaje) ){
				procesado = o.funs.otecald()
			}
			if(argumento==pref_mp){
				var receptores = undefined
				var menciones = [...o.funs.obtener_mencionados_array(message)]
				if(menciones.length!=0){
					receptores = [...new Set(menciones)]
				}else{
					receptores = [message.author]
				}
				receptores.map(function(x){
					if(!x.bot){
						var dm = o.externo.discord.DMChannel
						var privado = new o.externo.discord.DMChannel(
							o.externo.bot
							, { recipients: [x] }
						)
						try{
							privado.recipient.send(procesado)
						}catch(e){
							o.funs.mostrar(x,e.toString())
						}
					}
				})
			}else{
				o.funs.enviar(message,procesado)
			}

			return;
		})

		var inicio = o.funs.archivo_hacia_json(
			`${__dirname}/../../../../otedis/inicio.json`
		)
		var token_encriptado = o.funs.archivo_hacia_json(
			`${__dirname}/token_encriptado.json`
		).token_encriptado
		if(clave==undefined){
			clave = inicio.clave
		}
		var token_desencriptado = o.funs.desencriptar(token_encriptado,clave)
		bot.login(token_desencriptado)
	}
}

ote = module.exports // Variable global
o = ote // Simplificado
var puede_iniciar = process.argv[2]
if(puede_iniciar=="sip"){
	var clave = process.argv[3]
	o.iniciar(clave)
}

