// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

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
		var está_activado_herramientas = window.obtener.activado.herramientas()
		if(!está_activado_herramientas){
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
window.tiempo_espera_carga = 50
function deslizar_mensaje(){
	window.cantidad_mensajes.push(document.querySelectorAll(".chatMessagesTab.active .chatMessage.ts").length)
	var activo = document.querySelector(".chatMessagesTab.active")
	var contenedor = activo.querySelector(".chatMessagesContainer")
	var se_ve = Math.abs(window.primer_mensaje.offsetTop-contenedor.scrollTop)<window.primer_mensaje.scrollHeight
	var se_ve_el_logo_cargando = window.logo_cargando!=undefined && window.logo_cargando.style.display == "block"
	if(!se_ve || se_ve_el_logo_cargando )
	{
		++window.contador_deslizar_mensaje
		if(window.contador_deslizar_mensaje<50)
		{
			setTimeout(deslizar_mensaje,window.tiempo_espera_carga)
		}
	}
	var últimas_dos_cantidades = window.cantidad_mensajes.slice(-2)
	if(
		window.logo_cargando &&
		window.logo_cargando.style.display == "none" &&
		últimas_dos_cantidades[0]==últimas_dos_cantidades[1]
		&&últimas_dos_cantidades[1]!=window.cantidad_mensajes[0]
	){
		setTimeout(()=>window.primer_mensaje.scrollIntoView(),window.tiempo_espera_carga)
	}
}
function rl(a,b,c,d,e){
	e={limit:e}
	if(d!=null){e.toTime=d}
	if(b=="room"){e.roomId=c}
	if(b=="private"){e.nick=c}
	return jh(a.ra,"loadLastMessages",e,true)
}

window.cantidad_carga_mensajes = 450

function cargar_mensajes(a, b, c, d) {
	window.cantidad_mensajes = []
	window.cantidad_mensajes.push(document.querySelectorAll(".chatMessagesTab.active .chatMessage.ts").length)
	var está_activado_herramientas = window.obtener.activado.herramientas()
	if(está_activado_herramientas){
		//window.cantidad_carga_mensajes = 450 // ira sever
		window.primer_mensaje = document.querySelector(".chatMessagesTab.active .chatMessage.ts")
	}else{
		window.cantidad_carga_mensajes = 20
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
			window.logo_cargando = N("chatMessagesLoading", e),
			window.logo_cargando.style.display = 'block',
			xd(
				rl(a.jb, g, h, k, void 0 !== d ? d : window.cantidad_carga_mensajes)
				,function () {
					W(e, 'lock', !1)
					window.logo_cargando = N("chatMessagesLoading", this.I[b])
					window.logo_cargando.style.display = "none"
				}
				//,console.log(a)
				,a
			)
		)
	}
	if(está_activado_herramientas){
		window.contador_deslizar_mensaje=0
		setTimeout(deslizar_mensaje,window.tiempo_espera_carga)
	}
}

window.tiempos = {}

