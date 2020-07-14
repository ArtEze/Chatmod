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
			this.salida(">\x20")
		}
		, enviar: function(mensaje_objeto,mensaje){
			//this.mostrar("Mensaje: ",mensaje)
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
				var consola = `Error:\n\x60\x60\x60\js\n${pila}\x60\x60\x60`
				var por_enviar = consola//.replace(/\/node_modules\/(.+?)\//g,"/node_modules/__$1__/")
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
		, obtener_mencionados_matriz: function obtener_mencionados_matriz(mensaje){
			return (this.obtener_mencionados_array(mensaje)
				.map(function(x){return [
					x.id
					,x.username
					, ( mensaje.guild
						&& mensaje.guild.member(x).nickname
					) || undefined
				]})
			)
		}
		, quitar_menciones: function quitar_menciones(mensaje){
			var salida = mensaje
			var regex_usuarios = new RegExp(`<@!?\\d+>`,"g")
			salida = salida.replace(regex_usuarios,"")
			return salida
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
			var c = ote.funs.generar_iv_y_clave(clave)
			var desencriptador = crypto.createDecipheriv("aes-128-cbc",c.clave,c.iv,{})
			var salida = desencriptador.update(token_encriptado, "base64", "utf8")
			salida += desencriptador.final("utf8")
			return salida
		}
		, encriptar: function encriptar(token,clave) {
			var c = ote.funs.generar_iv_y_clave(clave)
			var encriptador = crypto.createCipheriv("aes-128-cbc",c.clave,c.iv,{})
			var salida = encriptador.update(token, "utf8", "base64")
			salida += encriptador.final("base64")
			return salida
		}
	}
	, iniciar: function(clave){
		var bot = new discord.Client()
		ote.externo = {
			bot: bot
			, discord: discord
			, crypto: crypto
			, fs: fs
		}
		ote.e = ote.externo
		bot.ote = ote

		ote.g = {}
		ote.g.dichos = []
		
		var prefijo = "ot+ec?a?l?d?"
		var regex_prefijo = new RegExp(prefijo,"gi")

		bot.on("ready", function() {
			ote.funs.mostrar(`Listo y sin errores. ${new Date()}`)
			ote.funs.titular("Otecald Bot Discord")
		})

		bot.on("message", function(message) {

			var u = ote.g

			ote.e.m = message
			var m = ote.e.m
			
			u.g = m.guild && m.guild.name || `privado`

			u.c = ( m.channel && (
					m.channel.name
					|| m.channel.recipient && m.channel.recipient.username
				) || `desconocido`
			)
			u.a = ( m && m.member && m.member.nickname
				|| m.author && m.author.username
				|| "desconocido"
			)
			u.n = m.content

			u.d = new Date()
			
			u.p = u.n
			u.q = u.n
			
			var naranja = (0x8a1b39de504n*0x10n**4n+6n).toString()
			var c_autor = 32 // Color autor
			if(ote.e.m.author.id==naranja){
				c_autor = 30
			}
			u.r = ote.funs.obtener_mencionados_matriz(m)
			u.i = 0
			u.r.map(function(x){
				var regex_usuarios = new RegExp(`<@!?(${x[0]})>`,"g")
				var nick = x[2] || x[1]
				color = u.i%2?35:36
				if(x[0]==naranja){
					color = 30
				}
				u.p = u.p.replace(regex_usuarios,`\x1b[01;${color}m@${nick}\x1b[01;37m`)
				u.q = u.q.replace(regex_usuarios,`@${nick}`)
				++u.i
			})
			u.t = `${u.a}: ${u.q}`
			u.l = [new Date(),u.t]
			u.o = `\x1b[01;34m${u.g} \x1b[01;33m${u.c} \x1b[01;${c_autor}m${u.a} \x1b[01;37m${u.p}\x1b[00m`
			ote.funs.mostrar(u.d, u.o)
			ote.g.dichos.push(u.l)

			var mensaje = message.content
			ote.funs.titular(`${u.t} - OteDiscord`)

			//if (m.author.bot) return;

			if ( regex_prefijo.test(mensaje) == null ) return;

			var desprefijado = ote.funs.desprefijar(mensaje,prefijo)
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
					procesado = ote.funs.quitar_menciones(procesado)
					procesado = ote.funs.procesar(message,procesado)
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
					procesado = ote.funs.procesar(message,desprefijado)
					break;
			}
			if(argumento==pref_mp){
				var receptores = undefined
				var menciones = [...ote.funs.obtener_mencionados_array(message)]
				if(menciones.length!=0){
					receptores = [...new Set(menciones)]
				}else{
					receptores = [message.author]
				}
				receptores.map(function(x){
					if(!x.bot){
						var dm = ote.externo.discord.DMChannel
						var privado = new ote.externo.discord.DMChannel(
							ote.externo.bot
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
				ote.funs.enviar(message,procesado)
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
		bot.login(token_desencriptado)
	}
}

ote = module.exports // Variable global
o = ote // Simplificado
var puede_iniciar = process.argv[2]
if(puede_iniciar=="sip"){
	var clave = process.argv[3]
	ote.iniciar(clave)
}


