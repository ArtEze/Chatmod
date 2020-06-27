/*

Modo de uso:

https://discordapp.com/developers/applications/me

n_bot = require("C:/Users/Otecald/Desktop/Proyectos 2017/Node JS/Otecald Bot/código.js")

n_bot.iniciar(escribir el token aquí) //Ejemplo: n_bot.iniciar("adfsfklgjdfgkljdf")

Enlace para invitar con ClienId:

https://discordapp.com/oauth2/authorize?&client_id=373132327842349056&scope=bot&permissions=8

*/

funs = {
	procesar: function(mensaje)
	{
		try{
			return eval(mensaje)
		}catch(e){
			console.log("No",mensaje)
			return mensaje
		}
	},
	quitar_espacios: function(mensaje)
	{
		var i=0
		for(;i<mensaje.length;i++)
		{
			if( !(mensaje[i]==" "|mensaje[i]=="\t") ){break;}
		}
		return mensaje.slice(i)
	},
	quitar_prefijo: function(mensaje,prefijo){
		var mensaje=this.quitar_espacios(mensaje)
		
		if( mensaje.slice(0,prefijo.length).toLowerCase()==prefijo )
		{
			mensaje=mensaje.slice(prefijo.length)
		}
		var mensaje=this.quitar_espacios(mensaje)
		return mensaje
	}
}

module.exports =
{
	iniciar:function(TOKEN){
		
		dichos = []
		discord = require("/d/linux_arteze/documentos/github/node_modules/discord.js")
		bot = new discord.Client()

		this.funs=funs
		bot.funs=funs
		
		var prefijo = "ote"

		bot.on("ready", function() {
			console.log("Listo y sin errores.")
		})

		bot.on("message", function(message) {
			m = message
			c = m.content
			a = m.author.username
			console.log(a,c)

			var mensaje = message.content
			var minúsculas = mensaje.toLowerCase()
			if (message.author.equals(bot.user)) return;
			if (!minúsculas.startsWith(prefijo)) return;

			var post_pref = this.funs.quitar_prefijo(mensaje,prefijo)
			var args = post_pref.split(/\s+/g)
			var enviar = args[0]

			dichos.push( enviar )
			var procesado = ""
			switch( enviar ){
				case "info":
					procesado = "Un mensaje."
					break;
				case "+":
					procesado = enviar
					break;
				default:
					procesado = this.funs.procesar(enviar)
					break;
			}
			procesado = (procesado).toString()
			//console.log("Procesado",procesado)
			//message.channel.send(procesado.length.toString())
			if(procesado.length<2000){
				message.channel.send(procesado)
			}
			return;
		})
		bot.login(TOKEN)
	}
}

// module.exports.iniciar("gadlñfgdsfglkj") //Poner el token