function agregar_tiempo(nombre){
	var devuelve
	if(tiempos==undefined){
		window.tiempos = {}
	}
	if(window.tiempos[nombre]==undefined){
		window.tiempos[nombre] = []
	}
	var tiempo = setTimeout(window[nombre],1000)
	window.tiempos[nombre].push(tiempo)
	devuelve = [window.tiempos,window.tiempos[nombre],tiempo]
	return devuelve
}
function osrever(texto){
	var a = []
	var f = "esrever".split("").map(x=>a.unshift(x))
	return texto.split("")[a.join("")]().join("")
}
function tipo(elemento){
	var devuelve
	if(elemento==undefined){
		if(elemento===undefined)                           {devuelve="indefinido"}
		if(elemento===null)                                {devuelve="nulo"}
	}else{                                                 ;
		var llamada = (elemento+"")                        ;
		//console.log(el_constructor,llamada)              ;
		if(llamada.split(" ")[0].slice(1)=="object"){      ;
			devuelve = llamada                             ;
			if(llamada=="[object Object]")                 {devuelve="objeto"}
			if(llamada=="[object Arguments]")              {devuelve="argumentos"}
			if(llamada=="[object JSON]")                   {devuelve="notación de objetos"}
			if(llamada=="[object Math]")                   {devuelve="matemática"}
		}else{                                             ;
			var el_constructor = elemento.constructor.name ;
			devuelve = el_constructor                      ;
			if(el_constructor=="Array")                    {devuelve="array"}
			if(el_constructor==osrever("naelo"+"oB"))      {devuelve="proposición"}
			if(el_constructor=="String")                   {devuelve="texto"}
			if(el_constructor=="Number")                   {devuelve="número"}
			if(el_constructor=="Date")                     {devuelve="fecha"}
			if(el_constructor=="Error")                    {devuelve="error"}
			if(el_constructor=="Function")                 {devuelve="función"}
		}
	}
	return devuelve
}
function filtrar_definidos(elemento){
	var devuelve
	var función
	if(tipo(elemento)=="array"){
		devuelve = elemento.slice(1)
	}
	if(tipo(elemento)=="objeto"){
		var destino = {}
		Object.assign(destino,elemento)
		delete destino[Object.keys(elemento)[0]]
		devuelve = destino
	}
	return devuelve
}
window.es = filtrar_definidos({"":""
	,activado: filtrar_definidos({"":""
		,función: function(nombre_div,texto){ // Dir: es.activado.función
			var devuelve
			var div = document.querySelector("#"+nombre_div+">.text")
			if(div!=undefined){
				devuelve = div.textContent==texto
			}else{
				var nombre = window.obtener.nombre()
				if(nombre!="..."){
					if(window.configuración!=undefined){
						if(window.configuración[nombre]==undefined){devuelve = window.configuración[nombre]={}}
						if(window.configuración[nombre].activado==undefined){window.configuración[nombre].activado={}}
						
					}else{
						window.local_storage.guardar_predeterminado()
					}
					var opción = nombre_div.split("_")[1]
					devuelve = window.configuración[nombre].activado[opción]
					if(opción=="bot" && !window.obtener.activado.herramientas()){
						devuelve = false
					}
				}else{
					console.info("El usuario no ha ingresado.")
					devuelve = false
				}
			}
			return devuelve
		}
		,herramientas: function(){ // Dir: es.activado.herramientas | es equivalente
			return window.obtener.activado.herramientas()
		}
		,bot: function(){ // Dir: es.activado.bot | es equivalente
			return window.obtener.activado.bot()
		}
	})
})
window.obtener = filtrar_definidos({"":""
	,nombre: function(){ // Dir: obtener.nombre
		var devuelve
		var usuario = document.querySelector("#nickMenu .text").textContent
		var cuenta = document.querySelector("#accountMenu .text").textContent
		devuelve = usuario=="..."?cuenta:usuario
		return devuelve
	}
	,activado: filtrar_definidos({"":""
		,herramientas: function(){ // Dir: obtener.activado.herramientas
			var devuelve
			if(window.es!=undefined){
				devuelve = window.es.activado.función("activar_herramientas","Activado")
			}
			return devuelve
		}
		,bot: function(){ // Dir: obtener.activado.bot
			var devuelve
			if(window.es!=undefined){
				devuelve = window.es.activado.función("activar_bot","Bot activado")
			}
			return devuelve
		}
	})
	,primer_mensaje: function(){ // Dir: obtener.primer_mensaje
		return document.querySelector(".chatMessagesTab.active .chatMessage.ts")
	}
})
window.local_storage = filtrar_definidos({"":""
	,cargar: function(){ // Dir: local_storage.cargar
		var devuelve
		var local_storage_configurar = localStorage.configuración
		if(local_storage_configurar!=undefined){
			window.configuración = JSON.parse(local_storage_configurar)
			devuelve = window.configuración
		}else{
			devuelve = undefined
		}
		return devuelve
	}
	,asignar: function(){ // Dir: local_storage.asignar
		var devuelve
		if(window.configuración!=undefined){
			var nombre = window.obtener.nombre()
			window.configuración[nombre] = {
				activado: filtrar_definidos({"":""
					,"herramientas": window.obtener.activado.herramientas()
					,"bot": window.obtener.activado.bot()
				})
			}
		}else{
			window.local_storage.guardar_predeterminado()
			console.info("Se ha asignado una configuración predeterminada")
		}
		devuelve = window.configuración
		return devuelve
	}
	,guardar: function(){ // Dir: local_storage.guardar
		var devuelve
		window.local_storage.asignar()
		localStorage.configuración = JSON.stringify(window.configuración)
		devuelve = localStorage.configuración
		return devuelve
	}
	,borrar: function(){ // Dir: local_storage.borrar
		return delete localStorage.configuración
	}
	,usuario_actual: function(){ // Dir: local_storage.usuario_actual
		var devuelve
		var nombre = window.obtener.nombre()
		window.local_storage.guardar_predeterminado()
		if(localStorage.configuración!=undefined){
			if(localStorage.configuración[nombre]!=undefined){
				devuelve = JSON.parse(localStorage.configuración)[nombre].activado
			}
		}
		return devuelve
	}
	,guardar_predeterminado: function(){ // Dir: local_storage.guardar_predeterminado
		var devuelve
		var nombre = window.obtener.nombre()
		if(nombre!="..."){
			if(window.configuración==undefined){window.configuración = {}}
			if(window.configuración[nombre]==undefined){
				window.configuración[nombre]=filtrar_definidos({"":""
					,activado: filtrar_definidos({"":""
						,herramientas: true
						,bot: false
					})
				})
				console.log("Usuario actual: ",nombre,window.local_storage.usuario_actual())
				localStorage.configuración = JSON.stringify(window.configuración)
			}
			devuelve = window.configuración
		}else{
			console.info("El usuario no ingresó.")
			devuelve = ["no ingresado",nombre]
		}
		return devuelve
	}
})

