/*

Modo de uso:

https://discordapp.com/developers/applications/me

n_bot = require("C:/Users/Otecald/Desktop/Proyectos 2017/Node JS/Otecald Bot/código.js")

n_bot.iniciar(escribir el token aquí) //Ejemplo: n_bot.iniciar("contraseña")

Enlace para invitar con ClienId:

https://discordapp.com/oauth2/authorize?&client_id=373132327842349056&scope=bot&permissions=8

*/

funs = {
	procesar: function(mensaje)
	{
		try{
			return eval(mensaje)
		}catch(e){
			console.log("Error",e,"Mensaje",mensaje)
			return mensaje
		}
	},
	quitar_prefijo: function(mensaje,prefijo){
		var salida = ""
		var regex = new RegExp("^\\s*"+prefijo+"\\s+","gi")
		var prefijo_encontrado = mensaje.match(regex)
		if(prefijo_encontrado!=null){
			salida = mensaje.replace(prefijo_encontrado,"")
		}
		return salida
	},
	desencriptar: function desencriptar(token_encriptado,contraseña){
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

module.exports =
{
	iniciar:function(contraseña){
		
		dichos = []
		discord = require("../../../node_modules/discord.js")
		bot = new discord.Client()

		this.funs=funs
		bot.funs=funs
		
		var prefijo = "ot+ec?a?l?d?"
		var regex_prefijo = new RegExp(prefijo,"gi")

		bot.on("ready", function() {
			console.log(" Listo y sin errores.")
		})

		bot.on("message", function(message) {
			m = message
			c = m.channel.name || `(Privado)`
			a = m.author.username
			n = m.content
			console.log(c,a,n)
			dichos.push( `${c} '${a}': ${n}` )

			var mensaje = message.content
			//if (message.author.equals(bot.user)) return;
			if ( regex_prefijo.test(mensaje) == null ) return;

			var post_pref = this.funs.quitar_prefijo(mensaje,prefijo)
			var args = post_pref.split(/\s+/g)
			var enviar = args[0]
			var procesado = ""
			switch( enviar ){
				case "info":
					procesado = "Un mensaje."
					break;
				case "+":
					procesado = args.slice(1).join(" ")
					break;
				default:
					procesado = this.funs.procesar(post_pref)
					break;
			}
			if(procesado !=undefined){			
				procesado = (procesado).toString()
				//console.log("Procesado",procesado)
				//message.channel.send(procesado.length.toString())
				if(procesado.length<2000){
					message.channel.send(procesado)
				}
			}
			return;
		})
		var token_encriptado = "rIBvtfOhf54JeOKMo2W4T/Tn4vpW36x4UU4J/gbqrE9kK+U2rW5rv0602Rht4na6RbYXJNkNPOaKsabMKq0HAw=="
		var token_desencriptado = this.funs.desencriptar(token_encriptado,contraseña)
		bot.login(token_desencriptado)
	}
}

// module.exports.iniciar("contraseña")

