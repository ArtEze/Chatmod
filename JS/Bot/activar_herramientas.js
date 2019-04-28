// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

// Configuración
function obtener_nombre(){
	return document.querySelector("#nickMenu .text").textContent
}
function configurar(){
	var devuelve
	if(obtener_nombre()=="..."){
		devuelve = setTimeout(configurar,1000)
	}else{
		window.configuración = localStorage.configuración
		if(window.configuración==undefined){
			window.configuración = {}
			window.configuración[obtener_nombre()] = {
				está_activado: 1
				, bot_está_activado: 0
			}
			localStorage.configuración = JSON.stringify(window.configuración)
			devuelve = localStorage.configuración
		}else{
			window.configuración = JSON.parse(window.configuración)
			devuelve = window.configuración
		}
	}
	return devuelve
}
function obtener_activado(){
	return window.configuración[obtener_nombre()].está_activado
}
function obtener_bot_activado(){
	return window.configuración[obtener_nombre()].bot_está_activado
}
function cambiar_activado(){
	window.configuración[obtener_nombre()].está_activado ^= 1
	localStorage.configuración = JSON.stringify(window.configuración)
}
function cambiar_bot_activado(){
	window.configuración[obtener_nombre()].bot_está_activado ^= 1
	localStorage.configuración = JSON.stringify(window.configuración)
}
// Fin configuración