function determinar_configuración_usuario(nombre){
	var devuelve
	if(window.configuración!=undefined){
		var configuración_nombre = window.configuración[nombre]
		devuelve = window.configuración[nombre]
		window.local_storage.guardar()
	}else{
		window.local_storage.guardar_predeterminado()
		devuelve = console.log("La configuración predeterminada se ha asignado.")
	}
	return devuelve
}
function cambiar_activación(opción,callback){
	var devuelve
	var opciones = filtrar_definidos({"":""
		,herramientas: filtrar_definidos([
			,"activar_herramientas"
			,"000000"
			,"23aa34"
			,"Desactivado"
			,"Activado"
		])
		,bot: filtrar_definidos([
			,"activar_bot"
			,"771133"
			,"117733"
			,"Bot desactivado"
			,"Bot activado"
		])
	})
	var nombre = window.obtener.nombre()
	cambiar_color(...opciones[opción])
	determinar_configuración_usuario(nombre)
	callback()
	return devuelve
}
function callback_activar_herramientas(){
	cambiar_deslizadores()
	cambiar_botones()
	window.local_storage.guardar()
}
function cambiar_activado_herramientas(){
	var devuelve
	cambiar_activación("herramientas",()=>callback_activar_herramientas())
	return devuelve
}
function cambiar_activado_bot(){
	var devuelve
	cambiar_activación("bot",()=>true)
	return devuelve
}

// Fin configuración

window.crear = filtrar_definidos({"":""
	,botón: function(callback,nombre,texto,color){ // Dir: crear.botón
		var devuelve
		var existe_botón = document.querySelector("#"+nombre)!=null
		if(!existe_botón){
			var div = document.createElement("div")
			var span = document.createElement("span")
			span.className = "text"
			span.innerHTML = texto
			div.style["backgroundColor"]="#"+color
			div.id = nombre
			div.className = "menuItem"
			div.appendChild(span)
			div.addEventListener("click",callback)	
			document.querySelector("#menubar").appendChild(div)
			devuelve = div
		}
		return devuelve
	}
	,activador: filtrar_definidos({"":""
		,herramientas: function(){ // Dir: crear.activador.herramientas
			var devuelve
			var nombre = window.obtener.nombre()
			if(nombre!="..."){
				window.local_storage.guardar_predeterminado()
				var está_activado = window.configuración[nombre].activado.herramientas
				console.log("Está activado herramientas: ",está_activado)
				devuelve = window.crear.botón(
					()=>cambiar_activado_herramientas()
					,"activar_herramientas"
					,está_activado?"Activado":"Desactivado"
					,está_activado?"23aa34":"000000"
				)
			}else{
				console.info("El usuario no ingresó.")
				devuelve = "error_1"
			}
			return devuelve
		}
		,bot: function(){ // Dir: crear.activador.bot
			var devuelve
			var nombre = window.obtener.nombre()
			if(nombre!="..."){
				window.local_storage.guardar_predeterminado()
				var está_activado = window.configuración[nombre].activado.bot
				console.log("Está activado bot: ",está_activado)			
				devuelve = window.crear.botón(
					()=>cambiar_activado_bot()
					,"activar_bot"
					,"Bot "+(está_activado?"":"des")+"activado"
					,está_activado?"117733":"771133"
				)
			}else{
				console.info("El usuario no ingresó.")
				devuelve = "error_1"
			}
			return devuelve
		}
	})
	,utilidades: filtrar_definidos({"":""
		,copiador: function(){ // Dir: crear.utilidades.copiador
			return window.crear.botón(copiar_todo,"copiador","Copiar","012345")
		}
		,borrador: function(){ // Dir: crear.utilidades.borrador
			return window.crear.botón(borrar_todo,"borrador","Borrar","543210")
		}
	})
})

