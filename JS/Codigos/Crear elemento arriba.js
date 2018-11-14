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
	var outer = '<span class="text">Bot desactivado</span>'
	var div = document.createElement("div")
	div.id = "activador"
	div.className = "menuItem"
	div.innerHTML = outer
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