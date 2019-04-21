// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

function crear_activador(){
	window.está_activado = 1
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>cambiar_color()
	var existe_botón = document.querySelector("#activador")!=null
	span.className = "text"
	if(window.está_activado==1){
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
function activar_bot(){
	var activador = document.querySelector("#activar_bot")
	window.bot_está_activado ^= 1
	if(window.bot_está_activado==1)
	{
		activador.style["backgroundColor"]="#117733"
		activador.querySelector(".text").innerHTML = "Bot activado"
	}else{
		activador.style["backgroundColor"]="#771133"
		activador.querySelector(".text").innerHTML = "Bot desactivado"
	}
}
function crear_activar_bot(){
	window.bot_está_activado = 0
	var span = document.createElement("span")
	var div = document.createElement("div")
	var función = x=>activar_bot()
	var nombre = "activar_bot"
	var existe_botón = document.querySelector("#"+nombre)!=null
	span.className = "text"
	span.innerHTML = "Bot desactivado"
	div.style["backgroundColor"]="#771133"
	div.id = nombre
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
			if(window.está_activado==1){
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
		if(window.está_activado==1){
			deslizador_nuevo.style["overflow-y"]="scroll"
			deslizador.style.display="none"
		}else{
			deslizador_nuevo.style["overflow-y"]="hidden"
			deslizador.style.display="block"
		}
	})
}
function cambiar_botones(){
	if(window.está_activado==1)
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
	window.está_activado ^= 1
	if(window.está_activado==1)
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
		if(contador_deslizar_mensaje<50)
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
	
	cantidad_carga_mensajes = window.está_activado==1?100:20
	if(window.está_activado==1){
		mensaje = document.querySelector(".chatMessagesTab.active .chatMessage.ts")
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
					if(está_activado==1){
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
		if(está_activado==0){
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
	var cantidades = Array.from(document.querySelectorAll(".chatMessagesTab"))
		.map(x=>x.querySelectorAll(".chatMessage").length).join(" ")
	document.querySelector(".chatRoomsButton>a").innerHTML = cantidades
}
function ver_cantidad_mensajes(){
	setInterval(actualizar_cantidades,1000)
}

function carga()
{
	crear_activador()
	cambiar_botones()
	Cq = (a,b,c,d)=>cargar_mensajes(a,b,c,d)
	xq = (a,b,c,d,e)=>quitar_eliminado_mensajes(a,b,c,d,e)
	cambiar_deslizadores()
	ver_cantidad_mensajes()
}
carga()
