/*

Modo de uso:

https://discordapp.com/developers/applications/me

n_bot = require("C:/Users/Otecald/Desktop/Proyectos 2017/Node JS/Otecald Bot/código.js")

n_bot.iniciar(escribir el token aquí) //Ejemplo: n_bot.iniciar("contraseña")

Enlace para invitar con ClienId:

https://discordapp.com/oauth2/authorize?&client_id=373132327842349056&scope=bot&permissions=8

*/

var discord = require("../../../node_modules/discord.js")
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
				.map(function(x){return [x.id,x.username]})
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
	, iniciar:function(contraseña,usuario){
		
		if(contraseña==undefined){
			contraseña = fs.readFileSync("../../../contraseña.txt").toString().slice(0,-1)
		}
		
		dichos = []
		var bot = new discord.Client()

		bot.funs = this.funs
		this.externo = {
			bot: bot
			, discord: discord
			, crypto: crypto
		}
		bot.externo = this.externo

		
		var prefijo = "ot+ec?a?l?d?"
		var regex_prefijo = new RegExp(prefijo,"gi")

		bot.on("ready", function() {
			this.funs.mostrar(`Listo y sin errores. ${new Date()}`)
			this.funs.cambiar_título("Otecald Bot Discord")
		})

		bot.on("message", function(message) {

			m = message
			g = m.guild && m.guild.name || `privado`
			c = (
				m.channel && (
					m.channel.name
					|| m.channel.recipient && m.channel.recipient.username
				) || `desconocido`
			)
			a = m.author.username
			n = m.content

			d = new Date()
			
			p = n
			q = n
			
			var naranja = 621975714287321094
			var color = 31
			if(m.author.id==naranja){
				color = 30
				a = `\x1b[01;${color}\x1b[00m`
			}
			r = this.funs.obtener_mencionados_matriz(m)
			i = 0
			r.map(function(x){
				var regex_usuarios = new RegExp(`<@!?(${x[0]})>`,"g")
				var color = i%2?35:36
				if(x[0]==naranja){
					color = 30
				}
				p = p.replace(regex_usuarios,`\x1b[01;${color}m@${x[1]}\x1b[01;37m`)
				q = q.replace(regex_usuarios,`@${x[1]}`)
				++i
			})
			t = `${a} ${q}`
			l = [new Date(),t]
			o = `\x1b[01;34m${g} \x1b[01;33m${c} \x1b[01;32m${a} \x1b[01;37m${p}\x1b[00m`
			this.funs.mostrar(d,o)
			dichos.push(l)

			var mensaje = message.content
			this.funs.cambiar_título(`OteBotdiscord ${t}`)

			//if (m.author.bot) return;

			if ( regex_prefijo.test(mensaje) == null ) return;

			var post_pref = this.funs.quitar_prefijo(mensaje,prefijo)
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
					procesado = this.funs.quitar_menciones(procesado)
					procesado = this.funs.procesar(message,procesado)
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
					procesado = this.funs.procesar(message,post_pref)
					break;
			}
			if(argumento==pref_mp){
				new this.externo.discord.DMChannel(
					this
					, {
						recipients: [
							message.author
							,...this.funs.obtener_mencionados_array(message)
						]
					}
				).recipient.send(procesado)
			}else{
				this.funs.enviar(message,procesado)
			}
			return;
		})
		var token_encriptado
		if(usuario){
			token_encriptado = "L3zZFI2NEORhTBjY6o+Fe7zQiUEhm6Y90fbGmBr5E0DkaDQqhKv0e4sL4/O2GsSMnYBTXfejKP2MDckY7w7hEg=="
		}else{
			token_encriptado = "rIBvtfOhf54JeOKMo2W4T/Tn4vpW36x4UU4J/gbqrE9kK+U2rW5rv0602Rht4na6RbYXJNkNPOaKsabMKq0HAw=="
		}
		var token_desencriptado = this.funs.desencriptar(token_encriptado,contraseña)
		bot.login(token_desencriptado)
	}
}

var ote = module.exports
var contraseña = process.argv[2]
if(contraseña){
	ote.iniciar(contraseña)
}

