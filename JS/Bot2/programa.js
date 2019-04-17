// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

function crear_activador(){
	window.bot2_está_activado = 1
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>cambiar_color()
	var existe_botón = document.querySelector("#activador")!=null
	span.className = "text"
	if(window.bot2_está_activado==1){
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
	var array_mensajes = document.querySelectorAll(".chatMessagesTab.active .chatMessage.ts")
	var mensajes = Array.from(array_mensajes)
	var segundo_elemento = mensajes[1]
	segundo_elemento.scrollIntoView()
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

function cambiar_deslizadores(){
	Array.from(document.querySelectorAll(".chatMessagesTab")).map(x=>{
		var deslizador = x.querySelector(".chatMessagesScrollBar")
		var deslizador_nuevo = x.querySelector(".chatMessagesContainer")
		if(deslizador!=null)
		{
			if(window.bot2_está_activado==1){
				deslizador_nuevo.style["overflow-y"]="scroll"
				deslizador.style.display="none"
			}else{
				deslizador_nuevo.style["overflow-y"]="hidden"
				deslizador.style.display="block"
			}
		}
	})
	Array.from(document.querySelectorAll(".chatUsersTab")).map(x=>{
		var deslizador = x.querySelector(".chatUsersScrollBar")
		var deslizador_nuevo = x.querySelector(".chatUsersContainer")
		if(window.bot2_está_activado==1){
			deslizador_nuevo.style["overflow-y"]="scroll"
			deslizador.style.display="none"
		}else{
			deslizador_nuevo.style["overflow-y"]="hidden"
			deslizador.style.display="block"
		}
	})
}
function cambiar_botones(){
	if(window.bot2_está_activado==1)
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
	window.bot2_está_activado ^= 1
	if(window.bot2_está_activado==1)
	{
		activador.style["backgroundColor"]="#23aa34"
		activador.querySelector(".text").innerHTML = "Bot activado"
	}else{
		activador.style["backgroundColor"]="#000000"
		activador.querySelector(".text").innerHTML = "Bot desactivado"
	}
	cambiar_deslizadores()
	cambiar_botones()
}

function borrar_activador()
{
	document.querySelector("#activador").remove()
}
function mostrar_si_no_se_ve(){
	var activo = document.querySelector(".chatMessagesTab.active")
	var contenedor = activo.querySelector(".chatMessagesContainer")
	var no_se_ve = Math.abs(mensaje.offsetTop-contenedor.scrollTop)>=mensaje.scrollHeight
	if(no_se_ve)
	{
		++contador_deslizar_mensaje
		console.log(contador_deslizar_mensaje)
		console.log((mensaje.offsetTop-contenedor.scrollTop),mensaje.scrollHeight)
		if(contador_deslizar_mensaje<100)
		{
			setTimeout(deslizar_mensaje,100)
		}
	}
}
function deslizar_mensaje(){
	mensaje.scrollIntoView()
	setTimeout(mostrar_si_no_se_ve,100)
}
function cargar_mensajes(a, b, c, d) {
	
	cantidad_carga_mensajes = window.bot2_está_activado==1?100:20
	if(window.bot2_está_activado==1){
		mensaje = document.querySelector(".chatMessagesTab.active .chatMessage.ts")
		console.log(mensaje.textContent)
	}
	var e = a.I[b];
	if (!0 !== U(e, 'lock')) {
		var g = U(e, 'type'),
		h = U(e, 'id'),
		k = 0;
		void 0 != c ? k = c : (c = U(e, 'cm'), void 0 !== c && (c = N('ts', c)) && (k = U(c, 'ts') - 1));
		c = U(e, 'oldestTime');
		void 0 !== c && k <= c || (
			W(e, 'lock', !0),
			N('chatMessagesLoading', e).style.display = 'block',
			xd(
				rl(a.jb, g, h, k, void 0 !== d ? d : cantidad_carga_mensajes)
				,function () {
					W(e, 'lock', !1);
					N('chatMessagesLoading', this.I[b]).style.display = 'none'
					if(bot2_está_activado==1){
						contador_deslizar_mensaje = 0
						deslizar_mensaje()
					}
				}
				,a
			)
		)
	}
}

function carga()
{
	crear_activador()
	cambiar_botones()
	Cq = (a,b,c,d)=>cargar_mensajes(a,b,c,d)
	cambiar_deslizadores()
}
carga()
