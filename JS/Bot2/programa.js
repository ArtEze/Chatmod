// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

function cambiar_color()
{
	var activador = document.querySelector("#activador")
	window.bot_está_activado ^= 1
	if(window.bot_está_activado==1)
	{
		activador.style["backgroundColor"]="#23aa34"
		activador.querySelector(".text").innerHTML = "Bot activado"
	}else
	{
		activador.style["backgroundColor"]="#000000"
		activador.querySelector(".text").innerHTML = "Bot desactivado"
	}
	cambiar_deslizador()
}
function crear_activador()
{
	window.bot_está_activado = 1
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>cambiar_color()
	var existe_activador = document.querySelector("#activador")!=null
	span.className = "text"
	span.innerHTML = "Bot desactivado"
	div.id = "activador"
	div.className = "menuItem"
	div.appendChild(span)
	div.style["backgroundColor"]="#000000"
	div.addEventListener("click",función)
	if(!existe_activador)
	{
		document.querySelector("#menubar").appendChild(div)
	}
	cambiar_color()
}
function borrar_activador()
{
	document.querySelector("#activador").remove()
}
function esperar_carga_mensajes()
{
	var esperador = document.querySelector(".chatMessagesLoading.nosel")
	if(esperador.style.display=="none")
	{
		window.primer_elemento.scrollIntoView()
	}else
	{
		++window.intentos_carga_mensajes
		if(window.intentos_carga_mensajes<100)
		{
			setTimeout(esperar_carga_mensajes,100)
		}
	}
}
function cargar_mensajes(a, b, c, d, e)
{
	var cantidad_cargar_mensajes = window.bot_está_activado==1?200:e
	var f={limit:cantidad_cargar_mensajes}
	null!=d&&(f.toTime=d)
	"room"==b?f.roomId=c:"private"==b&&(f.nick=c)
	if(window.bot_está_activado==1){
		window.primer_elemento = document.querySelector("div.chatMessage")
	}
	var devuelve = jh(a.ra,"loadLastMessages",f,!0)
	if(if(window.bot_está_activado==1){
		window.intentos_carga_mensajes = 0
		esperar_carga_mensajes()
	}
	return devuelve
}
function cambiar_deslizador()
{
	Array.from(document.querySelectorAll(".chatMessagesTab")).map(x=>{
		var deslizador = x.querySelector(".chatMessagesScrollBar")
		var deslizador_nuevo = x.querySelector(".chatMessagesContainer")
		if(window.bot_está_activado==1){
			deslizador_nuevo.style["overflow-y"]="scroll"
			if(deslizador!=null)
			{
				deslizador.style.display="none"
			}
		}else{
			deslizador_nuevo.style["overflow-y"]="hidden"
			if(deslizador!=null)
			{
				deslizador.style.display="block"
			}
		}
	})
}

function carga(){ 
	rl = (a,b,c,d,e)=>cargar_mensajes(a,b,c,d,e)
	cambiar_deslizador()
}

crear_activador()
carga()
