// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

function crear_activador(){
	window.bot_está_activado = 1
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>cambiar_color()
	var existe_botón = document.querySelector("#activador")!=null
	span.className = "text"
	if(window.bot_está_activado==1){
		span.innerHTML = "Bot activado"
		div.style["backgroundColor"]="#23aa34"
	}else{
		span.innerHTML = "Bot desactivado"
		div.style["backgroundColor"]="#000000"
	}
	div.id = "activador"
	div.className = "menuItem"
	div.appendChild(span)
	div.addEventListener("click",función)
	if(!existe_botón)
	{
		document.querySelector("#menubar").appendChild(div)
	}
}
function copiar_todo(){
	var contenedor = document.querySelector(".chatMessagesTab.active .chatMessages")
	var range = document.createRange(contenedor)
	range.selectNode(contenedor)
	window.getSelection().removeAllRanges()
	window.getSelection().addRange(range)
	document.execCommand("copy")
	window.getSelection().removeAllRanges()
	document.querySelector("#copiador>span").innerHTML = "¡Copiado!"
	setTimeout(()=>document.querySelector("#copiador>span").innerHTML = "Copiar",1000)
}
function crear_copiador(){
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>copiar_todo()
	var nombre = "copiador"
	var existe_botón = document.querySelector("#"+nombre)!=null
	span.className = "text"
	span.innerHTML = "Copiar"
	div.style["backgroundColor"]="#012345"
	div.id = nombre
	div.className = "menuItem"
	div.appendChild(span)
	div.addEventListener("click",función)
	if(!existe_botón)
	{
		document.querySelector("#menubar").appendChild(div)
	}
}
function borrar_todo(){
	
	var mensajes = Array.from(document.querySelectorAll(".chatMessagesTab.active .chatMessage.ts"))
	mensajes.slice(30).map(x=>x.remove())
}
function crear_borrador(){
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>borrar_todo()
	var nombre = "borrador"
	var existe_botón = document.querySelector("#"+nombre)!=null
	span.className = "text"
	span.innerHTML = "Borrar"
	div.style["backgroundColor"]="#543210"
	div.id = nombre
	div.className = "menuItem"
	div.appendChild(span)
	div.addEventListener("click",función)
	if(!existe_botón)
	{
		document.querySelector("#menubar").appendChild(div)
	}
}

function cambiar_deslizador(){
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
function cambiar_botones(){
	if(window.bot_está_activado==1)
	{
		crear_copiador()
		crear_borrador()
	}else{
		Array.from(document.querySelectorAll(
			"#copiador,#borrador"
		)).map(x=>x.remove())
	}
}
function cambiar_color(){
	var activador = document.querySelector("#activador")
	window.bot_está_activado ^= 1
	if(window.bot_está_activado==1)
	{
		activador.style["backgroundColor"]="#23aa34"
		activador.querySelector(".text").innerHTML = "Bot activado"
	}else{
		activador.style["backgroundColor"]="#000000"
		activador.querySelector(".text").innerHTML = "Bot desactivado"
	}
	cambiar_deslizador()
	cambiar_botones()
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
	if(window.bot_está_activado==1){
		window.intentos_carga_mensajes = 0
		esperar_carga_mensajes()
	}
	return devuelve
}

function carga()
{
	cambiar_botones()
	rl = (a,b,c,d,e)=>cargar_mensajes(a,b,c,d,e)
	cambiar_deslizador()
}
carga()
