window.id_votación = 0
window.votados = []
window.sala = 3
window.inbaneables = [
	"186.18.124.193"
	,"190.105.47.16"
]

function agregar_voto(nick_votado,ip_votado,ip_votante)
{
	if(!window.inbaneables.includes(ip_votado))
	{
		var coincide_votado = false
		var coincide_votante = false
		var i = 0
		for(i in votados)
		{
			var actual = votados[i]
			if(actual[1]==ip_votado)
			{
				coincide_votado = true
				var votos =  actual[2]
				for(var j in votos)
				{
					var actual_2 = votos[j][1]
					if(actual_2==ip_votante)
					{
						coincide_votante = true
					}
				}
				break
			}
		}
		var votado,votos
		if(!coincide_votante&coincide_votado)
		{
			votado = votados[i]
			votos = votado[2]
			votos.push([++window.id_votación,ip_votante])
		}
		if(!coincide_votante&!coincide_votado)
		{
			votos = []
			votos.push([++window.id_votación,ip_votante])
			votados.push([nick_votado,ip_votado,votos])
		}
		if(coincide_votante&coincide_votado)
		{
			window.enviar_mensaje("Voto inválido.",window.sala)
		}else
		{
			votado = votados[i]
			if(votos.length>=5)
			{
				window.enviar_mensaje("El usuario "+votado[0]+" recibió ban.",window.sala)
				votos.length = 0
			}else
			{
				window.enviar_mensaje(votado[0]+" tiene "+votos.length+" votos.",window.sala)
			}
		}
		console.log(votados)
		return votados
	}
}
function votar_usuario(datos,nicks_votado,ip_votante)
{
	var analizado = JSON.parse(datos)
	var ip_votado = analizado.lastIp
	agregar_voto(nicks_votado,ip_votado,ip_votante)
}
function sumar_voto(datos,hacia)
{
	var analizado = JSON.parse(datos)
	var ip_votante = analizado.lastIp
	for(var i in hacia)
	{
		var actual = hacia[i]
		window.moderar_usuario(actual,x=>votar_usuario(x,actual,ip_votante))
	}
}
function votar_ban(usuario,hacia)
{
	window.moderar_usuario(usuario,x=>sumar_voto(x,hacia))
}
votar_ban("ArtEze",["Robotos"])
