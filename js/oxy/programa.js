/*
	Código hecho por Emiliano Ezequiel Parenti

	Las funciones van a declararse con window para que sean funciones globales.
*/

window.x = function(){
	console.log(Array.from(arguments))
}
window.obtener_nombre_propio = function(){
	var devuelve = undefined
	var nombre = localStorage.nick
	if(nombre!=undefined){
		devuelve=JSON.parse(localStorage.nick)
	}
	return devuelve
}
window.soy_bot = function(){
	return obtener.activado.bot()
}
window.estado_conexión = function(){
	var devuelve = -1
	var accountMenu = document.querySelector("#accountMenu")
	var nickMenu = document.querySelector("#nickMenu")
	if(accountMenu==undefined){devuelve-=1}
	if(nickMenu==undefined){devuelve-=2}
	if(devuelve==-1){
		++devuelve
		devuelve+=1*(accountMenu.style.display=="block")
		devuelve+=2*(nickMenu.style.display=="block")
	}
	return devuelve
}
window.está_listo = function(){
	var devuelve = undefined
	var cargado = document.querySelector(".loadingItem")
	if(cargado!=undefined){
		devuelve = cargado.style.display=="none"
	}
	return devuelve
}
window.puedo_enviar_mensajes = function(){
	return window.estado_conexión()==2
}
window.aleatorio = function(){ // Función que intenta reemplazar a Math.random()
	return +Date.now().toString().split("").concat("0.").reverse().join("")
}
window.binario_hacia_entero = function(texto_binario){
	return +"0b0".concat(texto_binario)
}
window.aleatorizar = function(x,debug){
	if(x==0){return 0}
	var binario = x.toString(2)
	var longitud = binario.length
	var número = ""
	var resultado = undefined
	binario = binario.slice(2) + binario.slice(0,-2)
	while( binario.length>0 ){
		var primero = binario.slice(0,1)
		var último = binario.slice(-1)
		/*
		var índice = Math.floor(binario.length/2)
		var centro = binario[índice]
		debug && console.log(último,primero,centro)
		if(centro!==undefined){número+=centro}
		*/
		if(último!==undefined){número+=último}
		if(primero!==undefined){número+=primero}
		//var binario_2 = binario.slice(1,índice) + binario.slice(índice,-1)
		var binario_2 = binario.slice(1,-1)
		binario = binario_2
	}
	resultado = window.binario_hacia_entero(número)%x
	return resultado
}
window.ahora_5_segundos = function(){
	return Math.floor(Date.now()/5000)
}
window.generar_100_aleatorios = function(){
	var a=[]
	var x = ahora_5_segundos()
	for(var i=x;i<x+100;++i){
		a.push(aleatorizar(i))
	}
	return a
}
window.generar_semilla = function(){
	setInterval(function(){
		window.la_semilla = ahora_5_segundos()
	},4999)
}
window.generar_semilla()
window.aleatorio_menor_a = function(x,semilla){
	 // Aleatorio menor a un número.
	var resto_fecha = semilla || window.ahora_5_segundos()
	var aleatorizado = (aleatorizar(resto_fecha))%x
	return aleatorizado
}
window.elemento_aleatorio = function(array){
	array = array.filter(x=>x!=undefined)
	var aleatorio = window.aleatorio_menor_a(array.length)
	return array[aleatorio]
}
window.texto_hacia_html = function(texto){
	return domparser.parseFromString(texto,"text/html")
}
window.descargar = function(dirección,función,error){
	var descarga = new XMLHttpRequest()
	var hecho = false
	descarga.onreadystatechange = function(){
		var descargado = descarga.responseText
		if (descarga.readyState == 4 && descarga.status == 200){
			if(typeof función=="function"){
				función(descarga.responseText)
			}else{
				if(/error/gi.test(descargado)){
					try{
						var analizado = JSON.parse(descargado)
						console.log({d1:analizado})
					}catch(e){
						console.log({d2:descargado})
					}
					hecho = true
				}
				if(/{}/gi.test(descargado) & !hecho){
					/*console.log("correcto",{a:dirección})*/
					hecho = true
				}
				if(!hecho){/*console.log(descargado)*/}
			}
		}else{
			//console.log([4,descarga.readyState],[200,descarga.status])
			if(typeof error=="function"){
				error(descargado)
			}else{
				//console.log({d3:descargado})
			}
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
window.descargar_votantes = function(){
	window.descargar(
		location.origin + "/custom.css?" + Date.now()
		,x=>{
			var lista_votantes=x.match(/=".+"/gi)
			if(lista_votantes!=null){
				votantes=lista_votantes.map(x=>eval("\""+x.slice(2,-1).replace(/\\00/gi,"\\u")+"\""))
			}
		}
	)
}

// https://pastebin.com/vPwXqk2k
window.insertar_textarea = function(texto,d){
	var ta = document.querySelector("textarea")
	ta.value = texto
	ta.disabled = d==undefined?ta.disabled:d==0?true:d==1?false:!ta.disabled
}
window.nick_unicode = function(nombre){
	(x=>{
		var texto = "\\"+x.split("").map(x=>("000000"+x.charCodeAt().toString(16)).slice(-6)).join("\\")
		window.insertar_textarea(texto)
	})(nombre)
}
window.buscar_en_matriz = function(array,columna,valor){
	return array.map(x=>x[columna]).indexOf(valor)
}
window.descargar_horóscopo = function(){
	var función_2 = x=>{
		var html = window.texto_hacia_html(x)
		var nodos = Array.from(
			html.querySelector(".entry-content.clearfix").children
		).map(x=>x.textContent)
		var posiciones = nodos.map(x=>x.split(" ").length==1?x:"")
		
		signos = []
		for(var i in lista_signos){
			var posición = nodos.indexOf(lista_signos[i].toUpperCase())
			signos.push(nodos[posición+1]+"%0a%0a"+nodos[posición+2])
		}
	}
	var función = x=>{
		var html = window.texto_hacia_html(x)
		console.log(html.textContent)
		var dirección = html.querySelector(".post-column.clearfix a")
		var dirección_2 = null
		if(dirección!=null){
			dirección_2 = dirección.href
		}
		if(dirección_2!=null){
			console.log("dir 2: ",dirección)
			dirección = window.anticors+dirección_2.split("//").slice(1).join("//")
			console.log("dir 3: ",dirección)
			window.descargar(dirección,función_2)
		}
	}
	var dirección = window.anticors+"horoscoposocial.com"
	console.log("dir 1: ",dirección)
	window.descargar(dirección,función)
}
window.obtener_CSRF = function(){
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector("script").textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
window.caracteres_hacia_hexadecimal = function(texto){
	var caracteres = ["\\+",":","\n","#","&","\x20","\\*"]
	for(var i in caracteres){
		var actual = caracteres[i]
		var exp = new RegExp(actual,"gi")
		var char_hacia_hex = x=>"%"+("0"+x.slice(-1).charCodeAt().toString(16).toUpperCase()).slice(-2)
		texto = texto.replace(exp,char_hacia_hex(actual))
	}
	return texto
}
window.nombre_es_bot_spam = function(nombre){
	return /^([A-ZÁÀÀÂÉÈËÊÍÌÏÎÓÒÖÔÚÙÜÛÑ][a-záàäâéèëêíìïîóòöôúùüûñ]+){2}\d*$/.test(nombre)
}
window.banear_según_minutos = function(nombre,minutos,causa){
	var chat = location.origin+"/chat/"
	var modo = minutos>=0?"ban":"signOut"
	var fin = ""
	if(minutos>=0){fin+="&roomId=1&nick=" + window.caracteres_hacia_hexadecimal(nombre)}
	if(minutos>0){fin+="&minutes=" + minutos}
	if(causa!=undefined){
		causa = window.caracteres_hacia_hexadecimal(causa)
		fin += "&comment=" + causa
	}
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección,x=>console.log(x))
}
window.moderar_usuario = function(nombre,función,error){
	var chat = location.origin+"/chat/"
	var dirección = chat + "getChatNickLocalModInfo?nick=" + nombre
	if(función==undefined){
		función = x=>{
			var analizado = JSON.parse(x)
			var no_error = +(analizado.t!="error")
			if(no_error){
				console.log(x)
			}
		}
	}
	if(error==undefined){
		//error = x=>console.log(x)
	}
	window.descargar(dirección,función,error)
}
window.callback_eliminar = function(datos){
	var analizado = JSON.parse(datos)
	var error = analizado.t=="error"
	if(error){
		console.log("Hubo un error al eliminar.")
	}
}
window.eliminar_mensaje = function(número,sala){
	var chat = location.origin+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección,x=>window.callback_eliminar(x))
}
window.calcular_luminosidad = function(color){
	var suma = 0
	for(var i in color){
		suma += color[i]
	}
	return suma
}
window.entero_hacia_hexadecimal = function(entero,longitud){
	return ([...Array(longitud)].map(x=>0).join("")+entero.toString(16)).slice(-longitud)
}
window.obtener_color_aleatorio = function(){
	var luminosidad = 255*3
	var color = [255,255,255]
	while(luminosidad>=256*2){
		color = [...Array(3)].map(x=>aleatorio_menor_a(256,++window.la_semilla))
		luminosidad = calcular_luminosidad(color)
	}
	color = color.map(x=>window.entero_hacia_hexadecimal(x,2)).join("")
	return color
}
window.enviar_mensaje = function(mensaje,sala,hacia,tiempo){
	mensaje = window.caracteres_hacia_hexadecimal(mensaje)
	sala = sala==undefined?1:sala
	hacia = hacia==undefined?[]:hacia
	tiempo = tiempo==undefined?0:tiempo
	var chat = location.origin+"/chat/"
	var modo = "send"
	var and = "%26" // &
	var numeral = "%23" // #
	var igual = "%3d" // =
	var espacio_porcentaje = "%20" // %20
	var espacio = "32;" // \x20
	// var reemplazo_espacios = and + numeral + espacio
	var color_aleatorio = window.obtener_color_aleatorio()
	var fin = "&roomId=" + sala + "&msg="
	var una_semilla = window.ahora_5_segundos()
	if( window.aleatorio_menor_a(2,++una_semilla) ){
		//fin += "/me" + espacio_porcentaje
	}
	if( window.aleatorio_menor_a(2,++una_semilla)==0 ){
		fin += window.aleatorio_menor_a(100,++una_semilla).toString() + espacio_porcentaje
	}
	fin += (
		"[color" + igual + numeral + color_aleatorio + "]" 
		+ mensaje.replace(/(%20|\x20)/g,espacio_porcentaje)
		+ "[/color]"
	)
	if( window.aleatorio_menor_a(3,++una_semilla)==0 ){
		fin += espacio_porcentaje + window.aleatorio_menor_a(100,++una_semilla).toString()
	}
	if(hacia.length>0){
		fin+="&to="+hacia
	}
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	setTimeout(()=>window.descargar(dirección),tiempo)
}
window.dos_dígitos = function(número){

	return (número/100).toFixed(2).slice(2)
}
window.obtener_GMT = function(entrada){

	var cambio
	if(entrada!=undefined){
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
window.obtener_país = function(datos,usuario,sala,hacia){
	var html = window.texto_hacia_html(datos)
	var fecha = new Date()
	var hora = fecha.getUTCHours()
	var minutos = window.dos_dígitos(fecha.getUTCMinutes())
	var placeLine = html.querySelector(".placeLine")
	var mensaje
	if(placeLine!=undefined){
		var país = placeLine.textContent.replace(/[\s]/gi,"").split(",")[0]
		var cambio = window.obtener_GMT(país)
		if(cambio!=undefined){
			mensaje = "Las " + window.dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
		}else{
			mensaje = window.elemento_aleatorio(desconocimiento)
		}
	}else{
		mensaje = window.elemento_aleatorio(desconocimiento)
	}
	window.enviar_mensaje(mensaje,sala,[usuario])
}
window.obtener_info = function(entrada,usuario,sala,hacia){
	var enviar_información = function(datos){
		var nombre_info = datos.querySelector(".nick").textContent
		var aboutLine = datos.querySelector(".aboutLine")
		if(aboutLine!=undefined){
			var mensaje = aboutLine.textContent.split(/Acerca de mí:\n\s+/)[1].split(/\s{4,}/)[0]
			if(mensaje.length>200){
				mensaje = mensaje.slice(0,200)
				mensaje += " (...)"
			}
			if(!info_excluidos.includes(nombre_info)){
				window.enviar_mensaje(mensaje,sala,[usuario,nombre_info])
			}
		}
	}
	var accionar_desde_html = function(datos,función){
		var html = window.texto_hacia_html(datos)
		función(html)
	}
	var accionar_desde_identidad = function(identidad,función){
		if(identidad!=undefined){
			var sitio = location.protocol +"//"+location.host
			var dirección = sitio + "/id"+identidad
			window.descargar(dirección,x=>función(x))
		}
	}
	var info = function(datos){
		var analizado = JSON.parse(datos)
		var no_error = analizado.t!="error"
		if(no_error){
			var identidad = analizado.nickId
			accionar_desde_identidad(identidad,x=>accionar_desde_html(x,enviar_información))
		}
	}
	var lista_nombres = usuarios.map(x=>x.alias)
	if(entrada.match(/^\s*info\s*$/gi)!=null){
		for(var i in hacia){
			var actual = hacia[i]
			if(!lista_nombres.includes(actual)){
				window.moderar_usuario(actual,info)
			}else{
				var posición = lista_nombres.indexOf(actual)
				info(JSON.stringify(usuarios[posición]))
			}
		}
	}
}
window.regularizar_texto = function(texto){
	var tildes = [
		"aáäàâ",
		"eéëèê",
		"iíïìî",
		"oóöòô",
		"uúüùû"
	]
	var array = texto.split("")
	for(var i in array){
		for(var j in tildes){
			var texto = "["+tildes[j]+"]"
			var regex = new RegExp(texto,"gi")
			if(regex.test(array[i])){
				array[i] = texto
			}
		}
	}
	var salida = array.join("")
	var regex_2 = new RegExp(salida,"gi")
	return regex_2
}
window.horóscopo = function(entrada,usuario,sala,hacia){
	var mensaje = ""
	var reg = window.regularizar_texto("horóscopo|signo")
	if(reg.test(entrada)){
		for(var i in lista_signos){
			var actual = lista_signos[i]
			var reg = window.regularizar_texto(actual)
			if(reg.test(entrada)){
				mensaje = "[img]http://horoscoposocial.com/wp-content/uploads/2018/06/"+actual+".png[/img] " + signos[i]
			}
		}
		var hacia_2 = hacia.slice()
		hacia_2.unshift(usuario)
		if(mensaje){
			window.enviar_mensaje(mensaje,sala,hacia_2)
		}
	}
}
window.interruptor_ban = function(entrada,usuario,sala,hacia){
	if(entrada.match(/^\s*activar\s*$/gi)!=null){
		puede_banear_votos ^= 1
		var hacia_2 = hacia.slice()
		hacia_2.unshift(usuario)
		var salas_activar_ban = [sala,sala_ban]
		for(var i in salas_activar_ban){
			window.enviar_mensaje("El ban está "+(puede_banear_votos?"":"des")+"activado.",salas_activar_ban[i],i?[]:hacia_2)
		}
	}
}
window.patear_futuro = function(usuarios){
	var funciones = []
	var vips = Array.map(document.querySelector(".chatUsers").querySelectorAll(".vip"),x=>x.textContent)
	var función = (actual,vips)=>()=>{
		if(puede_patear & !vips.includes(actual) & !excluidos_patear.includes(actual)){
			if(id_chat<1|id_chat>2){
				window.banear_según_minutos(actual,0)
			}
		}
	}
	for(var i in usuarios){
		var actual = usuarios[i]
		funciones[i] = función(actual,vips)
		var intervalo = setTimeout(funciones[i],2*42*(i+1))
	}
}
window.array_eliminar_duplicados = function(array){
	var resultado = []
	for(var i in array){
		if(!resultado.includes(array[i])){
			resultado.push(array[i])
		}
	}
	return resultado
}
window.patear_a_todos = function(entrada,número,usuario,sala,hacia){
	var array_nicks = Array.from(document.querySelectorAll(".chatUsers .nick"))
	var nicks_textos = window.array_eliminar_duplicados(array_nicks.map(x=>x.textContent))
	var soy_un_bot = window.regularizar_texto(window.obtener_nombre_propio()).test(hacia)
	if(soy_un_bot){
		if(big_bang_activado){
			if(entrada.match(/^\s*big\s*bang\s*$/gi)!=null){
				setTimeout(()=>window.enviar_mensaje("[size=30][b]Atención: Todos serán pateados. [/b][/size] >:) ",sala),10000)
				setTimeout(()=>window.patear_futuro(nicks_textos),20000)
				puede_patear = 1
				window.eliminar_mensaje(número,sala)
			}
			if(entrada.match(/^\s*detener\s*$/gi)!=null){
				var suerte = window.aleatorio_menor_a(3)!=0
				if(suerte){
					window.enviar_mensaje("[size=20][b]El pateo ha sido detenido.[/b][/size]",sala)
					puede_patear = 0
				}else{
					window.enviar_mensaje("[size=20][b]Es imposible detener el pateo.[/b][/size]",sala)
				}
				window.eliminar_mensaje(número,sala)
			}
		}
	}
}
window.usuario_está_presente = function(usuarios){
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
window.patear_usuarios = function(entrada,número,usuario,sala,hacia){
	var soy_un_bot = window.soy_bot()
	if(soy_un_bot){
		if(/^\s*patear\s*$/gi.test(entrada)){
			if(hacia.length==0){
				puede_patear_usuarios ^= 1
			}else{
				if(puede_patear_usuarios && !esperar_confirmar_patear){
					// window.eliminar_mensaje(número,sala)
					window.usuarios_a_patear = hacia
					window.enviar_mensaje("¿Realmente quieres patear?",sala,usuario)
					window.usuario_pateador = usuario
					setTimeout(()=>window.esperar_confirmar_patear=0,40*1000)
					window.esperar_confirmar_patear = true
				}
			}
		}
	}
}
window.patear_usuarios_seleccionados = function(usuario,sala){
	window.esperar_confirmar_patear=0
	var patear_seleccionado = []
	for(var i in window.usuarios_a_patear){
		var pateado = window.usuarios_a_patear[i]
		patear_seleccionado[i] = Function("window.banear_según_minutos('"+pateado+"',0)")
		if(window.excluidos_patear.includes(window.usuario_pateador)){
			setTimeout(patear_seleccionado[i],50*i)
		}
		else{
			if(window.excluidos_patear.includes(pateado)){
				window.enviar_mensaje(window.elemento_aleatorio(no_patear_excluido),sala,[usuario])
			}else{
				setTimeout(patear_seleccionado[i],50*i)
			}
		}
	}
	window.usuarios_a_patear=[]
}
window.esperar_confirmación_patear = function(entrada,número,usuario,sala,hacia){
	if(window.esperar_confirmar_patear==1){
		if(usuario==window.usuario_pateador){
			if(/^\s*(pues)*.*((\s*s[iíïìî]p?)|(obvio)).*\s*$/gi.test(entrada)){
				window.patear_usuarios_seleccionados(usuario,sala)
			}
			if(/^\s*n[oóöòô]p?.*\s*$/gi .test(entrada)){
				window.esperar_confirmar_patear=0
				window.usuarios_a_patear=[]
				window.enviar_mensaje(window.elemento_aleatorio(no_patear),sala,usuario)
			}
		}
	}
}
window.pedir_hora_usuario = function(datos,usuario,sala,hacia){
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error){
		var identidad = analizado.nickId
		var sitio = location.protocol +"//"+location.host
		var dirección = sitio + "/id"+identidad
		var mensaje
		if(identidad!=undefined){
			console.log(dirección)
			window.descargar(dirección,x=>window.obtener_país(x,usuario,sala,hacia))
		}else{
			mensaje = window.elemento_aleatorio(desconocimiento)
			window.enviar_mensaje(mensaje,sala,[usuario])
		}
	}
}
window.operar_perfil = function(usuario,sala,hacia){
	window.moderar_usuario(usuario,(datos)=>window.pedir_hora_usuario(datos,usuario,sala,hacia))
}
window.aleatorio_hora = function(){
	// 1 minuto + 8 horas
	return (10**3) * ( 1+aleatorio_menor_a(60**2*8) )
}
window.decir_la_hora = function(){
	var soy_un_bot = window.soy_bot()
	if(soy_un_bot){
		var fecha = new Date()
		var hora = fecha.getUTCHours()
		var minutos = window.dos_dígitos(fecha.getUTCMinutes())
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
		for(var i in array){
			mensaje+=window.dos_dígitos((hora+24+array[i][0])%24)+":"+minutos+" "+array[i][1]+(i%2==0?(i!=array.length-1?sp+co:""):ci+sp)
		}
		mensaje+=v
		window.enviar_mensaje(mensaje)
		var tiempo = window.aleatorio_hora()
		setTimeout(window.decir_la_hora,tiempo)
	}
}
window.coinciden_palabras_or = function(entrada,palabras){
	var exp = new RegExp("\\b"+palabras.join("|")+"\\b","gi")
	return exp.test(entrada)
}
window.coinciden_palabras_and = function(entrada,palabras){
	var coincide = false
	for(var i in palabras){
		coincide = true
		for(var j in palabras[i]){
			var exp = new RegExp("\\b"+palabras[i][j]+"\\b","gi")
			if(!exp.test(entrada)){coincide = false;break}
		}
		if(coincide){break}
	}
	return coincide
}
window.eliminar_palabras = function(entrada,número,sala){
	var palabras_or = ["martillo"]
	var palabras_and = ["martillo","martillo"]
	if(
		window.coinciden_palabras_or(entrada,palabras_or)
		|window.coinciden_palabras_and(entrada,palabras_and)
	){
		window.eliminar_mensaje(número,sala)
	}
	if(entrada.includes("\u1ecf\u0337\u0356\u0348\u031e\u0329")&entrada.length>500){
		window.eliminar_mensaje(número,sala)
	}
}
window.martillo = function(entrada,número,sala){
	if(/\b[aeiou]*m[aeiou]+rt[aeiou]+(ll|y|sh).*[aeiou]+[ns]?\b/gi.test(entrada)){
		window.eliminar_mensaje(número,sala)
	}
}
window.eliminar_y_banear_18 = function(entrada,usuario,número,sala){
	if(!puede_banear_18){return;}
	var palabras_or = ["sexy?","adult","fuck","video chat","rape","dating site"]
	if(window.coinciden_palabras_or(entrada,palabras_or)&/https?:\/{2}/gi.test(entrada)){
		window.eliminar_mensaje(número,sala)
		window.banear_según_minutos(usuario,44640,"+18")
	}
	/*
	if(usuario.includes("enga")){
		window.eliminar_mensaje(número,sala)
		window.banear_según_minutos(usuario,34,"-.-")
		baneados.push(usuario)
	}
	*/
}
window.banear_flood = function(entrada,usuario,número,sala){
	var mensaje_y_fecha = {}
	var array = [
		/^\d{9,10}$/gi.test(entrada)
		,/hola/gi.test(entrada)
	]
	// Uno para cada condición
	if(flood[usuario]==undefined){
		flood[usuario]=[[],0,0]
	}
	for(var i in array){
		if(array[i].test(entrada)){
			flood[usuario][0].push([número,sala,+new Date()])
			++flood[usuario][i+1]
			if(flood[usuario][i+1]>=2){
				window.banear_según_minutos(usuario,7,"Flood")
				for(var j in flood[usuario][0]){
					var mensaje = flood[usuario][0][j]
					window.eliminar_mensaje(...mensaje)
				}
			}
		}
	}
}
window.comprobar_otro_chat = function(entrada){
	var contador = 0
	var permitidos = ["a","st1","coins","help","account","admin"]
	permitidos.unshift(location.host.split(".")[0])
	entrada = entrada.replace(/\[\/?img\]/gi,"")
	var chats = entrada.match(/\b\S+\.chatovod.com\b/gi)
	if(chats==null){chats=[]}
	//console.log(chats)
	for(var i in chats){
		var actual = chats[i]
		actual = actual.replace(/^https?:\/\//,"")
		for(var j in permitidos){
			var actual_2 = permitidos[j]
			if(actual==actual_2+".chatovod.com"){
				++contador
			}
		}
	}
	var borrar = contador < chats.length
	if(id_chat==1|id_chat==2){
		var regexp = new RegExp(chats_pablo.join("|"),"gi")
		if(regexp.test(entrada)){borrar=false}
	}
	return borrar
}
window.eliminar_y_banear_otro_chat = function(entrada,usuario,número,sala){
	var borrar = window.comprobar_otro_chat(entrada)
	if(entrada.includes("wixsite")){borrar=true}
	if(borrar){
		window.eliminar_mensaje(número,sala)
		if(usuario!="asdfg"){
			window.banear_según_minutos(usuario,44640,"Pasar chat")
		}else{
			window.enviar_mensaje("Has sido perdonado.",sala,[usuario])
		}
	}
}
window.detectar_enlaces = function(entrada){
	entrada = entrada.replace(/https?:\/\//gi,"")
	entrada = entrada.replace(/%3A/gi,":")
	entrada = entrada.replace(/%2F/gi,"/")
	var enlaces = entrada.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)
	return enlaces
}
window.es_domingo = function(){
	return new Date().getDay() == 0
}
window.color_usuario = function(usuario){
	var devuelve
	var divs = Array.from(
		document.querySelectorAll(".nick[data-nick]")
	).map(x=>[x,x.attributes["data-nick"].value])
	.filter(x=>x[1]==usuario).map(x=>x[0]);
	//console.log(divs)
	if(divs[0]==undefined){
		devuelve = "000000"
	}else{
		devuelve = divs[0]
			.style
			.color
			.split(/[(),]/gi)
			.slice(1,-1)
			.map(x=>("0"+(+x).toString(16)).slice(-2))
			.join("")
		;
	}
	return devuelve
}
window.género_usuario = function(usuario){
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
window.bbcode_usuario = function(usuario){
	var color = window.color_usuario(usuario)
	if(
		   color==undefined
		|| color==""
		|| color=="000000"
	){
		color = window.obtener_color_aleatorio()
	}
	return "[i][b][color=#"+color+"][code]"+usuario+"[/code][/color][/b][/i]"
}
window.mostrar_imágenes = function(entrada,número,usuario,sala,hacia){
	if(puede_mostrar_imágenes){
		if(/\[img\].+\[\/img\]/gi.test(entrada)){
			console.log("Se detectó imagen mostrada.",entrada)
			return;
		}
		/*
		if(/suefotos/gi.test(entrada)){
			console.log("Se eliminó imagen de subefotos.",entrada)
			return;
		}
		*/
		if(entrada.includes("20abb837a91cf6aa4eb33639f3c9248fo")){
			return;
		}
		if(usuario=="LAMAGDALENA"){return}
		var borrar = true
		entrada = entrada.replace(/\/([^/]+\.com\/)/gi," $1")
		if(entrada[0]=="."){entrada = entrada.slice(1)}
		entrada = entrada.replace("robotos:"," ")
		if((entrada+" ").match(/^([a-zA-Z0-9-_]{11}\s)+$/gi)!=null){
			if(entrada.match(/[ja]+/gi)==null){
				entrada = entrada.replace(/([a-zA-Z0-9-_]{11})/gi," https://www.youtube.com/watch?v=$1")
			}
		}
		var enlaces = window.detectar_enlaces(entrada)
		var salida = ""
		var puede_enviar = [false,false]
		function env(a){a[0]=true;a[1]=true}
		for(var i in enlaces){
			var actual = enlaces[i]
			var res = actual
			res = res.replace("ugc.kn3.net/i/origin/https","")
			res = res.replace(/#codigos$/gi,"")
			res = res.replace(/subefotos\.com\/ver\/\?/gi,"fotos.subefotos.com/")
			puede_enviar[0] = false
			/*
			if(/akamaihd/gi.test(res)){
				env(puede_enviar)
				borrar = false
			}
			*/
			if(/\.(png|jpg|gif)/gi.test(res)){
				env(puede_enviar)
				borrar = true
			}
			if(
				res.includes("gstatic.")
				|res.includes("ddn.i.ntere.st")&res.includes("image")
			){
				env(puede_enviar)
			}
			if(res.includes("imgur.com")|res.includes("gyazo.com")){
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
			if(res.includes("giphy.com")&!res.includes("giphy.gif")){
				res = "media.giphy.com/media/" + res.match(/[0-9a-z]+/gi).slice(-1)[0] + "/giphy.gif"
				env(puede_enviar)
			}
			if(res.includes("m.youtube.com")){
				borrar = true
				env(puede_enviar)
				res = "i.ytimg.com/vi/"
					+ res.match(/[a-z0-9-_]+/gi).slice(-1)[0]
					+ "/hqdefault.jpg"
				console.log(actual)
				actual = actual.replace(/^[a-z.]/gi,"youtube.com")
			}else{
				if(res.includes("youtube.com")){
					borrar = true
					env(puede_enviar)
					res = "i.ytimg.com/vi/"
						+ res.match(/v=[a-z0-9-_]+/gi)[0].split("=").slice(-1)[0]
						+ "/hqdefault.jpg"
				}
			}
			if(res.includes("youtu.be")){
				res = res.replace(/\?list=[a-zA-Z0-9-_]{11,}/gi,"")
				actual = actual.replace(/\?list=[a-zA-Z0-9-_]{11,}/gi,"")
				borrar = true
				env(puede_enviar)
				res = "i.ytimg.com/vi/"
					+ res.match(/[a-z0-9-_]+/gi).slice(-1)[0]
					+ "/hqdefault.jpg"
				actual = actual.replace(/^[a-z.]+\//gi,"youtube.com/watch?v=")
			}
			if(res.match(/static\d+\.squarespace/gi)){
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
			if(puede_enviar[0]){
				var protocolo = "http"
				var sitios = [
					["ytimg"]
					,["gstatic","imgur","gyazo","discordapp","pinimg","amazon"]
				]
				for(var j in sitios){
					var actual_2 = sitios[j]
					for(var k in actual_2){
						var actual_3 = actual_2[k]
						if(res.includes(actual_3)){
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
				if(!bool&actual.match(/youtu\.be|youtube\./gi)!=null){
					salida += "[img]"+protocolo+"://"+res+"[/img]\n" + protocolo+"://" + actual + ""
					bool = true
				}
				if(!bool){
					salida += "[img]"+protocolo+"://"+res+"[/img]"
				}
				salida+="\nEnviado por: "+window.bbcode_usuario(usuario)
			}else{
				salida+=res
			}
		}
		var es_40 = document.title=="40 o más"
		if(window.es_domingo()&es_40){
			//	puede_enviar[1] = false
		}
		if(puede_enviar[1]){
			if(borrar){
				window.eliminar_mensaje(número,sala)
			}
			window.enviar_mensaje(salida,sala,hacia)
		}
	}
}
window.activar_ban_37_minutos = function(){
	if(id_chat>2){
		if(!puede_banear_votos){
			puede_banear_votos=1
			tiempos_votos.map(x=>clearTimeout(x))
			tiempos_votos = []
			window.enviar_mensaje("El baneo por votos se activó.",sala)
			tiempos_votos.push(setTimeout(()=>{
				if(puede_banear_votos){
					puede_banear_votos=0
					window.enviar_mensaje("El baneo por votos se desactivó.",sala)
				}
			},1000*60*37))
		}
	}
}
window.agregar_voto = function(nick_votado,nick_votante,ip_votado,ip_votante,sala){
	var hecho = false
	if(!inbaneables.includes(ip_votado)){
		var coincide_votado = false
		var coincide_votante = false
		var voto_no_camufle = !inhabilitado_banear.includes(ip_votante)
		var i = 0
		for(i in votados){
			var actual = votados[i]
			if(actual[1]==ip_votado){
				coincide_votado = true
				var votos =  actual[2]
				for(var j in votos){
					var actual_2 = votos[j][1]
					if(actual_2==ip_votante){
						coincide_votante = true
					}
				}
				break
			}
		}
		var votado,votos,nombre
		if(!coincide_votante&coincide_votado){
			votado = votados[i]
			votos = votado[2]
			if(voto_no_camufle){
				if(puede_banear_votos&votantes.includes(nick_votante)|!votantes.length){
					votos.push([++id_votación,ip_votante])
				}
			}else{
				window.enviar_mensaje("Los votos de los camufles no valen. (1)",sala)
				window.banear_según_minutos(nick_votante,0)
				window.activar_ban_37_minutos()
				hecho = true
			}
		}
		if(!coincide_votante&!coincide_votado&!hecho){
			votos = [[++id_votación,ip_votante]]
			if(voto_no_camufle){
				if( puede_banear_votos & votantes.includes(nick_votante) ){
					votados.push([nick_votado,ip_votado,votos])
				}
			}else{
				window.enviar_mensaje("Los votos de los camufles no valen. (2)",sala)
				window.banear_según_minutos(nick_votante,0)
				window.activar_ban_37_minutos()
				hecho = true
			}
		}
		if(!hecho){
			if(coincide_votante&coincide_votado){
				window.enviar_mensaje("Voto inválido.",sala)
			}else{
				var nombre = nick_votado
				if(votos.length>=votos_necesarios){
					window.enviar_mensaje("El usuario "+nombre+" recibió ban.",sala)
					window.banear_según_minutos(nombre,127,"Votación de usuarios")
					votos.length = 0
				}else
				{
					if(votantes.includes(nick_votante)){
						if(!puede_banear_votos){
							window.enviar_mensaje("El baneo por votos está desactivado.",sala)
						}else{
							window.enviar_mensaje(nombre+" tiene "+votos.length+" votos.",sala)
						}
					}
				}
			}
		}
		console.log(votados)
		return votados
	}
}
window.votar_usuario = function(datos,nicks_votado,nick_votante,ip_votante,sala){
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error){
		var ip_votado = analizado.lastIp
		window.agregar_voto(nicks_votado,nick_votante,ip_votado,ip_votante,sala)
	}
}
window.sumar_voto = function(datos,nick_votante,hacia,sala){
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	if(no_error){
		var ip_votante = analizado.lastIp
		for(var i in hacia){
			var actual = hacia[i]
			window.moderar_usuario(actual,x=>window.votar_usuario(x,actual,nick_votante,ip_votante,sala))
		}
	}
}
window.votar_ban = function(usuario,hacia,sala){
	window.moderar_usuario(usuario,x=>window.sumar_voto(x,usuario,hacia,sala))
}
window.banear_por_votos = function(entrada,usuario,hacia,sala){
	if(sala==1|sala==2){
		sala = sala_ban
	}
	if(entrada.match(/(^\s*ban\s*\s*\d*$)|(^\[b]ban\s*\d*\[\/b]$)/gi)!=null & hacia!=undefined){
	
		// && 2==3 inhabilita el condicional
	
		if(!puede_banear_votos && 2==3 ){
			window.enviar_mensaje("El baneo por votos está desactivado.",sala)
		}
		if(puede_banear_votos && 2==3 ){
			window.votar_ban(usuario,hacia,sala)
		}
	}
}
window.desbanear_desde_número = function(número,función){
	var chat = location.origin+"/chat/"
	var modo = "unban"
	var fin = "&entries=" + número
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección,función)
}
window.unban = function(función){
	var chat = location.origin+"/chat/"
	var modo = "load"
	var fin = "/banlist"
	var dirección = chat + modo + fin
	window.descargar(dirección,función)
}
window.desbanear_usuario = function(usuario){
	var función = function(datos,usuario){
		var html = window.texto_hacia_html(datos)
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
		if(usuario_baneado!=undefined){
			window.desbanear_desde_número(usuario_baneado["número"])
		}
	}
	var función_3 = x=>función(x,usuario)
	window.unban(función_3)
}
window.desbanear = function(entrada,número,usuario,sala,hacia){
	if(sala==1|sala==2){
		sala = sala_ban
	}
	if(entrada.match(/^\s*unban|desban\s*$/gi)!=null){
		for(var i in hacia){
			var actual = hacia[i]
			if(!/b[oòôóö]t/gi.test(actual)){
				window.desbanear_usuario(actual)
			}
		}
	}
}
window.eliminar_banes = function(entrada,número,sala){
	var regexp = /^<span class="minor"><a href="#" class="nick" data-nick="(.+)">.+<\/a> baneado hasta (\d{2}\.\d{2}\.\d{4} \d{2}:\d{2})\. Causa: (.+)\. \(<a href="#" class="nick" data-nick="(.+)">.+<\/a>\)<\/span>$/gi
	if(regexp.test(entrada)){
		mensajes_entra_sale_ban.push([número,sala])
		window.eliminar_mensaje(número,sala)
		var array = JSON.parse(entrada.replace(regexp,"[\"$1\",\"$2\",\"$3\",\"$4\"]"))
		var usuario = array[0]
		console.log(array)
		var fecha_desde = new Date()
		var fecha_hasta = new Date(array[1].replace(/\./gi,"/").replace(/^(\d+)\/(\d+)/gi,"$2/$1"))
		var unidad = "segundo"
		var tiempo = (fecha_hasta-fecha_desde)/1000
		if(tiempo>30){
			tiempo/=60; unidad = "minuto"
			if(tiempo>=30){
				tiempo/=60; unidad = "hora"
				if(tiempo>=12){
					tiempo/=24; unidad = "día"
					if(tiempo>=4){
						tiempo/=7; unidad = "semana"
						if(tiempo>=2){
							tiempo/=4; unidad = "mes"
						}
					}
				}
			}
		}
		tiempo = Math.round(tiempo)
		if(tiempo==1){
			tiempo="un"
			if(unidad=="semana"){tiempo+="a"}
			if(unidad=="hora"){tiempo+="a"}
		}else{
			unidad+="s"
		}
		if((id_chat!=1)&(id_chat!=2)){
			window.enviar_mensaje(
				"Recibiste ban de " + array[3]
				+ " durante " + tiempo + " " + unidad + ". (" + array[2] + ")",sala_ban,[usuario]
			)
			if(usuario=="ari ☯"){
				//window.desbanear_usuario(usuario)
			}
		}
	}
}
window.agregar_avatar = function(datos,usuario,hacia,sala,i){
	var analizado = JSON.parse(datos)
	var actual = hacia[i]
	var identidad
	var hospedaje = "a.chatovod.com"
	var sitio = location.protocol +"//"+ hospedaje
	if(analizado.t!="error"){
		identidad = analizado.nickId

	}else{
		var posición = window.buscar_en_matriz(usuarios,"alias",actual)
		console.log("nick avatar",actual,posición)
		var us_pos = usuarios[posición]
		identidad = us_pos==undefined?"":us_pos.id
	}
	if(identidad!=undefined&!avatar_excluidos.includes(actual)){
		var mensaje_sin_mod = sitio+"/n/"+identidad+"/e?"+Date.now()
		var mensaje_con_mod = "[img]" + mensaje_sin_mod + "[/img]"
		window.enviar_mensaje(mensaje_sin_mod,sala,[usuario,actual],89*i)
	}
}
window.mostrar_avatares = function(entrada,usuario,hacia,sala){
	if(puede_mostrar_avatar){
		funciones_avatar = []
		var función_2 = i=>x=>window.agregar_avatar(x,usuario,hacia,sala,i)
		if( entrada.match(/^avatar\s?[0-9]*$/gi)!=null & hacia!=undefined ){
			for(var i in hacia){
				var actual = hacia[i]
				funciones_avatar.push(función_2(i))
				window.moderar_usuario(actual,funciones_avatar[i],x=>x)
			}
		}
	}
}
window.quitar_puntos_números = function(entrada){
	var devuelve = true
	var números = entrada.match(/(\b\d{1,3}(\.\d{3})+\b)/gi)
	if(números==null){
		devuelve = false
	}else{
		var mapa = números.map(x=>x.replace(/\./gi,""))
		for(var i in mapa){
			var regex = new RegExp(números[i],"gi")
			entrada = entrada.replace(regex,mapa[i])
		}
	}
	return [entrada,devuelve]
}
window.formatear_número = function(número){
	var devuelve
	var array = []
	var entero = Math.floor(número)+""
	var coma = (""+número%1).slice(2)
	if(!/e\+/gi.test(entero)){
		while(entero.length>=3){
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
window.evaluar_javascript = function(entrada,usuario,sala,hacia){
	var números_en_letras = "cero un ún dos dós tre cua cinc sei séi siete och nueve quin setec novec die once doce trece cat veint ses set noni".split(" ")

	var conv = entrada
	var es_texto = conv.match(/^\s*"[^"]+"\s*$/gi)!=null
	if(es_texto){
		if(sala!=sala){
			window.enviar_mensaje(conv.replace(/^\s*"([^"]+)"\s*$/gi,"$1"),sala,hacia)
		}
		return;
	}
	else
	{
		hacia = [usuario]
	}
	es_texto = false
	var permite = false
	if(!es_texto){
		conv = conv.replace(/\(?\?/gi,"")
		conv = conv.replace(/\¿/gi,"")
		conv = conv.replace(/^\s*y*\s*?/gi,"")
		if(conv.match(/:[a-z0-9()_ñ]+:/gi)==null){
			conv = conv.replace(/:'3/gi,"")
			conv = conv.replace(/>:v/gi,"")
			conv = conv.replace(/:\S{1,2}/gi,"")
			conv = conv.replace(/\S{1,2}:/gi,"")
		}
		else{
			conv = conv.replace(/:[a-z0-9()_ñ]+:/gi,"")
		}
		var símbolos = [
			["¾","3/4"]
			,["?","3/8"]
			,["?","5/8"]
			,["?","5/8"]
			,["²","^2"]

		]
		for(var i in símbolos){
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
		var quitar_puntos = window.quitar_puntos_números(conv)
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
		if(!conv.includes("=>")){
			conv = conv.replace(/[×x]/gi," * ")
		}
		if(conv.match(/(ra[ií]z)|(log)/gi)!=null){
			conv = conv.replace(/log(()|(2)|(1p)|(10)) (\d+)/gi,"Math.log$1($6)")
			conv = conv.replace(/log(\d+)\s+(\d+)/gi,"Math.log($2)*Math.log(Math.E)/Math.log($1)")
			conv = conv.replace(/\bra[ií]z\s+c[uú]bica\s+(de\s+)?(\d+)/gi,"+Math.pow($2,1/3).toFixed(14)")
			conv = conv.replace(/\bra[ií]z(\s+cuadrada)?\s+del?\s+(\d+([.,]\d+)?)\b/gi,"Math.sqrt($2)")
			quitar_puntos[1] = false
		}
		var está_convertido = false
		var convertido
		if(conv.match(/^decir\s+\d+$/gi)!=null){
			var conv_orig = conv
			conv = "\""+númeroHaciaLetras(conv.match(/\d+/gi).join(""))+"\""
			quitar_puntos[1] = false
			está_convertido = true
			if(conv_orig!=conv){
				permite = true
			}
		}
		if(!está_convertido){
			if(conv.match(/^[a-z\sáéíóú]+.?$/gi)!=null){
				conv_orig = conv
				convertido = "\""+window.formatear_número(letrasHaciaNúmero(
					conv.match(/[a-z\s.áéíóú]+/gi).join(" ")
				).replace(/\./gi,""))+"\""
				if(convertido!="\"0\""|convertido=="\"0\""&conv.match(/cero/gi)!=null){
					conv = convertido
					quitar_puntos[1] = false
					está_convertido = true
					if(conv_orig!=conv){
						permite = true
					}
				}
			}
		}
	}
	if(conv!=""){
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
				if( typeof resultado == "string" & sala!=sala & !permite ){
					permite = true
					sala = sala
				}
				if(quitar_puntos[1]|isFinite(resultado)){
					resultado = +(+resultado).toFixed(14)
					resultado = window.formatear_número(""+resultado)
					permite = true
				}
				if(resultado.includes("undefined")){
					window.enviar_mensaje(window.elemento_aleatorio(error_de_cálculo),sala,hacia)
				}else
				{
					if(permite & resultado!=entrada & resultado!=0){
						window.enviar_mensaje(resultado,sala,hacia)
					}
				}
			}else{
				//console.log("error",resultado)
			}
		}catch(e){
			// console.log("error 2",resultado)
		}
	}
}
window.pedir_la_hora = function(entrada,usuario,sala,hacia){
	var hecho = false
	var mensaje
	if(
		!hecho
		&entrada.match(/\bhora\b/gi)!=null
		&entrada.match(/v[ei]rg[ao]|gil|gay|novi/gi)!=null
	){
		mensaje = "La hora en la que " + window.elemento_aleatorio(sexo) + " a tu " + window.elemento_aleatorio(madre)+"."
		window.enviar_mensaje(mensaje,sala,[usuario])
	}else{
		if(!hecho&entrada.match(/(([qk]u?)|k)h?[eiéí]?h?\x20?h?ora (e[hs]|son)?/gi)!=null){
			mensaje = ""
			var fecha = new Date()
			var hora = fecha.getUTCHours()
			var minutos = window.dos_dígitos(fecha.getUTCMinutes())
			// Falta: Bolivia, Costa Rica, Cuba, Ecuador, El Salvador, Honduras
			var color = "12aa21"
			var sp = "\n"
			var cambio = window.obtener_GMT(entrada)
			if(cambio!=undefined){
				mensaje = "Las " + window.dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
				window.enviar_mensaje(mensaje,sala,[usuario])
			}else{
				if(
					entrada.match(/ en /gi)!=null
					&entrada.match(/mi pa[íi]s/gi)==null
				){
					mensaje = window.elemento_aleatorio(desconocimiento)
					window.enviar_mensaje(mensaje,sala,[usuario])
				}
				else
				{
					window.operar_perfil(usuario,sala,hacia)
				}
			}
		}
	}
}
window.fonetizar_mensaje = function(entrada,usuario,sala,hacia){
	if(entrada.match(/^\s*fon\s+/gi)!=null){
		entrada = entrada.replace(/^\s*fon\s+/gi,"")
		entrada = fonetizar(entrada)
		window.enviar_mensaje(entrada,sala,[usuario])
	}
}
window.color_arcoiris = function(entrada,número,usuario,sala,hacia){
	if(entrada.match(/^\s*color[\s:]+/gi)!=null){
		var transformado = entrada.replace(/^\s*color\s+/gi,"")
		transformado = transformado.replace(/\[\/?b\]/gi,"")
		transformado = /*usuario+": "+*/transformado
		var entrada_color = gradual(0,10,transformado,13,0,1)
		transformado = /*"[b]"+*/entrada_color/*+"[/b]"*/
		window.enviar_mensaje(transformado,sala,hacia)
		window.eliminar_mensaje(número,sala)
	}
}
window.definir = function(entrada,usuario,sala){
	if(entrada.match(/^\s*definir[\s:]+/gi)!=null){
		entrada = entrada.replace(/^\s*definir\s+/gi,"")
		var partes = entrada.split(/\s+es\s+/gi)
		var palabra = partes[0]
		var definición = partes[1]
		var base_de_datos = localStorage.bot
		window.enviar_mensaje("Definida la palabra "+palabra,sala)
		window.enviar_mensaje(entrada,sala)
	}
	var definir = entrada.split(/\s*es\s*/gi)
}
window.ban_ip = function(datos,nombre){
	if(id_chat==1|id_chat==2){return;}
	var analizado = JSON.parse(datos)
	var no_error = analizado.t!="error"
	var i
	if(no_error){
		var ip_usuario = analizado.lastIp
		var ip_geo_usuario = analizado.lastIpGeo
		var navegador = analizado.lastUserAgent
		var id_cuenta = analizado.accountId
		var no_tiene_cuenta = id_cuenta==undefined
		var no_tiene_país = ip_geo_usuario==undefined
		if(!permitir_kendall){
			if(/jakekendall1\d+@yahoo.com/gi.test(analizado.accountLogin)){
				console.log(analizado.accountLogin)
				window.banear_según_minutos(nombre,1,"Kendall")
			}
		}
		if(no_tiene_país & no_tiene_cuenta){
			if(ip_usuario!=undefined&!inhabilitado_banear.includes(ip_usuario)){
				console.log(nombre,ip_usuario,ip_geo_usuario,id_cuenta)
				inhabilitado_banear.push(ip_usuario)
				inhabilitado_banear = inhabilitado_banear.sort()
			}
			window.activar_ban_37_minutos()
			// window.banear_según_minutos(nombre,1000,".")
		}
		var causa = "."
		var minutos = 3
		if(!baneados.includes(nombre)){
			if(ip_usuario!=undefined){
				var actual
				for(i in ips_ban){
					actual = ips_ban[i]
					if(ip_usuario.includes(actual[0])){
						causa = actual[1]
						minutos = actual[2]
						window.banear_según_minutos(nombre,minutos,causa)
						console.log(12,actual[0],nombre,minutos,causa)
						baneados.push(nombre)
					}
				}
			}
			if(no_tiene_cuenta){
				console.log(datos,nombre)
				console.log(ip_geo_usuario,nombre)
				if(ip_geo_usuario!=undefined & ban_heurístico){
					for(i in lugares_ban){
						actual = lugares_ban[i]
						if(ip_geo_usuario.includes(actual[0])){
							causa = actual[1]
							minutos = actual[2]
							window.banear_según_minutos(nombre,minutos,causa)
							baneados.push(nombre)
							if(privado_moderador)
							{
								window.enviar_mensaje(".",privado_moderador,[nombre])
							}
						}
					}
				}
				if(navegador!=undefined){
					for(i in navegadores){
						actual = navegadores[i]
						if(navegador.includes(actual[0])){
							causa = actual[1]
							minutos = actual[2]
							window.banear_según_minutos(nombre,minutos,causa)
							console.log(13,actual[0],nombre,minutos,causa)
							baneados.push(nombre)
						}
					}
				}
			}
		}
		if(!sospechosos.includes(nombre)){
			if(ip_geo_usuario==undefined){
				// window.enviar_mensaje("Posible camuflado.",1,0,[nombre])
				sospechosos.push(nombre)
			}
		}
	}
}
window.banear_ip = function(nombre){
	window.moderar_usuario(nombre,x=>window.ban_ip(x,nombre))
}
window.activar_ban = function(nombre,sala){
	var usuarios_activar_ban = ["JΘSЄ", "chiripiorca", "kendall", "randall"]
	if(sala==1|sala==2){
		sala = sala_ban
	}
	for(var i in usuarios_activar_ban){
		var actual = usuarios_activar_ban[i]
		var reg_exp = new RegExp(actual,"gi")
		if(reg_exp.test(nombre)){
			window.activar_ban_37_minutos()
			break
		}
	}
}
window.agregar_info = function(datos,usuario,hacia,sala,i){
	var analizado = JSON.parse(datos)
	var actual = hacia[i]
	var identidad
	if(analizado.t!="error"){
		var mensaje = Object.keys(analizado).map(x=>analizado[x]).join(" ")
		window.enviar_mensaje(mensaje,sala,actual,89*i)
	}else{
		;
	}
}
window.obtener_moderación = function(entrada,usuario,sala,hacia){
	funciones_avatar = []
	var función_2 = i=>x=>window.agregar_info(x,usuario,hacia,sala,i)
	if(/^\s*mod\s*\d*\s*$/gi.test(entrada) & sala!=1 & sala!=19491 & puede_obtener_info ){
		for(var i in hacia){
			var actual = hacia[i]
			funciones_avatar.push(función_2(i))
			window.moderar_usuario(actual,funciones_avatar[i],x=>x)
		}
	}
}
window.etiquetar_nick = function(entrada,usuario,sala,hacia){
	var regex = /^\s*tag\s*(.+)\s*$/gi
	if(regex.test(entrada)){
		var nick = entrada.replace(regex,"$1")
		window.enviar_mensaje(""+window.aleatorio_menor_a(100),sala,[nick],1)
	}
}
window.borrar_nombre_de_idos = function(nombre){
	return [delete entrados[nombre],delete idos[nombre]]
}
window.determinar_color_texto = function(nombre_chat){

	console.log("Nombre chat:",nombre_chat)

	var los_24_bits = [...Array(24)].map(x=>0).join("")
	var mensaje_a_binario = nombre_chat.split("").map(x=>x.charCodeAt().toString(2)).join("")
	var binario = los_24_bits.concat(mensaje_a_binario).split("")
	var rojo = []
	var verde = []
	var azul = []
	for(var i=0;i<binario.length;++i){
		rojo.push(binario.shift())
		verde.push(binario.shift())
		azul.push(binario.shift())
	}
	var color = [
		 window.entero_hacia_hexadecimal(window.binario_hacia_entero(rojo.join("")) ,2)
		,window.entero_hacia_hexadecimal(window.binario_hacia_entero(verde.join("")),2)
		,window.entero_hacia_hexadecimal(window.binario_hacia_entero(azul.join("")) ,2)
	]
	return color.join("")
}

window.tiempo_total_saludo = 21*1000
window.tiempo_espera_saludo = function(){
	// 15 segundos de espera.
	return 21*1000 + window.aleatorio_menor_a(1000*15)
}
window.tiempo_espera = function(){
	return window.aleatorio_menor_a(21*1000)
}
window.reestablecer_localStorage = function(){
	return ["idos","entrados"].map(x=>{
		var a = JSON.parse(localStorage[x])
		for(var i in a){
			if(i.match(/[yiι]/i)){
				a[i]=0
			}
		}
		localStorage[x]=JSON.stringify(a)
	})
}
window.separar_por_and = function(nombres){
	var array = []
	nombres.map(x=>array.push(...x.split(/\b[y]\b/i)))
	array = array.filter(x=>x!="")//.reverse()
	return array
}
window.cambiar_y_griega_por_e = function(texto){
	var devuelve = false
	var letras = texto.match(/[a-zýỳÿŷáàäâéèëêíìïîóòöôúùüû]+/gi)
	if(letras!==null){
		var letras_2 = letras[0]
		var primera = letras_2[0]
		var segunda = letras_2[1]
		var primera_es_y_griega = primera.match(/[yýỳÿŷiíìïî]/i)
		var segunda_es_vocal = segunda && segunda.match(/[aáàäâeéèëêiíìïîoóòöôuúùüû]/i)
		if( primera_es_y_griega && ( !segunda || !segunda_es_vocal) ){
			devuelve = true
		}
	}
	return devuelve
}
window.unir_array_palabras = function(array,callback){
	var devuelve = array
	var nombres = array
	if(nombres.length>=2){
		var y = "y"
		var último = nombres.slice(-1)[0]
		var buscar_y = window.cambiar_y_griega_por_e(último)
		if(buscar_y){
			y = "e"
		}
		var procesado = nombres.map(x=>callback(x))
		devuelve = procesado.slice(0,-1).join(", ") + " " + y + " " + procesado.slice(-1)
	}else{
		devuelve = nombres.toString()
	}
	return devuelve
}
window.obtener_límite_saludos = function(){
	return 4
}
window.obtener_todos_diferentes = function(array){
	return Array.from(new Set(array))
}
window.simplificar_nombre = function(nombre){
	var devuelve = ""
	var array_iguales = []
	var nombre_array = nombre.split("")
	for(var i=0;i<nombre_array.length;++i){
		var letra = nombre_array[i]
		var letra_array = array_iguales.slice(-1)[0] && array_iguales.slice(-1)[0][0]
		if(letra!=letra_array){
			array_iguales.push([letra,0])
		}else{
			++array_iguales[array_iguales.length-1][1]
		}
		if(
			array_iguales[array_iguales.length-1]
			&& array_iguales[array_iguales.length-1][1]<2
		){
			devuelve += letra
		}
	}
	return devuelve
}
window.chat_negrita = function(nombre_chat,color_chat){
	return "[b][color=#"+color_chat+"]"+nombre_chat+"[/color][/b]"
}
window.esperar_saludo_idos = function(){
	var sala = 1
	var mensajes = []

	var límite = window.obtener_límite_saludos()
	var lista_nombres = window.idos_por_saludar.slice(0,límite)
		.filter(x=>!window.nombre_es_bot_spam(x))
	var nombres = window.obtener_todos_diferentes(lista_nombres).map(x=>window.simplificar_nombre(x))
	var nombre = nombres[0]
	window.idos_por_saludar = window.idos_por_saludar.slice(límite)

	var nombres = window.separar_por_and(nombres)

	if(nombres.length>=2){
		var nombres_bbcode_array = []
		var nombres_bbcode = ""
		var género = undefined
		for(var i=0;i<nombres.length;++i){
			var nombre_actual = nombres[i]
			género = window.género_usuario(nombre_actual)
		}
		console.log(nombres_bbcode_array)
		nombres_bbcode = window.unir_array_palabras(nombres,window.bbcode_usuario)

		mensajes.push("¡L" + género + "s extrañaremos, " + nombres_bbcode + "! ¡Vuelvan pronto! :3")
		mensajes.push("¡Adios" + género + "s " + nombres_bbcode + "! ¡L" + género + "s extrañaremos!")
		mensajes.push("¡Chaus" + género + "s " + nombres_bbcode + "! ¡Esperaremos sus regresos!")
	}

	if(nombres.length==1){
		var nombre_negrita = window.bbcode_usuario(nombre)
		mensajes.push("¡Te extrañaremos, " + nombre_negrita + "! ¡Vuelve pronto! :3")
		mensajes.push("¡Adiós " + nombre_negrita + "! ¡Te extrañaremos!")
		mensajes.push("¡Chau " + nombre_negrita + "! ¡Esperaremos tu regreso!")
	}
	if(nombres.length>=1){
		var mensaje = window.elemento_aleatorio(mensajes)
		// console.log(mensaje,mensajes)
		window.enviar_mensaje(mensaje,sala,[],100)
	}
}
window.esperar_saludo_entrados = function(){
	var sala = 1
	var bienvenidas = []

	var límite = window.obtener_límite_saludos()
	var lista_nombres = window.entrados_por_saludar.slice(0,límite)
		.filter(x=>!window.nombre_es_bot_spam(x))
	var nombres = window.obtener_todos_diferentes(lista_nombres).map(x=>window.simplificar_nombre(x))
	var nombre = nombres[0]

	window.entrados_por_saludar = window.entrados_por_saludar.slice(límite)

	var nombres = window.separar_por_and(nombres)

	if(nombres.length>=2){
		var nombres_bbcode_array = []
		var nombres_bbcode = ""
		var género = undefined
		for(var i=0;i<nombres.length;++i){
			var nombre_actual = nombres[i]
			género = window.género_usuario(nombre_actual)
		}
		console.log(nombres_bbcode_array)
		nombres_bbcode = window.unir_array_palabras(nombres,window.bbcode_usuario)

		bienvenidas.push(
			`Bienvenid${género}s: ${nombres_bbcode}.`
			, `Han entrado ell${género}s: ${nombres_bbcode}.`
		)
	}
	if(nombres.length==1){
		var género = window.género_usuario(nombre)
		var nombre_bbcode = window.bbcode_usuario(nombre)

		bienvenidas.push(
			`¡Bienvenid${género} muchach${género} ${nombre_bbcode}!`
			, `¡Bienvenid${género} ${nombre_bbcode}!`
			, `¡Sea bienvenid${género} ${nombre_bbcode}!`
			, `¡Entró ${nombre_bbcode}!`
		)
	}
	if(nombres.length>=1){
		var mensaje = window.elemento_aleatorio(bienvenidas)
		// console.log(mensaje,bienvenidas)
		window.enviar_mensaje(mensaje,sala,[],100)
	}
}
window.enviar_despedida = function(nombre,sala){
	window.idos_por_saludar.push(nombre)
	console.log("Por despedir: ",window.idos_por_saludar)
	window.espera_actual = window.tiempo_espera_saludo()
	window.tiempo_total_saludo += window.espera_actual
	setTimeout(()=>{
		window.tiempo_total_saludo -= window.espera_actual
		if(window.tiempo_total_saludo<21*1000){
			window.tiempo_total_saludo = 21*1000
		}
		window.esperar_saludo_idos()
	},window.tiempo_total_saludo)
}
window.enviar_saludo = function(nombre,sala){
	window.entrados_por_saludar.push(nombre)
	console.log("Por dar bienvenida: ",window.entrados_por_saludar)
	window.espera_actual = tiempo_espera_saludo()
	window.tiempo_total_saludo += window.espera_actual
	setTimeout(()=>{
		window.tiempo_total_saludo -= window.espera_actual
		if(window.tiempo_total_saludo<21*1000){
			window.tiempo_total_saludo = 21*1000
		}
		window.esperar_saludo_entrados()
	},window.tiempo_total_saludo)
}

window.saludar = function(nombre){
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
	console.log(nombre)
	window.enviar_saludo(nombre,1)
	entrados[nombre] = 1
	localStorage.entrados = JSON.stringify(entrados)
}
window.buscar_google = function(entrada,usuario,sala,hacia){
	var regex = /^\s*google\s+(.+)/gi
	if(regex.test(entrada) & puede_buscar_google ){
		var búsqueda = entrada.replace(regex,"$1")
		var dirección = "//www.google.com.ar/search?q="
		if(/".+"/gi.test(búsqueda)){
			dirección+= búsqueda
		}else{
			dirección+= "%22" + búsqueda + "%22"
		}
		dirección+="&num=10&newwindow=1&source=hp&ei=-cWSW_yJGojAwATLnrroBQ"
			+"&gs_l=psy-ab."
			+"3...2147.2653.0.3035.5.4.0.0.0.0.0.0..0.0....0...1c.1.64."
			+"psy-ab..5.0.0.0...0.7RIOSMCLgmc"
		window.descargar(dirección,x=>{
			var r = 0
			var html = window.texto_hacia_html(x)
			var resultado = html.querySelectorAll(".srg>.g")
			var mensaje = Array.from(resultado).slice(0,5).map(x=>{
				var título = x.querySelector("h3").textContent
				var enlace = x.querySelector("a").href
				var enlace = (++r)+" [url="+enlace+"]"+título+"[/url]"
				return enlace
			}).join("%0a")
			window.enviar_mensaje(mensaje,sala,hacia)
		})
	}
}
window.lightshot_cola_asíncrona = function(salida,cola,número,usuario,sala,hacia){
	if(cola.length>0){
		var actual = cola.shift()
		var nuevo = window.anticors + actual.replace(/^https?:\/\//gi,"")
		if(window.regex_lightshot.test(actual)){
			window.descargar(nuevo,x=>{
				var html = window.texto_hacia_html(x)
				var resultado = html.head.querySelector("meta[property='og:image']").content
				salida.push("[img]"+resultado+"[/img]")
				window.lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
			})
		}else{
			salida.push(actual)
			window.lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
		}
	}else
	{
		var mensaje = salida.join("")
		mensaje+="\nEnviado por: "+window.bbcode_usuario(usuario)
		window.enviar_mensaje(mensaje,sala,hacia)
		window.eliminar_mensaje(número,sala)
	}
}
window.descargar_lightshot = function(entrada,número,usuario,sala,hacia){
	window.regex_lightshot = /(https?:\/\/)?((prnt.sc|prntscr.com)\/[0-9a-z]{6})/gi
	if(window.regex_lightshot.test(entrada) & puede_descargar_lightshot ){
		var salida = []
		var descargado = 0
		var cola = entrada.replace(window.regex_lightshot,"{$2}").split(/[{}]/gi)
		console.log("cola",cola)
		window.lightshot_cola_asíncrona(salida,cola,número,usuario,sala,hacia)
	}
}
window.saludame_y_despedime = function(entrada,número,usuario,sala,hacia){
	var regex_saludar = /(sal[uúù]d[aeiouáéíóúàèìòù])|(la b[iu]envenid[aeiouáéíóúàèìòù])/gi
	if(regex_saludar.test(entrada) & window.puede_saludarlos ){
		window.idos[usuario] = 0
		window.entrados[usuario] = 0
		window.enviar_saludo(usuario,sala)
	}
	var regex_despedir = /despide/gi
	if(regex_despedir.test(entrada) & window.puede_despedirlos ){
		window.idos[usuario] = 0
		window.entrados[usuario] = 0
		window.enviar_despedida(usuario,sala)
	}
}
window.entrar = function(es_entrar,nombre,función){
	if(función==undefined){
		función = x=>console.log(x)
	}
	if(nombre==undefined){
		nombre = window.obtener_nombre_propio()
	}
	var chat = location.origin+"/chat/"
	var modo = es_entrar?"auth":"signOut"
	var fin
	if(es_entrar){
		fin = "&nick="+nombre
	}else
	{
		fin = ""
	}
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	if(puede_entrar&es_entrar|!es_entrar){
		window.descargar(dirección,función)
	}
}
window.entrar_o_salir = function(entrada){
	if(id_chat!=1&id_chat!=2){
		var función
		var regexp = /^\s*vuelve en (\d+) segundos?\s*$/gi
		if(regexp.test(entrada)){
			función = entrada=>{
				var tiempo = +entrada.replace(regexp,"$1")
				setTimeout(()=>{
					puede_entrar=1
					window.entrar(1)
				},tiempo*1000)
			}
			puede_entrar=0
			window.entrar(0,undefined,()=>función(entrada))
		}
		if(/^\s*entrar\s*/gi.test(entrada)){
			puede_entrar=1
			window.entrar(1)
		}
		if(/^\s*salir\s*/gi.test(entrada)){
			puede_entrar=1
			window.entrar(0)
		}
		regexp = /^\s*nick\s+(.+)\s*$/gi
		if(regexp.test(entrada)){
			función = entrada=>{
				var nombre = entrada.replace(regexp,"$1")
				window.entrar(1,nombre)
			}
			puede_entrar=1
			window.entrar(0,undefined,()=>función(entrada))
		}
	}
}
window.agregar_mensaje = function(mensaje){
	var posición = window.buscar_en_matriz(mensajes,1,mensaje)
	if(posición==-1){
		mensajes.push(mensaje)
	}
}

// Absolutamente necesario mantener el nombre de la función.
window.procesar_mensajes = function procesar_mensajes(a,b){
	var soy_un_bot = window.soy_bot()
	if(soy_un_bot){
		if(b.t!="m"){
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
		var emisor_no_soy_yo = !window.regularizar_texto(window.obtener_nombre_propio()).test(usuario)
		var mensaje = [entrada,número,usuario,sala,hacia]

		if(es_privado_nuevo){
			if(emisor_no_soy_yo){
				var html = document.createElement("div")
				html.innerHTML = JSON.stringify(mensaje)
				// document.querySelectorAll(".chatMessages")[0].appendChild(html)			
			}
			mensajes_privados.push(mensaje)
			//console.log("Es privado.",es_privado_nuevo,"b.u",b.nh,b.s)
		}
		window.agregar_mensaje(mensaje)
		if(es_nuevo){
			if(emisor_no_soy_yo){
				// Ordenado por prioridad
				window.eliminar_y_banear_otro_chat	(entrada,usuario,número,sala)
				window.eliminar_y_banear_18			(entrada,usuario,número,sala)
				window.eliminar_palabras			(entrada,número,sala)
				window.eliminar_banes				(entrada,número,sala)

				// Segundo orden
				window.desbanear					(entrada,número,usuario,sala,hacia)
				window.banear_por_votos				(entrada,usuario,hacia,sala)
				window.martillo						(entrada,número,sala)
				window.patear_a_todos				(entrada,número,usuario,sala,hacia)
				window.patear_usuarios				(entrada,número,usuario,sala,hacia)
				window.esperar_confirmación_patear	(entrada,número,usuario,sala,hacia)
				window.entrar_o_salir				(entrada)
				window.interruptor_ban				(entrada,usuario,sala,hacia)

				//Tercer orden
				window.mostrar_avatares				(entrada,usuario,hacia,sala)
				window.obtener_info					(entrada,usuario,sala,hacia)
				window.obtener_moderación			(entrada,usuario,sala,hacia)
				window.etiquetar_nick				(entrada,usuario,sala,hacia)
				window.mostrar_imágenes				(entrada,número,usuario,sala,hacia)
				window.color_arcoiris				(entrada,número,usuario,sala,hacia)
				window.evaluar_javascript			(entrada,usuario,sala,hacia)
				window.pedir_la_hora				(entrada,usuario,sala,hacia)
				window.fonetizar_mensaje			(entrada,usuario,sala,hacia)
				window.horóscopo					(entrada,usuario,sala,hacia)
				window.buscar_google				(entrada,usuario,sala,hacia)
				window.descargar_lightshot			(entrada,número,usuario,sala,hacia)
				window.definir						(entrada,usuario,sala)
				
				// Cuarto orden
				window.saludame_y_despedime			(entrada,número,usuario,sala,hacia)
			}
		}
	}
}
window.entrar_y_salir = function(a,b,c){
	var soy_un_bot = window.soy_bot()
	if(soy_un_bot){
		// console.log(a,b,c)
		if(b.includes("changed")){
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
			var posición = window.buscar_en_matriz(salas,0,nombre)
			if(posición==-1){
				salas.push(sala.slice(0,2).concat(-1))
			}else{
				salas[posición][1]=sala[1]
			}
			sala_visible = sala[1]
		}
		var info = b.split(" ")
		var entrada = info[0]
		entrada = entrada=="enter"?1:entrada=="leave"?0:-1
		var nombre = info.slice(1).join(" ")
		var mensaje;
		if(entrada>=0){
			var fecha = new Date()
			var tiempo = fecha.getHours()
				+":"+((fecha.getMinutes()+100)+"").slice(1)
				+":"+((fecha.getSeconds()+100)+"").slice(1)
			if(entrados[nombre]==undefined){
				entrados[nombre] = 0
				localStorage.entrados = JSON.stringify(entrados)
			}
			if(idos[nombre]==undefined){
				idos[nombre] = 0
				localStorage.idos = JSON.stringify(idos)
			}
			if(entrada==1){
				entrar_salir.push([1,nombre,tiempo])
				//window.banear_ip(nombre)
				//window.activar_ban(nombre,sala_ban)
				if(entrados[nombre]==0){
					window.saludar(nombre,1)
				}
			}else{
				entrar_salir.push([0,nombre,tiempo])
				if(idos[nombre]==0){
					idos[nombre] = 1
					localStorage.idos = JSON.stringify(idos)
					window.enviar_despedida(nombre,1)
				}
			}
		}
	}else{
		if(a.value>=lc(this).value)for(a=this.Dq(a,b,c),b="log:"+a.Rn,p.console&&(p.console.timeStamp?p.console.timeStamp(b):p.console.markTimeline&&p.console.markTimeline(b)),p.msWriteProfilerMark&&p.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.xg)for(var e=0,g=void 0;g=c.xg[e];e++)g(d);b=b.getParent()}
	}
}

// Absolutamente necesario mantener el nombre de la función.
window.registrar_los_pedidos = function registrar_los_pedidos(a,b){
	var pedido = [a,b]
	pedidos.push(pedido)
	if(a.url=="/chat/openPrivate2"){
		var nombre = a.data.nick
		var posición = window.buscar_en_matriz(salas,0,nombre)
		if(posición==-1){
			salas.push([nombre,-1,1])
		}else{
			salas[posición][2]=1
		}
	}
}
window.activar_bot_2 = function(){
	cc.prototype.log = (a,b,c)=>window.entrar_y_salir(a,b,c)
	window.modificar_función(mh,window.registrar_los_pedidos,false)
	window.modificar_función(yq,window.procesar_mensajes,false)

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

	ch.prototype.Rj = function (){
		var soy_un_bot = window.soy_bot()
		if(soy_un_bot){
			// console.log(this,"\n",this.Ak,"\n",this.Ve,"\n",this.rr,"fin")
			if(this.Ve){
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
		var soy_un_bot = window.soy_bot()
		if(soy_un_bot){
			if(b.t=="md"){
				for(var i in b.ts){
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
	if(id_chat==3){
		setTimeout(window.decir_la_hora,window.aleatorio_hora())
	}
}
window.permanecer_conectado = function(){
	window.activar_bot_2()
}
window.bloquear_nick = function(y){
	return Array.from(document.querySelectorAll(".chatPrivate .nick"))
		.map(x=>[x,x.textContent])
		.filter(x=>x[1]==y)
		.map(x=>x[0].parentElement.parentElement.remove())
	;
}
window.programa_bot = function(){
	window.anticors = "https://cors-anywhere.herokuapp.com/"

	var tiempos = {}
	var objetos = ["flood"]
	for(var i in objetos){
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

	var objetos_local_storage = [
		"entrados", "idos"
	]
	for(var i in objetos_local_storage){
		var actual = objetos_local_storage[i]
		var local_actual = localStorage[actual]
		if(local_actual==undefined){
			window[actual] = {}
		}else{
			window[actual] = JSON.parse(local_actual)
		}
	}
	var arrays = [
		"votados", "mensajes", "entrar_salir",
		,"mensajes_entra_sale_ban", "baneados", "sospechosos"
		,"inhabilitado_banear", "votantes", "tiempos_votos", "salas"
		,"pedidos","mensajes_privados","usuarios_a_patear"
		,"entrados_por_saludar", "idos_por_saludar"
	]
	for(var i in arrays){
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
		,[0,"esperar_confirmar_patear"],[1,"puede_saludarlos"],[1,"puede_despedirlos"]
	]
	for(var i in valores){
		var actual = valores[i]
		window[actual[1]] = actual[0]
	}
	if(window["usuarios"]==undefined){
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
	for(var i in chats){
		var actual = chats[i]
		if(actual[6]==document.title){
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
		,"yaris"
	]
	var info_excluidos = [
		"HerbalLove"
	]
	var excluidos_patear = [
		"yaris"
		,"mαdєlínє"
		,"Atenea"
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
	window.descargar_votantes()
	window.descargar_horóscopo()
	window.permanecer_conectado()
}

window.programa_bot()