function cambiar_color(nombre,color_desactivado,color_activado,texto_desactivado,texto_activado){
	var div = document.querySelector("#"+nombre)
	var span = div.querySelector("span")
	var texto = span.textContent
	if(texto==texto_desactivado)
	{
		div.style["backgroundColor"]="#"+color_activado
		span.innerHTML = texto_activado
	}else{
		div.style["backgroundColor"]="#"+color_desactivado
		span.innerHTML = texto_desactivado
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
function borrar_todo(){
	var array_mensajes = document.querySelectorAll(".chatMessagesTab.active .chatMessage.ts")
	var mensajes = Array.from(array_mensajes)
	var segundo_elemento = mensajes[1]
	segundo_elemento.scrollIntoView()
	mensajes.slice(30).map(x=>x.remove())
}
function separar_variable(nombre_variable){
	return JSON.parse("["+nombre_variable.replace(/(([A-Z]|[a-z])[a-z]+)/g,",\"$1\"").slice(1)+"]")
}
function cambiar_deslizadores(){
	var devuelve
	var está_activado_herramientas = window.obtener.activado.herramientas()
	devuelve = ["chatMessagesTab","chatUsersTab","contentWrapper"].map(y=>
		Array.from(document.querySelectorAll("."+y)).map(x=>{
			var clase = separar_variable(y).slice(0,-1).join("")
			var antiguo = x.querySelector("."+clase+"ScrollBar")
			var nuevo = x.querySelector("."+clase+"Container")
			var estilo_nuevo = nuevo.style
			var estilo_antiguo = antiguo.style
			//console.log(está_activado_herramientas,antiguo,nuevo)
			if(está_activado_herramientas){
				if(estilo_antiguo.display!="none"){
					estilo_antiguo.display="none"
					estilo_nuevo["overflow-y"]="scroll"
				}
			}else{
				if(estilo_antiguo.display!="block"){
					estilo_antiguo.display="block"
					estilo_nuevo["overflow-y"]="hidden"
				}
			}
		})
	)
	if(está_activado_herramientas){
		devuelve.unshift(setTimeout(cambiar_deslizadores,1000))
	}
	return devuelve
}
function cambiar_botones(){
	var devuelve
	var está_activado_herramientas = window.obtener.activado.herramientas()
	if(está_activado_herramientas)
	{
		devuelve = [""
			,window.crear.activador.bot()
			,window.crear.utilidades.copiador()
			,window.crear.utilidades.borrador()
		]
	}else{
		devuelve = Array.from(document.querySelectorAll(
			"#activar_bot,#copiador,#borrador"
		)).map(x=>x.remove())
	}
	return devuelve
}

function actualizar_cantidades(){
	var div = document.querySelector(".chatRoomsButton>a")
	var está_activado_herramientas = window.obtener.activado.herramientas()
	if(está_activado_herramientas){
		var salas = Array.from(document.querySelectorAll(".chatMessagesTab"))
		var cantidades = salas.map(x=>x.querySelectorAll(".chatMessage").length).join(" ")
		div.innerHTML = cantidades
		setTimeout(()=>actualizar_cantidades(),1000)
	}else{
		if(div.textContent!=window.acciones)
		{
			div.innerHTML = window.acciones
		}
	}
}
function iniciar_tiempo_cantidades(){
	window.int_cantis_salas = setTimeout(()=>actualizar_cantidades(),1000)
	return window.int_cantis_salas
}

function borrar_activador()
{
	document.querySelector("#activador").remove()
}
function ver_cantidad_mensajes(){
	var div = document.querySelector(".chatRoomsButton>a")
	window.acciones = div.textContent
	iniciar_tiempo_cantidades()
}

function iniciar_herramientas(){
	xq = (a,b,c,d,e)=>quitar_eliminado_mensajes(a,b,c,d,e)
	Cq = (a,b,c,d)=>cargar_mensajes(a,b,c,d)
	window.crear.activador.herramientas()
	cambiar_botones()
	cambiar_deslizadores()
	ver_cantidad_mensajes()
}
function determinar_local_storage(){
	var devuelve
	var nombre = window.obtener.nombre()
	window.local_storage.guardar_predeterminado()
	window.local_storage.cargar()
	if(window.configuración==undefined){
		window.configuración = {}
		if(window.configuración[nombre]==undefined){
			window.configuración[nombre] = filtrar_definidos({"":""
				,activado: filtrar_definidos({"":""
					,"herramientas": true
					,"bot": false
				})
			})
			window.local_storage.guardar()
		}
	}
	devuelve = window.configuración[nombre]
	return devuelve
}
function cargar_configuración(){
	var devuelve
	var nombre = window.obtener.nombre()
	if(nombre=="..."){
		var tiempo = agregar_tiempo("cargar_configuración")
		devuelve = tiempo[2]
	}else{
		window.local_storage.cargar()
		iniciar_herramientas()
		determinar_local_storage()
	}
	return devuelve
}
function carga()
{
	return cargar_configuración()
}

function cambiar_cantidad(){
	var textarea = document.querySelector("textarea")
	if(/^\d+\s+$/.test(textarea.value)){
		var valor = +textarea.value.match(/\d/g).join("")
		if( valor>=20 && valor<1000 ){
			window.cantidad_carga_mensajes = valor
			alert( valor )
			textarea.value = ""
		}
	}
}

window.estado_carga = carga()

document.querySelector("textarea").addEventListener("keyup",cambiar_cantidad)

