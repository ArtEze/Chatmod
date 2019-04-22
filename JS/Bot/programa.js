// Código hecho por Emiliano Ezequiel Parenti

function x()
{
	console.log(Array.from(arguments))
}
function obtener_nombre_propio()
{
	var devuelve = undefined
	var nombre = localStorage.nick
	if(nombre!=undefined)
	{
		devuelve=JSON.parse(localStorage.nick)
	}
	return devuelve
}
function soy_bot()
{
	return window["bot_está_activado"]==1
}
function estado_conexión()
{
	var devuelve = -1
	var accountMenu = document.querySelector("#accountMenu")
	var nickMenu = document.querySelector("#nickMenu")
	if(accountMenu==undefined){devuelve-=1}
	if(nickMenu==undefined){devuelve-=2}
	if(devuelve==-1)
	{
		++devuelve
		devuelve+=1*(accountMenu.style.display=="block")
		devuelve+=2*(nickMenu.style.display=="block")
	}
	return devuelve
}
function está_listo()
{
	var devuelve = undefined
	var cargado = document.querySelector(".loadingItem")
	if(cargado!=undefined)
	{
		devuelve = cargado.style.display=="none"
	}
	return devuelve
}
function puedo_enviar_mensajes()
{
	return estado_conexión()==2
}
function elemento_aleatorio(array)
{
	array = array.filter(x=>x!=undefined)
	return array[Math.floor(Math.random()*array.length)]
}
function texto_hacia_html(texto)
{
	return domparser.parseFromString(texto,"text/html")
}
function descargar(dirección,función,error)
{
	var descarga = new XMLHttpRequest()
	var hecho = false
	descarga.onreadystatechange = function(){
		var descargado = descarga.responseText
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			if(typeof función=="function")
			{
				función(descarga.responseText)
			}else
			{
				if(/error/gi.test(descargado))
				{
					try{
						var analizado = JSON.parse(descargado)
						console.log({d1:analizado})
					}catch(e)
					{
						console.log({d2:descargado})
					}
					hecho = true
				}
				if(/{}/gi.test(descargado) & !hecho)
				{
					/*console.log("correcto",{a:dirección})*/
					hecho = true
				}
				if(!hecho){/*console.log(descargado)*/}
			}
		}else
		{
			//console.log([4,descarga.readyState],[200,descarga.status])
			if(typeof error=="function")
			{
				error(descargado)
			}else
			{
				//console.log({d3:descargado})
			}
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}

function descargar_votantes()
{
	descargar(
		location.origin+"/custom.css?"+Math.floor(Math.random()*1000)
		,x=>{
			var lista_votantes=x.match(/=".+"/gi)
			if(lista_votantes!=null)
			{
				votantes=lista_votantes.map(x=>eval("\""+x.slice(2,-1).replace(/\\00/gi,"\\u")+"\""))
			}
		}
	)
}

// https://pastebin.com/vPwXqk2k
function insertar_textarea(texto,d)
{
	var ta = document.querySelector("textarea")
	ta.value = texto
	ta.disabled = d==undefined?ta.disabled:d==0?true:d==1?false:!ta.disabled
}
function unicode(nombre)
{
	(x=>{
		var texto = "\\"+x.split("").map(x=>("000000"+x.charCodeAt().toString(16)).slice(-6)).join("\\")
		insertar_textarea(texto)
	})(nombre)
}
function modificar_función(entrada,intermediario,escribir_textarea)
{
	var función = typeof(entrada)=="string"?window[entrada]:entrada
	var función_2 = typeof(intermediario)=="string"?window[intermediario]:intermediario
	var nombre_entrada = función.name
	var nombre_intermediario = función_2.name
	var modificado = función+""
	modificado = modificado.replace(
		/^function ([^\x28]+)\s*\x28((?:,?\s*[^,\x29]+)+)\x29\s*\x7b\s*((?:.|\n)+)\x7d$/gi
		,"function $1($2){"+nombre_intermediario+"($2);$3}"
	)
	if(escribir_textarea){
		try{insertar_textarea(modificado)}catch(e){}
	}
	try{eval(nombre_entrada+"="+modificado)}catch(e){}
	return window[nombre_entrada]
}
function buscar_en_matriz(array,columna,valor)
{
	return array.map(x=>x[columna]).indexOf(valor)
}
function descargar_horóscopo()
{
	var función_2 = x=>{
		var html = texto_hacia_html(x)
		var nodos = Array.from(
			html.querySelector(".entry-content.clearfix").children
		).map(x=>x.textContent)
		var posiciones = nodos.map(x=>x.split(" ").length==1?x:"")
		var array = signos
		for(var i in lista_signos)
		{
			var posición = nodos.indexOf(lista_signos[i].toUpperCase())
			array.push(nodos[posición+1])
		}
	}
	var función = x=>{
		var html = texto_hacia_html(x)
		var dirección = html.querySelector(".post-column.clearfix a").href
		descargar(dirección,función_2)
	}
	var dirección = "//horoscoposocial.com/#horoscopos"
	descargar(dirección,función)
}
function obtener_CSRF()
{
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector("script").textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
function caracteres_hacia_hexadecimal(texto)
{
	var caracteres = ["\\+",":","\n","#","&","\x20","\\*"]
	for(var i in caracteres)
	{
		var actual = caracteres[i]
		var exp = new RegExp(actual,"gi")
		var char_hacia_hex = x=>"%"+("0"+x.slice(-1).charCodeAt().toString(16).toUpperCase()).slice(-2)
		texto = texto.replace(exp,char_hacia_hex(actual))
	}
	return texto
}
function banear_según_minutos(nombre,minutos,causa)
{
	var chat = location.origin+"/chat/"
	var modo = minutos>=0?"ban":"signOut"
	var fin = ""
	if(minutos>=0){fin+="&roomId=1&nick=" + caracteres_hacia_hexadecimal(nombre)}
	if(minutos>0){fin+="&minutes=" + minutos}
	if(causa!=undefined)
	{
		causa = caracteres_hacia_hexadecimal(causa)
		fin += "&comment=" + causa
	}
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección,x=>console.log(x))
}
function moderar_usuario(nombre,función,error)
{
	var chat = location.origin+"/chat/"
	var dirección = chat + "getChatNickLocalModInfo?nick=" + nombre
	if(función==undefined)
	{
		función = x=>{
			var analizado = JSON.parse(x)
			var no_error = +(analizado.t!="error")
			if(no_error)
			{
				console.log(x)
			}
		}
	}
	if(error==undefined)
	{
		//error = x=>console.log(x)
	}
	descargar(dirección,función,error)
}
function callback_eliminar(datos)
{
	var analizado = JSON.parse(datos)
	var error = analizado.t=="error"
	if(error)
	{
		console.log("Hubo un error al eliminar.")
	}
}
function eliminar_mensaje(número,sala)
{
	var chat = location.origin+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección,x=>callback_eliminar(x))
}
function enviar_mensaje(mensaje,sala,hacia,tiempo)
{
	mensaje = caracteres_hacia_hexadecimal(mensaje)
	sala = sala==undefined?1:sala
	hacia = hacia==undefined?[]:hacia
	tiempo = tiempo==undefined?0:tiempo
	var chat = location.origin+"/chat/"
	var modo = "send"
	var fin = "&roomId="+sala+"&msg="+ mensaje
	if(hacia.length>0){fin+="&to="+hacia}
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	setTimeout(()=>descargar(dirección),tiempo)
}
function obtener_país(datos,usuario,sala,hacia)
{
	var html = texto_hacia_html(datos)
	var fecha = new Date()
	var hora = fecha.getUTCHours()
	var minutos = dos_dígitos(fecha.getUTCMinutes())
	var placeLine = html.querySelector(".placeLine")
	var mensaje
	if(placeLine!=undefined)
	{
		var país = placeLine.textContent.replace(/[\s]/gi,"").split(",")[0]
		var cambio = obtener_GMT(país)
		if(cambio!=undefined)
		{
			mensaje = "Las " + dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
		}else{
			mensaje = elemento_aleatorio(desconocimiento)
		}
	}else{
		mensaje = elemento_aleatorio(desconocimiento)
	}
	enviar_mensaje(mensaje,sala,[usuario])
}
function obtener_info(entrada,usuario,sala,hacia)
{
	var enviar_información = function(datos){
		var nombre_info = datos.querySelector(".nick").textContent
		var mensaje = datos.querySelector(".aboutLine").textContent.split(/Acerca de mí:\n\s+/)[1].split(/\s{4,}/)[0]
		if(mensaje.length>200){
			mensaje = mensaje.slice(0,200)
			mensaje += " (...)"
		}
		if(!info_excluidos.includes(nombre_info))
		enviar_mensaje(mensaje,sala,[usuario,nombre_info])
	}
	var accionar_desde_html = function(datos,función){
		var html = texto_hacia_html(datos)
		función(html)
	}
	var accionar_desde_identidad = function(identidad,función){
		if(identidad!=undefined)
		{
			var sitio = location.protocol +"//"+location.host
			var dirección = sitio + "/id"+identidad
			descargar(dirección,x=>función(x))
		}
	}
	var info = function(datos){
		var analizado = JSON.parse(datos)
		var no_error = analizado.t!="error"
		if(no_error)
		{
			var identidad = analizado.nickId
			accionar_desde_identidad(identidad,x=>accionar_desde_html(x,enviar_información))
		}
	}
	var lista_nombres = usuarios.map(x=>x.alias)
	if(entrada.match(/^\s*info\s*$/gi)!=null)
	{
		for(var i in hacia)
		{
			var actual = hacia[i]
			if(!lista_nombres.includes(actual))
			{
				moderar_usuario(actual,info)
			}else{
				var posición = lista_nombres.indexOf(actual)
				info(JSON.stringify(usuarios[posición]))
			}
		}
	}
}
function regularizar_texto(texto)
{
	var tildes = [
		"aáäàâ",
		"eéëèê",
		"iíïìî",
		"oóöòô",
		"uúüùû"
	]
	var array = texto.split("")
	for(var i in array)
	{
		for(var j in tildes)
		{
			var texto = "["+tildes[j]+"]"
			var regex = new RegExp(texto,"gi")
			if(regex.test(array[i]))
			{
				array[i] = texto
			}
			
		}
	}
	var salida = array.join("")
	var regex_2 = new RegExp(salida,"gi")
	return regex_2
}
function horóscopo(entrada,usuario,sala,hacia)
{
	var mensaje = ""
	var reg = regularizar_texto("horóscopo|signo")
	if(reg.test(entrada))
	{
		for(var i in lista_signos)
		{
			var actual = lista_signos[i]
			var reg = regularizar_texto(actual)
			if(reg.test(entrada))
			{
				mensaje = signos[i]
			}
		}
		var hacia_2 = hacia.slice()
		hacia_2.unshift(usuario)
		if(mensaje)
		{
			enviar_mensaje(mensaje,sala,hacia_2)
		}
	}
}
function interruptor_ban(entrada,usuario,sala,hacia)
{
	if(entrada.match(/^\s*activar\s*$/gi)!=null)
	{
		puede_banear_votos ^= 1
		var hacia_2 = hacia.slice()
		hacia_2.unshift(usuario)
		var salas_activar_ban = [sala,sala_ban]
		for(var i in salas_activar_ban)
		{
			enviar_mensaje("El ban está "+(puede_banear_votos?"":"des")+"activado.",salas_activar_ban[i],i?[]:hacia_2)
		}
	}
}
function patear_futuro(usuarios)
{
	var funciones = []
	var vips = Array.map(document.querySelector(".chatUsers").querySelectorAll(".vip"),x=>x.textContent)
	var función = (actual,vips)=>()=>{
		if(puede_patear & !vips.includes(actual) & !excluidos_patear.includes(actual))
		{
			if(id_chat<1|id_chat>2)
			{
				banear_según_minutos(actual,0)
			}
		}
	}
	for(var i in usuarios)
	{
		var actual = usuarios[i]
		funciones[i] = función(actual,vips)
		var intervalo = setTimeout(funciones[i],2*42*(i+1))
	}
}
function patear_a_todos(entrada,número,usuario,sala,hacia)
{
	var usuarios = Array.from(document.querySelector(".chatUsers").querySelectorAll(".nick")).map(x=>x.textContent)
	var soy_un_bot = regularizar_texto(obtener_nombre_propio()).test(hacia)
	if(soy_un_bot)
	{
		if(big_bang_activado)
		{
			if(entrada.match(/^\s*big\s*bang\s*$/gi)!=null)
			{
				setTimeout(()=>enviar_mensaje("[size=30][b]Atención: Todos serán pateados. [/b][/size] >:) ",sala),10000)
				setTimeout(()=>patear_futuro(usuarios),20000)
				puede_patear = 1
				eliminar_mensaje(número,sala)
			}
			if(entrada.match(/^\s*detener\s*$/gi)!=null)
			{
				var suerte = aleatorio(3)!=0
				if(suerte)
				{
					enviar_mensaje("[size=20][b]El pateo ha sido detenido.[/b][/size]",sala)
					puede_patear = 0
				}else{
					enviar_mensaje("[size=20][b]Es imposible detener el pateo.[/b][/size]",sala)
				}
				eliminar_mensaje(número,sala)
			}
		}
	}
}
function usuario_está_presente(usuarios){
	var devuelve = false
	var presentes = Array.from(
		document.querySelector(".chatUsers").querySelectorAll(".nick")
	).map(x=>x.innerHTML)
	for(var i in usuarios){
		var actual = usuarios[i]
		if(presentes.includes(actual)){
			devuelve = true
		}
	}
	return devuelve
}
function patear_usuarios(entrada,número,usuario,sala,hacia)
{
	var soy_un_bot = soy_bot()
	if(soy_un_bot)
	{
		if(/^\s*patear\s*$/gi.test(entrada))
		{
			if(hacia.length==0)
			{
				puede_patear_usuarios ^= 1
			}else{
				if(puede_patear_usuarios && !esperar_confirmar_patear){
					// eliminar_mensaje(número,sala)
					window.usuarios_a_patear = hacia
					enviar_mensaje("¿Realmente quieres patear?",sala,usuario)
					window.usuario_pateador = usuario
					setTimeout(()=>window.esperar_confirmar_patear=0,40*1000)
					window.esperar_confirmar_patear = true
				}
			}
		}
	}
}
function patear_usuarios_seleccionados(usuario,sala){
	window.esperar_confirmar_patear=0
	var patear_seleccionado = []
	for(var i in window.usuarios_a_patear)
	{
		var pateado = window.usuarios_a_patear[i]
		patear_seleccionado[i] = Function("banear_según_minutos('"+pateado+"',0)")
		if(window.excluidos_patear.includes(window.usuario_pateador)){
			setTimeout(patear_seleccionado[i],50*i)
		}
		else{
			if(window.excluidos_patear.includes(pateado)){
				enviar_mensaje(elemento_aleatorio(no_patear_excluido),sala,[usuario])
			}else{
				setTimeout(patear_seleccionado[i],50*i)
			}
		}
	}
	window.usuarios_a_patear=[]
}
function esperar_confirmación_patear(entrada,número,usuario,sala,hacia){
	if(window.esperar_confirmar_patear==1){
		if(usuario==window.usuario_pateador){
			if(/^\s*(pues)*.*((\s*s[iíïìî]p?)|(obvio)).*\s*$/gi.test(entrada)){
				patear_usuarios_seleccionados(usuario,sala)
			}
			if(/^\s*n[oóöòô]p?.*\s*$/gi .test(entrada)){
				window.esperar_confirmar_patear=0
				window.usuarios_a_patear=[]
				enviar_mensaje(elemento_aleatorio(no_patear),sala,usuario)
			}
		}
	}
}
function pedir_hora_usuario(datos,usuario,sala,hacia)
{
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error)
	{
		var identidad = analizado.nickId
		var sitio = location.protocol +"//"+location.host
		var dirección = sitio + "/id"+identidad
		var mensaje
		if(identidad!=undefined)
		{
			console.log(dirección)
			descargar(dirección,x=>obtener_país(x,usuario,sala,hacia))
		}else{
			mensaje = elemento_aleatorio(desconocimiento)
			enviar_mensaje(mensaje,sala,[usuario])
		}
	}
}
function operar_perfil(usuario,sala,hacia)
{
	moderar_usuario(usuario,(datos)=>pedir_hora_usuario(datos,usuario,sala,hacia))
}
function aleatorio_hora()
{
	return 60*1000*Math.floor(1+Math.random()*60*24) // 24 horas
}
function dos_dígitos(número)
{
	return (número/100).toFixed(2).slice(2)
}
function decir_la_hora()
{
	var soy_un_bot = soy_bot()
	if(soy_un_bot){
		var fecha = new Date()
		var hora = fecha.getUTCHours()
		var minutos = dos_dígitos(fecha.getUTCMinutes())
		// Falta: Bolivia, Costa Rica, Cuba, El Salvador, Honduras
		var color = "981221"
		var sp = "\n"
		var co = "[color=%23"+color+"]"
		var ci = "[/color]"
		var v = ""
		var mensaje = "[color=%23"+color+"]Horas en el mundo: " + ci + sp
		var array = [
			 [-3,"Argentina y Uruguay."],[-4,"Chile, Paraguay, República Dominicana y Venezuela"]
			,[-5,"Colombia, Ecuador, México, Panamá y Perú"],[-6,"Guatemala y Nicaragua"]
			,[ 1,"España, Islas Canarias"],[ 2,"España, Madrid... Andalucía"],[ 8,"Singapur"]
		]
		for(var i in array)
		{
			mensaje+=dos_dígitos((hora+24+array[i][0])%24)+":"+minutos+" "+array[i][1]+(i%2==0?(i!=array.length-1?sp+co:""):ci+sp)
		}
		mensaje+=v
		enviar_mensaje(mensaje)
		var tiempo = aleatorio_hora()
		setTimeout(decir_la_hora,tiempo)
	}
}
function coinciden_palabras_or(entrada,palabras)
{
	var exp = new RegExp("\\b"+palabras.join("|")+"\\b","gi")
	return exp.test(entrada)
}
function coinciden_palabras_and(entrada,palabras)
{
	var coincide = false
	for(var i in palabras)
	{
		coincide = true
		for(var j in palabras[i])
		{
			var exp = new RegExp("\\b"+palabras[i][j]+"\\b","gi")
			if(!exp.test(entrada)){coincide = false;break}
		}
		if(coincide){break}
	}
	return coincide
}
function eliminar_palabras(entrada,número,sala)
{
	var palabras_or = ["martillo"]
	var palabras_and = ["martillo","martillo"]
	if(
		coinciden_palabras_or(entrada,palabras_or)
		|coinciden_palabras_and(entrada,palabras_and)
	){
		eliminar_mensaje(número,sala)
	}
	if(entrada.includes("\u1ecf\u0337\u0356\u0348\u031e\u0329")&entrada.length>500){
		eliminar_mensaje(número,sala)
	}
}
function martillo(entrada,número,sala)
{
	if(/\b[aeiou]*m[aeiou]+rt[aeiou]+(ll|y|sh).*[aeiou]+[ns]?\b/gi.test(entrada))
	{
		eliminar_mensaje(número,sala)
	}
}
function eliminar_y_banear_18(entrada,usuario,número,sala)
{
	if(!puede_banear_18){return;}
	var palabras_or = ["sexy?","adult","fuck","video chat","rape"]
	if(coinciden_palabras_or(entrada,palabras_or)&/https?:\/{2}/gi.test(entrada))
	{
		eliminar_mensaje(número,sala)
		banear_según_minutos(usuario,44640,"+18")
	}
	/*
	if(usuario.includes("enga"))
	{
		eliminar_mensaje(número,sala)
		banear_según_minutos(usuario,34,"-.-")
		baneados.push(usuario)
	}
	*/
}
function banear_flood(entrada,usuario,número,sala)
{
	var mensaje_y_fecha = {}
	var array = [
		/^\d{9,10}$/gi.test(entrada)
		,/hola/gi.test(entrada)
	]
	// Uno para cada condición
	if(flood[usuario]==undefined)
	{
		flood[usuario]=[[],0,0]
	}
	for(var i in array)
	{
		if(array[i].test(entrada))
		{
			flood[usuario][0].push([número,sala,+new Date()])
			++flood[usuario][i+1]
			if(flood[usuario][i+1]>=2)
			{
				banear_según_minutos(usuario,7,"Flood")
				for(var j in flood[usuario][0])
				{
					var mensaje = flood[usuario][0][j]
					eliminar_mensaje(...mensaje)
				}
			}
		}
	}
}
function comprobar_otro_chat(entrada)
{
	var contador = 0
	var permitidos = ["a","st1","coins","help","account","admin"]
	permitidos.unshift(location.host.split(".")[0])
	entrada = entrada.replace(/\[\/?img\]/gi,"")
	var chats = entrada.match(/\b\S+\.chatovod.com\b/gi)
	if(chats==null){chats=[]}
	//console.log(chats)
	for(var i in chats)
	{
		var actual = chats[i]
		actual = actual.replace(/^https?:\/\//,"")
		for(var j in permitidos)
		{
			var actual_2 = permitidos[j]
			if(actual==actual_2+".chatovod.com")
			{
				++contador
			}
		}
	}
	var borrar = contador < chats.length
	if(id_chat==1|id_chat==2)
	{
		var regexp = new RegExp(chats_pablo.join("|"),"gi")
		if(regexp.test(entrada)){borrar=false}
	}
	return borrar
}
function eliminar_y_banear_otro_chat(entrada,usuario,número,sala)
{
	var borrar = comprobar_otro_chat(entrada)
	if(entrada.includes("wixsite")){borrar=true}
	if(borrar)
	{
		eliminar_mensaje(número,sala)
		if(usuario!="asdfg")
		{
			banear_según_minutos(usuario,44640,"Pasar chat")
		}else{
			enviar_mensaje("Has sido perdonado.",sala,[usuario])
		}
	}
}
function detectar_enlaces(entrada)
{
	entrada = entrada.replace(/https?:\/\//gi,"")
	entrada = entrada.replace(/%3A/gi,":")
	entrada = entrada.replace(/%2F/gi,"/")
	var enlaces = entrada.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)
	return enlaces
}
function es_domingo()
{
	return new Date().getDay() == 0
}
function color_usuario(usuario){
	var devuelve
	var divs = Array.from(document.querySelectorAll(".nick[data-nick='"+usuario+"']"))
	//console.log(divs.map(x=>[x,x.attributes["data-nick"].value,x.innerHTML]))
	if(divs[0]==undefined)
	{
		devuelve = "000000"
	}else{
		devuelve = divs[0].style.color.split(/[(),]/gi).slice(1,-1).map(x=>("0"+(+x).toString(16)).slice(-2)).join("")
	}
	return devuelve
}
function género_usuario(usuario){
	var devuelve
	var div =  Array.from(document.querySelectorAll(".chatUsers li"))
		.filter(x=>x.querySelector(".nick").innerHTML==usuario)[0]
	if(div==undefined){
		devuelve = "u"
	}else{
		var clases = Array.from(div.classList)
		var es_hombre = clases.includes("male")
		var es_mujer = clases.includes("female")
		var es_indefinido = !es_hombre && !es_mujer
		devuelve = es_indefinido?"e":es_hombre?"o":es_mujer?"a":"i"
	}
	return devuelve
}
function bbcode_usuario(usuario){
	var color = color_usuario(usuario)
	if(color==undefined){color="000000"}
	return "[b][color=#"+color+"]"+usuario+"[/color][/b]"
}
function mostrar_imágenes(entrada,número,usuario,sala,hacia)
{
	if(puede_mostrar_imágenes)
	{
		if(/\[img\].+\[\/img\]/gi.test(entrada))
		{
			console.log("Se detectó imagen mostrada.",entrada)
			return;
		}
		/*
		if(/suefotos/gi.test(entrada))
		{
			console.log("Se eliminó imagen de subefotos.",entrada)
			return;
		}
		*/
		if(entrada.includes("20abb837a91cf6aa4eb33639f3c9248fo"))
		{
			return;
		}
		if(usuario=="LAMAGDALENA"){return}
		var borrar = true
		entrada = entrada.replace(/\/([^/]+\.com\/)/gi," $1")
		if(entrada[0]=="."){entrada = entrada.slice(1)}
		entrada = entrada.replace("robotos:"," ")
		if((entrada+" ").match(/^([a-zA-Z0-9-_]{11}\s)+$/gi)!=null)
		{
			if(entrada.match(/[ja]+/gi)==null)
			{
				entrada = entrada.replace(/([a-zA-Z0-9-_]{11})/gi," https://www.youtube.com/watch?v=$1")
			}
		}
		var enlaces = detectar_enlaces(entrada)
		var salida = ""
		var puede_enviar = [false,false]
		function env(a){a[0]=true;a[1]=true}
		for(var i in enlaces)
		{
			var actual = enlaces[i]
			var res = actual
			res = res.replace("ugc.kn3.net/i/origin/https","")
			res = res.replace(/#codigos$/gi,"")
			res = res.replace(/subefotos\.com\/ver\/\?/gi,"fotos.subefotos.com/")
			puede_enviar[0] = false
			/*
			if(/akamaihd/gi.test(res))
			{
				env(puede_enviar)
				borrar = false
			}
			*/
			if(/\.(png|jpg|gif)/gi.test(res))
			{
				env(puede_enviar)
				borrar = true
			}
			if(
				res.includes("gstatic.")
				|res.includes("ddn.i.ntere.st")&res.includes("image")
			){
				env(puede_enviar)
			}
			if(res.includes("imgur.com")|res.includes("gyazo.com"))
			{
				if(
					!res.includes("i.")
					&!res.includes(".png")
					&!res.includes(".jpg")
					&!res.includes(".jpeg")
					&!res.includes(".gif")
				){
					res = "i." + res
					env(puede_enviar)
				}
			}
			if(res.includes("giphy.com")&!res.includes("giphy.gif"))
			{
				res = "media.giphy.com/media/" + res.match(/[0-9a-z]+/gi).slice(-1)[0] + "/giphy.gif"
				env(puede_enviar)
			}
			if(res.includes("m.youtube.com"))
			{
				borrar = true
				env(puede_enviar)
				res = "i.ytimg.com/vi/"
					+ res.match(/[a-z0-9-_]+/gi).slice(-1)[0]
					+ "/hqdefault.jpg"
				console.log(actual)
				actual = actual.replace(/^[a-z.]/gi,"youtube.com")
			}else
			{
				if(res.includes("youtube.com"))
				{
					borrar = true
					env(puede_enviar)
					res = "i.ytimg.com/vi/"
						+ res.match(/v=[a-z0-9-_]+/gi)[0].split("=").slice(-1)[0]
						+ "/hqdefault.jpg"
				}
			}
			if(res.includes("youtu.be"))
			{
				res = res.replace(/\?list=[a-zA-Z0-9-_]{11,}/gi,"")
				actual = actual.replace(/\?list=[a-zA-Z0-9-_]{11,}/gi,"")
				borrar = true
				env(puede_enviar)
				res = "i.ytimg.com/vi/"
					+ res.match(/[a-z0-9-_]+/gi).slice(-1)[0]
					+ "/hqdefault.jpg"
				actual = actual.replace(/^[a-z.]+\//gi,"youtube.com/watch?v=")
			}
			if(res.match(/static\d+\.squarespace/gi))
			{
				borrar = true
				env(puede_enviar)
			}
			if(
				res.includes(".png")
				|res.includes(".jpg")
				|res.includes(".jpeg")
				|res.includes(".gif")
			){
				borrar = true
				env(puede_enviar)
			}
			if(puede_enviar[0])
			{
				var protocolo = "http"
				var sitios = [
					["ytimg"]
					,["gstatic","imgur","gyazo","discordapp","pinimg","amazon"]
				]
				for(var j in sitios)
				{
					var actual_2 = sitios[j]
					for(var k in actual_2)
					{
						var actual_3 = actual_2[k]
						if(res.includes(actual_3))
						{
							protocolo = "https"
							borrar = true
							break
						}
					}
				}
				var bool = false
				if(res.includes("gyazo.")
					&!res.includes(".jpg")
					&!res.includes(".gif")
					&!res.includes(".png")
				){
					salida += "[img]"+protocolo+"://"+res+".jpg[/img]"
					salida += "[img]"+protocolo+"://"+res+".gif[/img]"
					salida += "[img]"+protocolo+"://"+res+".png[/img]"
					bool = true
				}
				if(!bool&actual.match(/youtu\.be|youtube\./gi)!=null)
				{
					salida += "[img]"+protocolo+"://"+res+"[/img]\n" + protocolo+"://" + actual + ""
					bool = true
				}
				if(!bool)
				{
					salida += "[img]"+protocolo+"://"+res+"[/img]"
				}
				salida+="\nEnviado por: "+bbcode_usuario(usuario)
			}else
			{
				salida+=res
			}
		}
		var es_40 = document.title=="40 o más"
		if(es_domingo()&es_40)
		{
			//	puede_enviar[1] = false
		}
		if(puede_enviar[1])
		{
			if(borrar){eliminar_mensaje(número,sala)}
			enviar_mensaje(salida,sala,hacia)
		}
	}
}
function activar_ban_37_minutos(){
	if(id_chat>2)
	{
		if(!puede_banear_votos)
		{
			puede_banear_votos=1
			tiempos_votos.map(x=>clearTimeout(x))
			tiempos_votos = []
			enviar_mensaje("El baneo por votos se activó.",sala)
			tiempos_votos.push(setTimeout(()=>{
				if(puede_banear_votos)
				{
					puede_banear_votos=0
					enviar_mensaje("El baneo por votos se desactivó.",sala)
				}
			},1000*60*37))
		}
	}
}
function agregar_voto(nick_votado,nick_votante,ip_votado,ip_votante,sala)
{
	var hecho = false
	if(!inbaneables.includes(ip_votado))
	{
		var coincide_votado = false
		var coincide_votante = false
		var voto_no_camufle = !inhabilitado_banear.includes(ip_votante)
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
		var votado,votos,nombre
		if(!coincide_votante&coincide_votado)
		{
			votado = votados[i]
			votos = votado[2]
			if(voto_no_camufle)
			{
				if(puede_banear_votos&votantes.includes(nick_votante)|!votantes.length)
				{
					votos.push([++id_votación,ip_votante])
				}
			}else
			{
				enviar_mensaje("Los votos de los camufles no valen. (1)",sala)
				banear_según_minutos(nick_votante,0)
				activar_ban_37_minutos()
				hecho = true
			}
		}
		if(!coincide_votante&!coincide_votado&!hecho)
		{
			votos = [[++id_votación,ip_votante]]
			if(voto_no_camufle)
			{
				if( puede_banear_votos & votantes.includes(nick_votante) )
				{
					votados.push([nick_votado,ip_votado,votos])
				}
			}else
			{
				enviar_mensaje("Los votos de los camufles no valen. (2)",sala)
				banear_según_minutos(nick_votante,0)
				activar_ban_37_minutos()
				hecho = true
			}
		}
		if(!hecho)
		{
			if(coincide_votante&coincide_votado)
			{
				enviar_mensaje("Voto inválido.",sala)
			}else
			{
				var nombre = nick_votado
				if(votos.length>=votos_necesarios)
				{
					enviar_mensaje("El usuario "+nombre+" recibió ban.",sala)
					banear_según_minutos(nombre,127,"Votación de usuarios")
					votos.length = 0
				}else
				{
					if(votantes.includes(nick_votante))
					{
						if(!puede_banear_votos)
						{
							enviar_mensaje("El baneo por votos está desactivado.",sala)
						}else{
							enviar_mensaje(nombre+" tiene "+votos.length+" votos.",sala)
						}
					}
				}
			}
		}
		console.log(votados)
		return votados
	}
}
function votar_usuario(datos,nicks_votado,nick_votante,ip_votante,sala)
{
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error)
	{
		var ip_votado = analizado.lastIp
		agregar_voto(nicks_votado,nick_votante,ip_votado,ip_votante,sala)
	}
}
function sumar_voto(datos,nick_votante,hacia,sala)
{
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error)
	{
		var ip_votante = analizado.lastIp
		for(var i in hacia)
		{
			var actual = hacia[i]
			moderar_usuario(actual,x=>votar_usuario(x,actual,nick_votante,ip_votante,sala))
		}
	}
}
function votar_ban(usuario,hacia,sala)
{
	moderar_usuario(usuario,x=>sumar_voto(x,usuario,hacia,sala))
}
function banear_por_votos(entrada,usuario,hacia,sala)
{
	if(sala==1|sala==2)
	{
		sala = sala_ban
	}
	if(entrada.match(/(^\s*ban\s*\s*\d*$)|(^\[b]ban\s*\d*\[\/b]$)/gi)!=null & hacia!=undefined)
	{
		/*
		if(!puede_banear_votos)
		{
			enviar_mensaje("El baneo por votos está desactivado.",sala)
		}
		*/
		//if(puede_banear_votos)
		{
			votar_ban(usuario,hacia,sala)
		}
	}
}
function desbanear_desde_número(número,función)
{
	var chat = location.origin+"/chat/"
	var modo = "unban"
	var fin = "&entries=" + número
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección,función)
}
function unban(función)
{
	var chat = location.origin+"/chat/"
	var modo = "load"
	var fin = "/banlist"
	var dirección = chat + modo + fin
	descargar(dirección,función)
}
function desbanear_usuario(usuario)
{
	var función = function(datos,usuario){
		var html = texto_hacia_html(datos)
		var lista_baneados = Array.from(html.querySelectorAll("label"))
		var ban_analizado = lista_baneados.map(x=>
			{
				var valores = JSON.parse(
					x.textContent.replace(/"/gi,"\\\"").replace(
						/ (.+) hasta (.+) \((.+) minutos\) por (.+), comentario: (.+)/gi
						,"[\"$1\",\"$2\",\"$3\",\"$4\",\"$5\"]"
					)
				)
				return {
					número:+x.querySelector("input").value.match(/\d+/gi),
					baneado: valores[0],
					hasta: new Date(valores[1].replace(/(.+)\/(.+)\/(.+) (.+)/gi,"$2/$1/$3 $4")),
					minutos: +valores[2].replace(".",""),
					baneador: valores[3],
					causa: valores[4]
				}
			}
		)
		var usuario_baneado = ban_analizado.filter(x=>x.baneado==usuario)[0]
		if(usuario_baneado!=undefined)
		{
			desbanear_desde_número(usuario_baneado["número"])
		}
	}
	var función_3 = x=>función(x,usuario)
	unban(función_3)
}
function desbanear(entrada,número,usuario,sala,hacia)
{
	if(sala==1|sala==2)
	{
		sala = sala_ban
	}
	if(entrada.match(/^\s*unban|desban\s*$/gi)!=null)
	{
		for(var i in hacia)
		{
			var actual = hacia[i]
			if(!/b[oòôóö]t/gi.test(actual))
			{
                desbanear_usuario(actual)
			}
		}
	}
}
function eliminar_banes(entrada,número,sala)
{
	var regexp = /^<span class="minor"><a href="#" class="nick" data-nick="(.+)">.+<\/a> baneado hasta (\d{2}\.\d{2}\.\d{4} \d{2}:\d{2})\. Causa: (.+)\. \(<a href="#" class="nick" data-nick="(.+)">.+<\/a>\)<\/span>$/gi
	if(regexp.test(entrada))
	{
		mensajes_entra_sale_ban.push([número,sala])
		eliminar_mensaje(número,sala)
		var array = JSON.parse(entrada.replace(regexp,"[\"$1\",\"$2\",\"$3\",\"$4\"]"))
		var usuario = array[0]
		console.log(array)
		var fecha_desde = new Date()
		var fecha_hasta = new Date(array[1].replace(/\./gi,"/").replace(/^(\d+)\/(\d+)/gi,"$2/$1"))
		var unidad = "segundo"
		var tiempo = (fecha_hasta-fecha_desde)/1000
		if(tiempo>30)
		{
			tiempo/=60; unidad = "minuto"
			if(tiempo>=30)
			{
				tiempo/=60; unidad = "hora"
				if(tiempo>=12)
				{
					tiempo/=24; unidad = "día"
					if(tiempo>=4)
					{
						tiempo/=7; unidad = "semana"
						if(tiempo>=2)
						{
							tiempo/=4; unidad = "mes"
						}
					}
				}
			}
		}
		tiempo = Math.round(tiempo)
		if(tiempo==1)
		{
			tiempo="un"
			if(unidad=="semana"){tiempo+="a"}
			if(unidad=="hora"){tiempo+="a"}
		}else
		{
			unidad+="s"
		}
		if((id_chat!=1)&(id_chat!=2))
		{
			enviar_mensaje(
				"Recibiste ban de " + array[3]
				+ " durante " + tiempo + " " + unidad + ". (" + array[2] + ")",sala_ban,[usuario]
			)
			if(usuario=="ari ☯")
			{
				//desbanear_usuario(usuario)
			}
		}
	}
}
function aleatorio(entero)
{
	return Math.floor(Math.random()*entero)
}
function agregar_avatar(datos,usuario,hacia,sala,i)
{
	var analizado = JSON.parse(datos)
	var actual = hacia[i]
	var identidad
	var hospedaje = "a.chatovod.com"
	var sitio = location.protocol +"//"+ hospedaje
	if(analizado.t!="error")
	{
		identidad = analizado.nickId

	}else{
		var posición = buscar_en_matriz(usuarios,"alias",actual)
		console.log("nick avatar",actual,posición)
		var us_pos = usuarios[posición]
		identidad = us_pos==undefined?"":us_pos.id
	}
	if(identidad!=undefined&!avatar_excluidos.includes(actual))
	{
		enviar_mensaje("[img]"+sitio+"/n/"+identidad+"/d?"+aleatorio(1000)+"[/img]",sala,[usuario,actual],89*i)
	}
}
function mostrar_avatares(entrada,usuario,hacia,sala)
{
	if(puede_mostrar_avatar)
	{
		funciones_avatar = []
		var función_2 = i=>x=>agregar_avatar(x,usuario,hacia,sala,i)
		if( entrada.match(/^avatar\s?[0-9]*$/gi)!=null & hacia!=undefined )
		{
			for(var i in hacia)
			{
				var actual = hacia[i]
				funciones_avatar.push(función_2(i))
				moderar_usuario(actual,funciones_avatar[i],x=>x)
			}
		}
	}
}
function quitar_puntos_números(entrada)
{
	var devuelve = true
	var números = entrada.match(/(\b\d{1,3}(\.\d{3})+\b)/gi)
	if(números==null)
	{
		devuelve = false
	}else{
		var mapa = números.map(x=>x.replace(/\./gi,""))
		for(var i in mapa)
		{
			var regex = new RegExp(números[i],"gi")
			entrada = entrada.replace(regex,mapa[i])
		}
	}
	return [entrada,devuelve]
}
function formatear_número(número)
{
	var devuelve
	var array = []
	var entero = Math.floor(número)+""
	var coma = (""+número%1).slice(2)
	if(!/e\+/gi.test(entero))
	{
		while(entero.length>=3)
		{
			array.unshift(entero.slice(-3))
			entero = entero.slice(0,-3)
		}
		if(entero!=""){array.unshift(entero)}
		devuelve = array.join(".")+(coma==0?"":","+coma)
	}
	else
	{
		devuelve = ""+número
	}
	return devuelve
}
function evaluar_javascript(entrada,usuario,sala,hacia)
{
	var números_en_letras = "cero un ún dos dós tre cua cinc sei séi siete och nueve quin setec novec die once doce trece cat veint ses set noni".split(" ")

	var conv = entrada
	var es_texto = conv.match(/^\s*"[^"]+"\s*$/gi)!=null
	if(es_texto)
	{
		if(sala!=sala){
			enviar_mensaje(conv.replace(/^\s*"([^"]+)"\s*$/gi,"$1"),sala,hacia)
		}
		return;
	}
	else
	{
		hacia = [usuario]
	}
    es_texto = false
	var permite = false
	if(!es_texto)
	{
		conv = conv.replace(/\(?\?/gi,"")
		conv = conv.replace(/\¿/gi,"")
		conv = conv.replace(/^\s*y*\s*?/gi,"")
		if(conv.match(/:[a-z0-9()_ñ]+:/gi)==null)
		{
			conv = conv.replace(/:'3/gi,"")
			conv = conv.replace(/>:v/gi,"")
			conv = conv.replace(/:\S{1,2}/gi,"")
			conv = conv.replace(/\S{1,2}:/gi,"")
		}
		else
		{
			conv = conv.replace(/:[a-z0-9()_ñ]+:/gi,"")
		}
		var símbolos = [
			["¾","3/4"]
			,["?","3/8"]
			,["?","5/8"]
			,["?","5/8"]
			,["²","^2"]

		]
		for(var i in símbolos)
		{
			conv = conv.replace(símbolos[i][0],símbolos[i][1])
		}
		conv = conv.replace(/\bpi\b/gi,"Math.PI")
		conv = conv.replace(/\)([-+0-9]+)/gi,")*$1*")
		conv = conv.replace(/([-+0-9]+)\(/gi,"$1*(")
		conv = conv.replace(/[%÷]/gi,"/")
		conv = conv.replace(/dd/gi,"")
		conv = conv.replace(/xd+/gi,"")
		conv = conv.replace(/x+/gi,"x")
		conv = conv.replace(/\s*=\s*$/gi,"")
		conv = conv.replace(/\.\.+/gi,"")
		var quitar_puntos = quitar_puntos_números(conv)
		conv = quitar_puntos[0]
		conv = conv.replace(/,/gi,"?")
		conv = conv.replace(/\./gi,",")
		conv = conv.replace(/\?/gi,".")
		conv = conv.replace(/\bal\s+cuadrado\b/gi,"^2")
		conv = conv.replace(/\bal\s+cubo\b/gi,"^3")
		conv = conv.replace(/(\d+)\s*((\^)|(a la)|(al))\s*(\d+)/gi,"Math.pow($1,$6)")

		// Palabras
		conv = conv.replace(/^\s*b[aeiouáéíóú]t\b/gi,"")

		conv = conv.replace(/\bwe\b/gi,"")

		conv = conv.replace(/\bmenos\b/gi," - ")
		conv = conv.replace(/\bm[aá]s\b/gi," + ")
		conv = conv.replace(/\bpor\b/gi," * ")
		conv = conv.replace(/\bcu[aá]ntos?\s+es\b/gi,"")
		conv = conv.replace(/\bcu[aá]l\s+es\b/gi,"")
		conv = conv.replace(/\be[sz]\b/gi,"")
		conv = conv.replace(/\b(el)|(la)\b/gi,"")
		conv = conv.replace(/\bentre|dividido(\s+a)?\b/gi,"/")
		if(!conv.includes("=>"))
		{
			conv = conv.replace(/[×x]/gi," * ")
		}
		if(conv.match(/(ra[ií]z)|(log)/gi)!=null)
		{
			conv = conv.replace(/log(()|(2)|(1p)|(10)) (\d+)/gi,"Math.log$1($6)")
			conv = conv.replace(/log(\d+)\s+(\d+)/gi,"Math.log($2)*Math.log(Math.E)/Math.log($1)")
			conv = conv.replace(/\bra[ií]z\s+c[uú]bica\s+(de\s+)?(\d+)/gi,"+Math.pow($2,1/3).toFixed(14)")
			conv = conv.replace(/\bra[ií]z(\s+cuadrada)?\s+del?\s+(\d+([.,]\d+)?)\b/gi,"Math.sqrt($2)")
			quitar_puntos[1] = false
		}
		var está_convertido = false
		var convertido
		if(conv.match(/^decir\s+\d+$/gi)!=null)
		{
			var conv_orig = conv
			conv = "\""+númeroHaciaLetras(conv.match(/\d+/gi).join(""))+"\""
			quitar_puntos[1] = false
			está_convertido = true
			if(conv_orig!=conv)
			{
				permite = true
			}
		}
		if(!está_convertido)
		{
			if(conv.match(/^[a-z\sáéíóú]+.?$/gi)!=null)
			{
				conv_orig = conv
				convertido = "\""+formatear_número(letrasHaciaNúmero(
					conv.match(/[a-z\s.áéíóú]+/gi).join(" ")
				).replace(/\./gi,""))+"\""
				if(convertido!="\"0\""|convertido=="\"0\""&conv.match(/cero/gi)!=null)
				{
					conv = convertido
					quitar_puntos[1] = false
					está_convertido = true
					if(conv_orig!=conv)
					{
						permite = true
					}
				}
			}
		}
	}
	if(conv!="")
	{
		var resultado = ""
		try{
			resultado = eval(conv)
			if(
				typeof resultado != "function"
				& typeof resultado != "object"
				& typeof resultado != "undefined"
				& typeof resultado != "boolean"
				& !(resultado+"").includes("NaN")
				& entrada.match(/^\s*oh\s*$/)==null
			){
				if( typeof resultado == "string" & sala!=sala & !permite )
				{
					permite = true
					sala = sala
				}
				if(quitar_puntos[1]|isFinite(resultado))
				{
					resultado = +(+resultado).toFixed(14)
					resultado = formatear_número(""+resultado)
					permite = true
				}
				if(resultado.includes("undefined"))
				{
					enviar_mensaje(elemento_aleatorio(error_de_cálculo),sala,hacia)
				}else
				{
					if(permite & resultado!=entrada & resultado!=0)
					{
						enviar_mensaje(resultado,sala,hacia)
					}
				}
			}else{
				//console.log("error",resultado)
			}
		}catch(e)
		{
			// console.log("error 2",resultado)
		}
	}
}
function obtener_GMT(entrada)
{
	var cambio
	if(entrada!=undefined)
	{
		if(entrada.match(/argentina|uruguay/gi)!=null){cambio = -3}
		if(entrada.match(/chile|paraguay|rep[uú]blica dominicana|venezuela/gi)!=null){cambio = -4}
		if(entrada.match(/colombia|m[eé]xico|panam[aá]|per[uú]|ecuador/gi)!=null){cambio = -5}
		if(entrada.match(/guatemala|nicaragua/gi)!=null){cambio = -6}
		// España
		if(entrada.match(/espa[ñn]i?a|spain/gi)!=null){cambio = 2}
		if(entrada.match(/las palmas/gi)!=null){cambio = 1}
		//Otros
		if(entrada.match(/singapur/gi)!=null){cambio = 8}
	}
	return cambio
}
function pedir_la_hora(entrada,usuario,sala,hacia)
{
	var hecho = false
    var mensaje
	if(
		!hecho
		&entrada.match(/\bhora\b/gi)!=null
		&entrada.match(/v[ei]rg[ao]|gil|gay|novi/gi)!=null
	){
		mensaje = "La hora en la que " + elemento_aleatorio(sexo) + " a tu " + elemento_aleatorio(madre)+"."
		enviar_mensaje(mensaje,sala,[usuario])
	}else{
		if(!hecho&entrada.match(/(([qk]u?)|k)h?[eé]?h? h?ora (e[hs]|son)?/gi)!=null)
		{
			mensaje = ""
			var fecha = new Date()
			var hora = fecha.getUTCHours()
			var minutos = dos_dígitos(fecha.getUTCMinutes())
			// Falta: Bolivia, Costa Rica, Cuba, Ecuador, El Salvador, Honduras
			var color = "12aa21"
			var sp = "\n"
			var cambio = obtener_GMT(entrada)
			if(cambio!=undefined)
			{
				mensaje = "Las " + dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
				enviar_mensaje(mensaje,sala,[usuario])
			}else{
				if(
					entrada.match(/ en /gi)!=null
					&entrada.match(/mi pa[íi]s/gi)==null
				){
					mensaje = elemento_aleatorio(desconocimiento)
					enviar_mensaje(mensaje,sala,[usuario])
				}
				else
				{
					operar_perfil(usuario,sala,hacia)
				}
			}
		}
	}
}
function fonetizar_mensaje(entrada,usuario,sala,hacia)
{
	if(entrada.match(/^\s*fon\s+/gi)!=null)
	{
		entrada = entrada.replace(/^\s*fon\s+/gi,"")
		entrada = fonetizar(entrada)
		enviar_mensaje(entrada,sala,[usuario])
	}
}
function color_arcoiris(entrada,número,usuario,sala,hacia)
{
	if(entrada.match(/^\s*color[\s:]+/gi)!=null)
	{
		var transformado = entrada.replace(/^\s*color\s+/gi,"")
		transformado = transformado.replace(/\[\/?b\]/gi,"")
		transformado = /*usuario+": "+*/transformado
		var entrada_color = gradual(0,10,transformado,13,0,1)
		transformado = /*"[b]"+*/entrada_color/*+"[/b]"*/
		enviar_mensaje(transformado,sala,hacia)
		eliminar_mensaje(número,sala)
	}
}
function definir(entrada,usuario,sala)
{
	if(entrada.match(/^\s*definir[\s:]+/gi)!=null)
	{
		entrada = entrada.replace(/^\s*definir\s+/gi,"")
		var partes = entrada.split(/\s+es\s+/gi)
		var palabra = partes[0]
		var definición = partes[1]
		var base_de_datos = localStorage.bot
		enviar_mensaje("Definida la palabra "+palabra,sala)
		enviar_mensaje(entrada,sala)
	}
	var definir = entrada.split(/\s*es\s*/gi)
}
function ban_ip(datos,nombre)
{
	if(id_chat==1|id_chat==2){return;}
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
    var i
	if(no_error)
	{
		var ip_usuario = analizado.lastIp
		var ip_geo_usuario = analizado.lastIpGeo
		var navegador = analizado.lastUserAgent
		var id_cuenta = analizado.accountId
		var no_tiene_cuenta = id_cuenta==undefined
		var no_tiene_país = ip_geo_usuario==undefined
		if(!permitir_kendall)
		{
			if(/jakekendall1\d+@yahoo.com/gi.test(analizado.accountLogin))
			{
				console.log(analizado.accountLogin)
				banear_según_minutos(nombre,1,"Kendall")
			}
		}
		if(no_tiene_país & no_tiene_cuenta)
		{
			if(ip_usuario!=undefined&!inhabilitado_banear.includes(ip_usuario))
			{
				console.log(nombre,ip_usuario,ip_geo_usuario,id_cuenta)
				inhabilitado_banear.push(ip_usuario)
				inhabilitado_banear = inhabilitado_banear.sort()
			}
			activar_ban_37_minutos()
			//banear_según_minutos(nombre,1000,".")
		}
		var causa = "."
		var minutos = 3
		if(!baneados.includes(nombre))
		{
			if(ip_usuario!=undefined)
			{
				var actual
				for(i in ips_ban)
				{
					actual = ips_ban[i]
					if(ip_usuario.includes(actual[0]))
					{
						causa = actual[1]
						minutos = actual[2]
						banear_según_minutos(nombre,minutos,causa)
						console.log(12,actual[0],nombre,minutos,causa)
						baneados.push(nombre)
					}
				}
			}
			if(no_tiene_cuenta)
			{
				console.log(datos,nombre)
				console.log(ip_geo_usuario,nombre)
				if(ip_geo_usuario!=undefined & ban_heurístico)
				{
					for(i in lugares_ban)
					{
						actual = lugares_ban[i]
						if(ip_geo_usuario.includes(actual[0]))
						{
							causa = actual[1]
							minutos = actual[2]
							banear_según_minutos(nombre,minutos,causa)
							baneados.push(nombre)
							if(privado_moderador)
							{
								enviar_mensaje(".",privado_moderador,[nombre])
							}
						}
					}
				}
				if(navegador!=undefined)
				{
					for(i in navegadores)
					{
						actual = navegadores[i]
						if(navegador.includes(actual[0]))
						{
							causa = actual[1]
							minutos = actual[2]
							banear_según_minutos(nombre,minutos,causa)
							console.log(13,actual[0],nombre,minutos,causa)
							baneados.push(nombre)
						}
					}
				}
			}
		}
		if(!sospechosos.includes(nombre))
		{
			if(ip_geo_usuario==undefined)
			{
				//enviar_mensaje("Posible camuflado.",1,0,[nombre])
				sospechosos.push(nombre)
			}
		}
	}
}
function banear_ip(nombre)
{
	moderar_usuario(nombre,x=>ban_ip(x,nombre))
}
function activar_ban(nombre,sala)
{
	var usuarios_activar_ban = ["JΘSЄ", "chiripiorca", "kendall", "randall"]
	if(sala==1|sala==2)
	{
		sala = sala_ban
	}
	for(var i in usuarios_activar_ban)
	{
		var actual = usuarios_activar_ban[i]
		var reg_exp = new RegExp(actual,"gi")
		if(reg_exp.test(nombre))
		{
			activar_ban_37_minutos()
			break
		}
	}
}
function agregar_info(datos,usuario,hacia,sala,i)
{
	var analizado = JSON.parse(datos)
	var actual = hacia[i]
	var identidad
	if(analizado.t!="error")
	{
		var mensaje = Object.keys(analizado).map(x=>analizado[x]).join(" ")
		enviar_mensaje(mensaje,sala,actual,89*i)
	}else{
		;
	}
}
function obtener_moderación(entrada,usuario,sala,hacia)
{
	funciones_avatar = []
	var función_2 = i=>x=>agregar_info(x,usuario,hacia,sala,i)
	if(/^\s*mod\s*\d*\s*$/gi.test(entrada) & sala!=1 & sala!=19491 & puede_obtener_info )
	{
		for(var i in hacia)
		{
			var actual = hacia[i]
			funciones_avatar.push(función_2(i))
			moderar_usuario(actual,funciones_avatar[i],x=>x)
		}
	}
}
function etiquetar_nick(entrada,usuario,sala,hacia)
{
	var regex = /^\s*tag\s*(.+)\s*$/gi
	if(regex.test(entrada))
	{
		var nick = entrada.replace(regex,"$1")
		enviar_mensaje(""+aleatorio(100),sala,[nick],1)
	}
}
function borrar_nombre_de_idos(nombre){
	return [delete entrados[nombre],delete idos[nombre]]
}
function saludar(datos,nombre)
{
	/*	
		nick	ArtEze
		t	ue
		c	176ed7
		tc	75841f
		sx	2
		as	//a.chatovod.com/n/4814889/a?1554177053
		id	4814889
		g	moderator
	*/
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error)
	{
		window.tiempo_espera_saludo = 300
		setTimeout(()=>{
			var género = género_usuario(nombre)
			var nombre_bbcode = bbcode_usuario(nombre)
			var nombre_chat = document.querySelector(".text").textContent
			var nombre_chat_negrita = "[b][color=#123456]"+nombre_chat+"[/color][/b]"
			window.mensaje_bienvenida = "¡Bienvenid" + género + " "
				+ nombre_bbcode + "! "
				+ "¡Esto es "+ nombre_chat_negrita +"!";
			console.log(window.mensaje_bienvenida)
		},window.tiempo_espera_saludo)
		entrados[nombre] = 1
		localStorage.setItem("entrados",JSON.stringify(entrados))
		setTimeout(
			()=>enviar_mensaje(window.mensaje_bienvenida,1),
			Math.floor(Math.random()*1000*60*3+window.tiempo_espera_saludo)
		)
	}
}
function buscar_google(entrada,usuario,sala,hacia)
{
	var regex = /^\s*google\s+(.+)/gi
	if(regex.test(entrada) & puede_buscar_google )
	{
		var búsqueda = entrada.replace(regex,"$1")
		var dirección = "//www.google.com.ar/search?q="
		if(/".+"/gi.test(búsqueda))
		{
			dirección+= búsqueda
		}else
		{
			dirección+= "%22" + búsqueda + "%22"
		}
		dirección+="&num=10&newwindow=1&source=hp&ei=-cWSW_yJGojAwATLnrroBQ"
			+"&gs_l=psy-ab."
			+"3...2147.2653.0.3035.5.4.0.0.0.0.0.0..0.0....0...1c.1.64."
			+"psy-ab..5.0.0.0...0.7RIOSMCLgmc"
		descargar(dirección,x=>{
			var r = 0
			var html = texto_hacia_html(x)
			var resultado = html.querySelectorAll(".srg>.g")
			var mensaje = Array.from(resultado).slice(0,5).map(x=>{
				var título = x.querySelector("h3").textContent
				var enlace = x.querySelector("a").href
				var enlace = (++r)+" [url="+enlace+"]"+título+"[/url]"
				return enlace
			}).join("%0a")
			enviar_mensaje(mensaje,sala,hacia)
		})
	}
}
function lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
{
	if(cola.length>0)
	{
		var actual = cola.shift()
		if(window.regex_lightshot.test(actual)){
			descargar(actual,x=>{
				var html = texto_hacia_html(x)
				var resultado = html.querySelectorAll(".image-info-item a")[2].href.split("=")[1]
				salida.push("[img]"+resultado+"[/img]")
				lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
			})
		}else{
			salida.push(actual)
			lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
		}
	}else
	{
		var mensaje = salida.join("")
		mensaje+="\nEnviado por: "+bbcode_usuario(usuario)
		enviar_mensaje(mensaje,sala,hacia)
		eliminar_mensaje(número,sala)
	}
}
function descargar_lightshot(entrada,número,usuario,sala,hacia)
{
	window.regex_lightshot = /(https?:\/\/(prnt.sc|prntscr.com)\/[0-9a-z]{6})/gi
	if(window.regex_lightshot.test(entrada) & puede_descargar_lightshot )
	{
		var salida = []
		var descargado = 0
		var cola = entrada.replace(window.regex_lightshot,"{$1}").split(/[{}]/gi)
		lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
	}
}
function entrar(es_entrar,nombre,función)
{
	if(función==undefined)
	{
		función = x=>console.log(x)
	}
	if(nombre==undefined)
	{
		nombre = obtener_nombre_propio()
	}
	var chat = location.origin+"/chat/"
	var modo = es_entrar?"auth":"signOut"
	var fin
	if(es_entrar)
	{
		fin = "&nick="+nombre
	}else
	{
		fin = ""
	}
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	if(puede_entrar&es_entrar|!es_entrar)
	{
		descargar(dirección,función)
	}
}
function entrar_o_salir(entrada)
{
	if(id_chat!=1&id_chat!=2)
	{
		var función
		var regexp = /^\s*vuelve en (\d+) segundos?\s*$/gi
		if(regexp.test(entrada))
		{
			función = entrada=>{
				var tiempo = +entrada.replace(regexp,"$1")
				setTimeout(()=>{
					puede_entrar=1
					entrar(1)
				},tiempo*1000)
			}
			puede_entrar=0
			entrar(0,undefined,()=>función(entrada))
		}
		if(/^\s*entrar\s*/gi.test(entrada))
		{
			puede_entrar=1
			entrar(1)
		}
		if(/^\s*salir\s*/gi.test(entrada))
		{
			puede_entrar=1
			entrar(0)
		}
		regexp = /^\s*nick\s+(.+)\s*$/gi
		if(regexp.test(entrada))
		{
			función = entrada=>{
				var nombre = entrada.replace(regexp,"$1")
				entrar(1,nombre)
			}
			puede_entrar=1
			entrar(0,undefined,()=>función(entrada))
		}
	}
}
function agregar_mensaje(mensaje)
{
	var posición = buscar_en_matriz(mensajes,1,mensaje)
	if(posición==-1)
	{
		mensajes.push(mensaje)
	}
}
function procesar_mensajes(a,b)
{
	var soy_un_bot = soy_bot()
	if(soy_un_bot){
		if(b.t!="m")
		{
			console.log(misterio,"Error ultra desconocido.")
		}
		var entrada = b.m
		var número = b.ts
		var usuario = b.f
		var sala = b.r
		var hacia = b.to
		var es_nuevo = !b.s
		var es_privado_nuevo = !!b.u

		if(hacia==undefined){hacia=[]}
		var emisor_no_soy_yo = !regularizar_texto(obtener_nombre_propio()).test(usuario)
		var mensaje = [entrada,número,usuario,sala,hacia]

		if(es_privado_nuevo)
		{
			if(emisor_no_soy_yo)
			{
				var html = document.createElement("div")
				html.innerHTML = JSON.stringify(mensaje)
				// document.querySelectorAll(".chatMessages")[0].appendChild(html)			
			}
			mensajes_privados.push(mensaje)
			//console.log("Es privado.",es_privado_nuevo,"b.u",b.nh,b.s)
		}
		agregar_mensaje(mensaje)
		if(es_nuevo)
		{
			if(emisor_no_soy_yo)
			{
				// Ordenado por prioridad
				eliminar_y_banear_otro_chat	(entrada,usuario,número,sala)
				eliminar_y_banear_18		(entrada,usuario,número,sala)
				eliminar_palabras			(entrada,número,sala)
				eliminar_banes				(entrada,número,sala)

				// Segundo orden
				desbanear					(entrada,número,usuario,sala,hacia)
				banear_por_votos			(entrada,usuario,hacia,sala)
				martillo					(entrada,número,sala)
				patear_a_todos				(entrada,número,usuario,sala,hacia)
				patear_usuarios				(entrada,número,usuario,sala,hacia)
				esperar_confirmación_patear	(entrada,número,usuario,sala,hacia)
				entrar_o_salir				(entrada)
				interruptor_ban				(entrada,usuario,sala,hacia)

				//Tercer orden
				mostrar_avatares			(entrada,usuario,hacia,sala)
				obtener_info				(entrada,usuario,sala,hacia)
				obtener_moderación			(entrada,usuario,sala,hacia)
				etiquetar_nick				(entrada,usuario,sala,hacia)
				mostrar_imágenes			(entrada,número,usuario,sala,hacia)
				color_arcoiris				(entrada,número,usuario,sala,hacia)
				evaluar_javascript			(entrada,usuario,sala,hacia)
				pedir_la_hora				(entrada,usuario,sala,hacia)
				fonetizar_mensaje			(entrada,usuario,sala,hacia)
				horóscopo					(entrada,usuario,sala,hacia)
				buscar_google				(entrada,usuario,sala,hacia)
				descargar_lightshot			(entrada,número,usuario,sala,hacia)
				definir						(entrada,usuario,sala)
			}
		}
	}
}
function entrar_y_salir(a,b,c)
{
	var soy_un_bot = soy_bot()
	if(soy_un_bot){
		if(b.includes("changed"))
		{
			var b_t = b.replace(
				/^tab changed to (.+)\[(\d+)\], (false|true|undefined), (false|true|undefined)$/gi,"[\"$1\",$2,$3,$4]"
			)
			var sala
			try{
				sala = eval(b_t)
			}catch(e){
				console.log("Error: No se pudo evaluar",b_t)
			}
			var nombre = sala[0]
			var posición = buscar_en_matriz(salas,0,nombre)
			if(posición==-1)
			{
				salas.push(sala.slice(0,2).concat(-1))
			}else
			{
				salas[posición][1]=sala[1]
			}
			sala_visible = sala[1]
		}
		var info = b.split(" ")
		var entrada = info[0]
		entrada = entrada=="enter"?1:entrada=="leave"?0:-1
		var nombre = info.slice(1).join(" ")
		var mensaje;
		if(entrada>=0)
		{
			var fecha = new Date()
			var tiempo = fecha.getHours()
				+":"+((fecha.getMinutes()+100)+"").slice(1)
				+":"+((fecha.getSeconds()+100)+"").slice(1)
			if(entrados[nombre]==undefined){entrados[nombre] = 0}
			if(idos[nombre]==undefined){idos[nombre] = 0}
			if(entrada==1)
			{
				entrar_salir.push([1,nombre,tiempo])
				//banear_ip(nombre)
				//activar_ban(nombre,sala_ban)
				if(entrados[nombre]==0){
					moderar_usuario(nombre,x=>saludar(x,nombre))
				}
			}else{
				entrar_salir.push([0,nombre,tiempo])
				if(idos[nombre]==0)
				{
					mensaje = "¡Qué mal que te vayas " + bbcode_usuario(nombre) + "! ¡Te extrañaremos, vuelve pronto! :3"
					idos[nombre] = 1
					setTimeout(()=>enviar_mensaje(mensaje,1),Math.floor(Math.random()*1000*60*2))
				}
			}
		}
	}else{
		if(a.value>=lc(this).value)for(a=this.Dq(a,b,c),b="log:"+a.Rn,p.console&&(p.console.timeStamp?p.console.timeStamp(b):p.console.markTimeline&&p.console.markTimeline(b)),p.msWriteProfilerMark&&p.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.xg)for(var e=0,g=void 0;g=c.xg[e];e++)g(d);b=b.getParent()}
	}
}
function registrar_los_pedidos(a,b)
{
	var pedido = [a,b]
	pedidos.push(pedido)
	if(a.url=="/chat/openPrivate2")
	{
		var nombre = a.data.nick
		var posición = buscar_en_matriz(salas,0,nombre)
		if(posición==-1)
		{
			salas.push([nombre,-1,1])
		}else
		{
			salas[posición][2]=1
		}
	}
}
function activar_bot_2()
{
	cc.prototype.log = entrar_y_salir
	modificar_función(mh,registrar_los_pedidos,false)
	modificar_función(yq,procesar_mensajes,false)

/*
nick	ArtEze
t	ue
c	176ed7
tc	75841f
sx	2
as	//a.chatovod.com/n/4814889/a?1554177053
id	4814889
g	moderator
*/

	ch.prototype.Rj = function ()
	{
		var soy_un_bot = soy_bot()
		if(soy_un_bot){
			// console.log(this,"\n",this.Ak,"\n",this.Ve,"\n",this.rr,"fin")
			if(this.Ve)
			{
				// console.log(this.Cc == Cg.prototype)
				this.Cc.send(this.Ak + '?_=' + this.rr++, 'GET')
			}else{
				console.log("Error desconocido.")
			}
		}else{
			this.Ve&&this.Cc.send(this.Ak+"?_\x3d"+this.rr++,"GET")
		}
	}
	window.eliminados=[]
	Bq=function(a,b){
		var soy_un_bot = soy_bot()
		if(soy_un_bot){
			if(b.t=="md")
			{
				for(var i in b.ts)
				{
					var mensaje = mensajes[mensajes.map(x=>x[1]).indexOf(b.ts[i])]
					eliminados.push(mensaje)
				}
			}
			var c=a.I["room"+b.r],d=b.ts;
			z(Sd("chatMessage",c),function(a){var b=U(a,"ts");
			b&&Ta(d,b)&&de(a)});
			hi(U(c,"chatovodScrollBar"))
		}else{
			var c=a.I["room"+b.r],d=b.ts;z(Sd("chatMessage",c),function(a){var b=U(a,"ts");b&&Ta(d,b)&&de(a)});hi(U(c,"chatovodScrollBar"))
		}
	}
	window.elim = ()=>eliminados.filter(x=>x).map(x=>x[2]+": "+x[0]).join("\n")
	if(id_chat==3)
	{
		setTimeout(decir_la_hora,aleatorio_hora())
	}
}
function permanecer_conectado()
{
	activar_bot_2()
}
var tiempos = {}
var objetos = ["flood"]
for(var i in objetos)
{
	var actual = objetos[i]
	window[actual] = {}
}
var navegadores = [
	/*
	[
		"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1"
		,".."
		,1000
	]
	[
		"Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0"
		,"Posible intruso"
		,1777
	],
	*/
	[
		"Mozilla/5.0 (Linux; Android 5.1.1; SM-J200M Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.137 Mobile Safari/537.36"
		,"Sea bienvenido, espere un minuto"
		,1
	]
	/*
	,[
		"SM-J200M Build/LMY47X"
		,"Bienvenido, espere un minuto"
		,1
	]
	*/
]
var ips_ban = [
	["23.27.45","San José",100]
	,["190.183.212","BUDIN CON CHISPAS",44640]
	,["185.233","-",44640]
	,["185.234","-",44640]
	//,["186.134.90.106","Agustín",10080]
]
var objetos = [
	"entrados", "idos"
]
for(var i in objetos)
{
	var actual = objetos[i]
	window[actual] = {}
}
var arrays = [
	"votados", "mensajes", "entrar_salir",
	,"mensajes_entra_sale_ban", "baneados", "sospechosos"
	,"inhabilitado_banear", "votantes", "tiempos_votos", "salas"
	,"pedidos","mensajes_privados","usuarios_a_patear"
]
for(var i in arrays)
{
	var actual = arrays[i]
	window[actual] = []
}
var valores = [
	 [0,"id_votación"],[1,"sala"]
	,[1,"sala_ban"],[1,"sala_visible"],[0,"id_chat"]
	,[4,"votos_necesarios"],[undefined,"privado_moderador"]

	,[0,"puede_patear"],[0,"puede_banear_votos"],[0,"ban_heurístico"]
	,[1,"puede_obtener_info"],[1,"permitir_kendall"]
	,[1,"puede_banear_18"],[1,"puede_buscar_google"],[1,"puede_descargar_lightshot"],[new DOMParser(),"domparser"]
	,[1,"puede_entrar"],[1,"puede_mostrar_imágenes"]
	,[1,"puede_mostrar_avatar"],[1,"puede_patear_usuarios"],[0,"big_bang_activado"]
	,[0,"esperar_confirmar_patear"]
]
for(var i in valores)
{
	var actual = valores[i]
	window[actual[1]] = actual[0]
}
if(window["usuarios"]==undefined)
{
	usuarios = [
		{alias:"♠~мℓ~♠",id: 5191789}
		,{alias:"☪~RL~☪",id: 5039037}
	]
}
var chats = [
	/*
		sala | sala_ban | puede_banear_votos
		ban_heurístico | puede_obtener_info | puede_banear_18
		título
	*/
	 [1, 2,0,0,1,1,"CHAT Argentina - SimpleCHAT"]
	,[1, 3,1,0,1,1,"Sala LIBRE"]
	,[1,11,1,0,1,1,"40 o más"]
	,[1, 1,1,1,1,1,"Neko7w7"]
	,[1, 1,1,0,1,0,"Vamoz Lo' Pibe' Chorro'..!"]
]
for(var i in chats)
{
	var actual = chats[i]
	if(actual[6]==document.title)
	{
		id_chat = i
		sala = actual[0]
		sala_ban = actual[1]
		puede_banear_votos = actual[2]
		ban_heurístico = actual[3]
		puede_obtener_info = actual[4]
		puede_banear_18 = actual[5]
	}
}
var inbaneables = [
	"181.230.209.30" // ArtEze
	,"186.18.124.193" // Linka\u2606
	,"190.105.47.16" // Dipper
	,"181.14.239.38" // Leandro
	,"186.128.20.169" // Paula
	,"186.128.20.169" // Paula
]
var lugares_ban = [
	["Fremont","San José",100]
	,["French"         ,"F",500]
	,["United"         ,"N",500]
	,["Republic of"    ,"P",500]
	,["Romania"        ,"O",500]
	,["Canada"         ,"C",500]
	,["Switzerland"    ,"W",500]
	,["Slovakia"       ,"V",500]
	,["Ukraine"        ,"E",500]
	,["Netherlands"    ,"T",500]
	,["Liberia"        ,"I",500]
	,["Munich"         ,"H",500]
	,["Germany"        ,"M",500]
	,["Sweden"         ,"S",500]
	,["France"         ,"R",500]
	,["Buffalo"        ,"B",500]
	,["Anonymous Proxy","X",500]
	,["Hungary"        ,"Y",500]
	,["Czech"          ,"Z",500]
	,["Austria"        ,"A",500]
	,["Winnipeg"       ,"G",500]
	,["Chisinau"       ,"U",500]
	,["Japan"          ,"J",500]
	,["Australia"      ,"L",500]
	,["Korea"          ,"K",500]
	,["Dearborn"       ,"D",500]
	,["Vietnam"        ,"Q",500]
	,["Albania"        ,"Ñ",500]
	,["Tbilisi"        ,"Tbilisi",500]
]
var avatar_excluidos = [
	"Genciita*_*"
	,"nadia"
	,"Maria Luz"
	//,"\u265a\u15ab\u2623\u004c\u03b1\u0443\u006c\u03b1\u2623\u15ad\u265a\u1d60\u1d58\u1d49\u1d49\u1db0" // Layla
	,"OdiosaA"
	,"HerbalLove"
	,"\u2661Luni :3"
	//,"Loolii/lore"
	,"yarispanditabebe15"
]
var info_excluidos = [
	"HerbalLove"
]
var excluidos_patear = [
	"yarispanditabebe15"
	,"mαdєlínє"
	,"ѕσƒι025~\u2661"
]
var desconocimiento = [
	"No lo sé.",
	"No tengo idea.",
	"Realmente yo no lo sé.",
	"¿y yo qué voy a saber?",
	"Solo soy un programa, no me pregunte eso.",
	"Quizás lo sepa otra persona.",
	"No tengo ese conocimiento.",
	"No sé de dónde obtener esa información.",
	"Esa pregunta me parece complicada de responder.",
	"No me programaron para responder eso.",
	"Si tuviera la bola de cristal te lo diría."
]
var error_de_cálculo = [
	"No se ha podido calcular correctamente.",
	"Tuve problemas al realizar la operación que has pedido.",
	"Usted me ha pedido algo que me parece imposible de resolver.",
	"Perdone, pero esa pregunta me parece algo compleja.",
	"Se me dificultó un poco resolver eso, por lo que me he rendido."
]
var no_patear = [
	"Al cabo que ni quería."
	,"Mejor así."
	,"Menos trabajo para mí."
	,"Simón, mejor Nelson."
]
var no_patear_excluido = [
	"Error desconocido."
	,"Circuito desconectado."
	,"El sistema falló."
]
var madre = [ "vieja", "viejo", "madre", "padre", "papá", "mamá", "madrastra", "padrastro", "zorra", "novia", "perrita", "novio", "abuela", "futuro hijo", "futura hija", "amigo de la esquina", "jefe", "jefa", "prima", "abuela", "tía", "tío", "esposa", "esposo", "nieto", "nieta", "tatarabuela", "tatarabuelo", "sobrino", "sobrina", "mujer", "hombre", "bisabuelo", "bisabuela" ]

var sexo = [ "garché", "cojí", "emperné", "empomaba", "empomé", "entubaba", "culeaba", "trinqué", "encamé", "acosté", "conejeaba", "daba matraca", "le estaba enterrando la batata", "mojé el bizcocho", "soplaba la cañita", "sobaba el pirulín", "le regaba la lechuga", "le divertía el pelado", "le germinaba el poroto", "le sacaba las telarañas", "me enflautaba", "fui a echarle un fierro", "le mojé la chaucha", "le pintaba el templo", "le regué la lechuga", "le lustraba la manija", "le destapaba las cloacas", "le limpié el horno" ]

var chats_pablo = [
	"40omas","salalibre","sala50omas","cibersexoo"
]
var lista_signos = [
	"aries","tauro","géminis","cáncer","leo","virgo","libra","escorpio","sagitario","capricornio","acuario","piscis"
]
var signos = []
descargar_votantes()
descargar_horóscopo()
permanecer_conectado()
