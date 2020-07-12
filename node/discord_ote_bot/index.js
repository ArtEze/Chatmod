/*

Modo de uso:

https://discordapp.com/developers/applications/me

cd ~/documentos/github/charlavod/node
node
ote = require("./discord_ote_bot")
ote.iniciar() // Carga contraseña desde archivo "../../../contraseña.txt"

Enlace para invitar con ClienId:

https://discordapp.com/oauth2/authorize?&client_id=373132327842349056&scope=bot&permissions=8

*/

var discord = require("../../../node_modules/discord.js")
var fs = require("fs")
var crypto = require("crypto")

module.exports =
{
	funs: {
		salida: function(){
			return process.stdout.write(...arguments)
		}
		, cambiar_título: function(título){
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
		, quitar_prefijo: function(mensaje,prefijo){
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
		, desencriptar: function desencriptar(token_encriptado,contraseña){
			var desencriptador = crypto.createDecipher("aes-128-cbc", contraseña)
			var salida = desencriptador.update(token_encriptado, "base64", "utf8")
			salida += desencriptador.final("utf8")
			return salida
		}
		, encriptar: function encriptar(token,contraseña) {
			var encriptador = crypto.createCipher("aes-128-cbc", contraseña)
			var salida = encriptador.update(token, 'utf8', "base64")
			salida += encriptador.final("base64")
			return salida
		}
	}
	, iniciar: function(contraseña){
		var bot = new discord.Client()

		ote = ote
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
			ote.funs.cambiar_título("Otecald Bot Discord")
		})

		bot.on("message", function(message) {

			var o = ote.g

			ote.e.m = message
			var m = ote.e.m
			
			o.g = m.guild && m.guild.name || `privado`

			o.c = ( m.channel && (
					m.channel.name
					|| m.channel.recipient && m.channel.recipient.username
				) || `desconocido`
			)
			o.a = ( m && m.member && m.member.nickname
				|| m.author && m.author.username
				|| "desconocido"
			)
			o.n = m.content

			o.d = new Date()
			
			o.p = o.n
			o.q = o.n
			
			var naranja = 621975714287321094
			var color = 31
			if(m.author.id==naranja){
				color = 30
				o.a = `\x1b[01;${color}\x1b[00m`
			}
			o.r = ote.funs.obtener_mencionados_matriz(m)
			o.i = 0
			o.r.map(function(x){
				var regex_usuarios = new RegExp(`<@!?(${x[0]})>`,"g")
				var nick = x[2] || x[1]
				var color = o.i%2?35:36
				if(x[0]==naranja){
					color = 30
				}
				o.p = o.p.replace(regex_usuarios,`\x1b[01;${color}m@${nick}\x1b[01;37m`)
				o.q = o.q.replace(regex_usuarios,`@${nick}`)
				++o.i
			})
			o.t = `${o.a} ${o.q}`
			o.l = [new Date(),o.t]
			o.o = `\x1b[01;34m${o.g} \x1b[01;33m${o.c} \x1b[01;32m${o.a} \x1b[01;37m${o.p}\x1b[00m`
			ote.funs.mostrar(o.d, o.o)
			ote.g.dichos.push(o.l)

			var mensaje = message.content
			ote.funs.cambiar_título(`${o.t} - OteDiscord`)

			//if (m.author.bot) return;

			if ( regex_prefijo.test(mensaje) == null ) return;

			var post_pref = ote.funs.quitar_prefijo(mensaje,prefijo)
			var args = post_pref.split(/\s+/g)
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
					procesado = ote.funs.procesar(message,post_pref)
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

		if(contraseña==undefined){
			contraseña = fs.readFileSync("../../../contraseña.txt").toString().match(/\S+/g)
			contraseña = contraseña && contraseña[0] || ""
		}
		var token_encriptado = "rIBvtfOhf54JeOKMo2W4T/Tn4vpW36x4UU4J/gbqrE9kK+U2rW5rv0602Rht4na6RbYXJNkNPOaKsabMKq0HAw=="
		var token_desencriptado = ote.funs.desencriptar(token_encriptado,contraseña)
		bot.login(token_desencriptado)
	}
}

var ote = module.exports
var puede_iniciar = process.argv[2]
var contraseña = process.argv[3]
if(puede_iniciar=="sip"){
	ote.iniciar(contraseña)
}