function crear_activador(){
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>cambiar_color()
	var existe_botón = document.querySelector("#activador")!=null
	span.className = "text"
	if(obtener_activado()){
		span.innerHTML = "Activado"
		div.style["backgroundColor"]="#23aa34"
	}else{
		span.innerHTML = "Desactivado"
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
function color_activar_bot(div){
	var span = div.querySelector("span")
	if(obtener_bot_activado())
	{
		div.style["backgroundColor"]="#117733"
		span.innerHTML = "Bot activado"
	}else{
		div.style["backgroundColor"]="#771133"
		span.innerHTML = "Bot desactivado"
	}
}
function cambiar_activar_bot(){
	var activador = document.querySelector("#activar_bot")
	cambiar_bot_activado()
	color_activar_bot(activador)
}
function crear_activar_bot(){
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>cambiar_activar_bot()
	var nombre = "activar_bot"
	var existe_botón = document.querySelector("#"+nombre)!=null
	span.className = "text"
	div.id = nombre
	div.className = "menuItem"
	div.appendChild(span)
	color_activar_bot(div)
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
			if(obtener_activado()){
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
		if(deslizador!=null)
		{
			if(obtener_activado()){
				deslizador_nuevo.style["overflow-y"]="scroll"
				deslizador.style.display="none"
			}else{
				deslizador_nuevo.style["overflow-y"]="hidden"
				deslizador.style.display="block"
			}
		}
	})
}
function cambiar_botones(){
	if(obtener_activado())
	{
		crear_activar_bot()
		crear_copiador()
		crear_borrador()
	}else{
		Array.from(document.querySelectorAll(
			"#activar_bot,#copiador,#borrador"
		)).map(x=>x.remove())
	}
}
function cambiar_color(){
	var activador = document.querySelector("#activador")
	cambiar_activado()
	if(obtener_activado())
	{
		activador.style["backgroundColor"]="#23aa34"
		activador.querySelector(".text").innerHTML = "Activado"
	}else{
		activador.style["backgroundColor"]="#000000"
		activador.querySelector(".text").innerHTML = "Desactivado"
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
		if(contador_deslizar_mensaje<50)
		{
			setTimeout(deslizar_mensaje,100)
		}
	}
}
function deslizar_mensaje(){
	window.mensaje.scrollIntoView()
	setTimeout(mostrar_si_no_se_ve,100)
}
function cargar_mensajes(a, b, c, d) {
	
	cantidad_carga_mensajes = obtener_activado()?100:20
	if(obtener_activado()){
		window.mensaje = document.querySelector(".chatMessagesTab.active .chatMessage.ts")
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
					if(obtener_activado()){
						contador_deslizar_mensaje = 0
						deslizar_mensaje()
					}
				}
				,a
			)
		)
	}
}
function quitar_eliminado_mensajes(a, b, c, d, e) {
	var g = e.m
	var h = e.to
	var k
	var m = h && a.j.nick;
	if (m) {
		var m = !1,
		q = a.j.nick.toLowerCase();
		for (k = 0; k < h.length; k++) if (h[k].toLowerCase() == q) {
			m = !0;
			break
		}
	}
	var n = '<div class="chatMessage ts';
	m && (n += ' hl');
	e.u && (n += ' unread');
	n = n + '">' + ('<span title="' + a.ls + '" class="pw"><span class="sayto"></span><i></i></span>');
	m = e.f;
	q = e.nh;
	m && !q && (n += '<a href="#" class="from">' + Aa(m) + '</a>', n += h ? '<span class="toarr">&rarr;</span>' :
	': ');
	if (h && !q) {
		for (k = 0; k < h.length; k++) {
			var x = Aa(h[k]),
			n = n + ('<a href="#" class="to nick" data-nick="' + x + '">' + x + '</a>');
			k != h.length - 1 && (n += ', ')
		}
		n += ': '
	}
	h = void 0 !== e.ts ? new Date(e.ts)	: new Date;
	n += '<span class="text">' + (e.html ? g : zq(a, g)) + '</span>';
	if (e.actions) {
		n += '<span class="actions"><ul>';
		x = e.actions;
		k = 0;
		for (l = x.length; k < l; k++) var y = x[k],
		n = n + ('<li><a href="#" data-action-data="' + y.data[0] + '" data-action-type="' + y.type + '">' +
		y.title + '</a></li>');
		n += '</ul></span>'
	}
	n += '<span class="info"><span class="time" title="' + a.Aq.format(h) + '">' + a.rs.format(h) + '</span><span class="check"><i></i></span></span>';
	n += '</div>';
	k = ae(n);
	var n = U(b, 'cm'),
	t;
	if (void 0 === n)
	{
		n = N('chatMessages', b),	W(b, 'cm', n);
	}else if (h = Math.max(a.j.uh, a.j.jc), !1 !== U(b, 'onBottom') && (t = ee(n).length) > h)
	{
		if(!obtener_activado()){
			for (t -= h; 0 < t; t--) n.removeChild(fe(n));
		}
	}
	var P = U(b, 'chatovodScrollBar');
	m && (x = a.H.Vb(m, null, N('from', k), e.minor ? null : N('text', k)), x instanceof od && ud(x, function () {
		hi(P)
	}));
	t = Sd('nick', k);
	for (h = 0; h < t.length; h++) x = t[h],
	x = a.H.Vb(x.getAttribute('data-nick'), null, x),
	x instanceof od && ud(x, function () {
		hi(P)
	});
	e.pp ? (n.insertBefore(k, n.childNodes[0] || null), 0 != k && (t = N('chatMessagesContainer', b), t.scrollTop += Q(k).height))	: n.appendChild(k);
	m && W(k, 'nick', m);
	W(k, 'ts', e.ts);
	t = Pd('IMG', 'loadlater', k);
	0 < t.length && Aq(a, b, t);
	hi(P);
	t = void 0 == e.s && (void 0 !== e.u || void 0 !== e.r) && m && (!!a.j.nick && m.toLowerCase() != a.j.nick.toLowerCase() || !a.j.nick);
	K(b, 'active') || t && mq(a.kb, c, d);
	t && (b = dn(a.Xa, a.Xa.vf(m)), Sp(a.Me, q ? null : m, c + d + m + e.ts, g, b))
}

function actualizar_cantidades(){
	var div = document.querySelector(".chatRoomsButton>a")
	if(obtener_activado()){
		var salas = Array.from(document.querySelectorAll(".chatMessagesTab"))
		var cantidades = salas.map(x=>x.querySelectorAll(".chatMessage").length).join(" ")
		div.innerHTML = cantidades
	}else{
		if(div.textContent!=window.acciones)
		{
			div.innerHTML = window.acciones
		}
	}
}
function ver_cantidad_mensajes(){
	var div = document.querySelector(".chatRoomsButton>a")
	window.acciones = div.textContent
	window.int_cantis_salas = setInterval(()=>actualizar_cantidades,1000)
}

function carga()
{
	configurar()
	crear_activador()
	cambiar_botones()
	Cq = (a,b,c,d)=>cargar_mensajes(a,b,c,d)
	xq = (a,b,c,d,e)=>quitar_eliminado_mensajes(a,b,c,d,e)
	cambiar_deslizadores()
	ver_cantidad_mensajes()
}
carga()
