// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

function cambiar_color()
{
	var activador = document.querySelector("#activador")
	bot_está_activado ^= 1
	if(bot_está_activado)
	{
		activador.style["backgroundColor"]="#23aa34"
		activador.querySelector(".text").innerHTML = "Bot activado"
	}else
	{
		activador.style["backgroundColor"]="#000000"
		activador.querySelector(".text").innerHTML = "Bot desactivado"
	}
}
function crear_activador()
{
	window.bot_está_activado = 0
	var span = document.createElement("span")
	var div = document.createElement("div")
	span.className = "text"
	span.innerHTML = "Bot desactivado"
	div.id = "activador"
	div.className = "menuItem"
	div.appendChild(span)
	div.style["backgroundColor"]="#000000"
	var función = x=>cambiar_color()
	div.addEventListener("click",función)
	var existe_activador = document.querySelector("#activador")!=null
	if(!existe_activador)
	{
		document.querySelector("#menubar").appendChild(div)
	}
}
function borrar_activador()
{
	document.querySelector("#activador").remove()
}

function carga(){ 
	var areas_mensajes = document.querySelectorAll(".chatMessagesTab")
	Array.from(areas_mensajes).map(x=>{
		var deslizador = x.querySelector(".chatMessagesScrollBar")
		var deslizador_nuevo = x.querySelector(".chatMessagesContainer")
		deslizador_nuevo.style["overflow-y"]="scroll"
		if(deslizador!=null)
		{
			deslizador.remove()
		}
	})
}

crear_activador()
carga()
