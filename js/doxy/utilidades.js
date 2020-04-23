utilidades = function(){
	try{doxy}catch(e){doxy={funciones:{}}}
	doxy.funciones.utilidades = {
		modificar_función: function(entrada,intermediario,escribir_textarea){
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
				try{window.insertar_textarea(modificado)}catch(e){
					console.error("Mod_1: ",e)
				}
			}
			try{eval(nombre_entrada+"="+modificado)}catch(e){
				console.error("Mod_2: ",e)
			}
			return window[nombre_entrada]
		}
		, filtrar_chatovod: function(x){
			// x=window

	delete x.Kq.ua.ua.ab.goog.ab.debug.ua                                                 // x.Kq.ua.ua.ab.goog
	delete x.Kq.ua.ua.ab.goog.ab.debug.ab.Trace.ua                                        // x.Kq.ua.ua.ab.goog.ab.debug
	if(x.Kq.ua.ua.ab.goog.ab.module!=undefined){                                          //
		delete x.Kq.ua.ua.ab.goog.ab.module.ua.ab.module.ua.ab.net.ua                     // x.Kq.ua.ua.ab.goog.ab.module.ua
		delete x.Kq.ua.ua.ab.goog.ab.module.ua.ab.module.ua.ab.net.ab.XhrIo.ua            // x.Kq.ua.ua.ab.goog.ab.module.ua.ab.module.ua.ab.net
		delete x.Kq.ua.ua.ab.goog.ab.module.ab.ModuleManager.ua.ua.ab.module.ua.ab.module // x.Kq.ua.ua.ab.goog.ab.module.ab.ModuleManager.ua
	}                                                                                     // 
	if(x.Kq.ua.ab.module!=undefined){                                                     //
		delete x.Kq.ua.ab.module.ua.ab.SoundManager.ua.ab.SoundManager.ua                 // x.Kq.ua.ab.module.ua
		delete x.Kq.ua.ab.module.ua.ab.module.ua.ab.module                                // x.Kq.ua.ab.module.ua.ab.module
	}

	//     x.Kq.ua
	delete x.Kq.ua.ua.ab.chatovod

	delete x.Kq.ua.ab.storage.ua
	delete x.Kq.ua.ab.wincom .ua

	//     x.Kq
	delete x.Kq.ua.ab.widget

	delete x.Kq.ab.Core        .ua
	delete x.Kq.ab.MainMenu    .ua
	delete x.Kq.ab.MessageTabs .ua
	delete x.Kq.ab.SendControls.ua
	delete x.Kq.ab.SignIn      .ua
	delete x.Kq.ab.Smileys     .ua
	delete x.Kq.ab.Tabs        .ua
	delete x.Kq.ab.Transport   .ua
	delete x.Kq.ab.UserPopup   .ua
	delete x.Kq.ab.Users       .ua
	delete x.Kq.ab.Windows     .ua
	
	// x.Kq.ua.ua
	delete x.Kq.ua.ua.ab.goog.ua
	x.Bf = undefined
	x.oc = undefined

	// Otro
	lg = undefined // x.Kq.ua.ab.wincom
	bh = undefined // x.Kq.ab.Transport
	im = undefined // x.Kq.ua.ab.storage
	
	delete nc["chatovod.module.ExternalModuleLoader"].ua // nc["chatovod.module"]
	delete nc["goog.module.ModuleManager"].ua            // nc["goog.module"]

	return x
		}
		,  clonar: function clonar(objeto,debug,nivel,entorno,ruta){
			var ruta = ruta==undefined?"":ruta
			if(typeof objeto==="string"){
				ruta = "clonar_x"
				objeto = window[objeto]
			}
			var nivel = nivel==undefined?0:nivel
			var entorno = entorno==undefined?[objeto]:entorno
			var claves = Object.keys(objeto)
			var es_array = x=>!!x&&x.constructor=="function Array() { [native code] }"
			var depurar = (debug,y)=>debug&&console.log(y)
			var salida = es_array(objeto)?[]:{}
			var max = 9
			//depurar(debug,"log0","Ruta",ruta)
			++nivel
			if(objeto==window.clonar_x){
				depurar(debug,"log00 Exclusión inmediata")
				return salida
			}
			if(ruta.length>1000){
				depurar(debug,"log001 Límite alcanzado",ruta,"Longitud de ruta",ruta.length)
				return salida
			}
			if(nivel>max){
				depurar(debug,"log002 Límite alcanzado",ruta,"Nivel",nivel)
				return salida
			}
			var ruta_padre = ruta
			for(var i in claves){
				var clave = claves[i]
				// depurar(debug,"log01 Clave",clave)
				if(/^[a-z_]+\d*$/i.test(clave)){
					ruta = ruta_padre+"."+clave
				}else{
					ruta = ruta_padre+'["'+clave+'"]'
				}
				if(
					clave!="clonar"
					&& clave!="clonar_x"
					//&& (/html|div|doc/i) .test(clave)
				){
					var valor = undefined
					try{
						valor = objeto[clave]
						// depurar(debug,"log10 Pudo acceder al valor. Ruta",ruta,"Valor",valor)
						var asignado = false
						if(
							typeof valor==="string"
							||typeof valor=="number"
							||typeof valor=="boolean"
							||valor==undefined
						){
							// depurar(debug,"log2 Es string o indefinido",valor)
							//debug && valor!=undefined && console.log("log21 Es string",ruta,valor)
							salida[clave] = valor
							asignado = true
						}
						if(!asignado&&typeof valor=="function"){
							// depurar(debug,"log22 Es una función",valor)
							salida[clave] = valor.toString()
							asignado = true
							entorno.push(valor)
						}
						if(!asignado){
							var prototipo = valor.__proto__.toString()
							// depurar(debug,"log23 Prototipo",prototipo,"Valor",valor)
							if(
								prototipo!="[object Object]"
								&& prototipo!="[object Window]"
								&& prototipo!="[object Location]"
								&& prototipo!="[object DOMStringList]"
								&& prototipo!="[object CustomElementRegistry]"
								&& prototipo!="[object HTMLDocument]"
								&& prototipo!="[object Element]"
								&& !es_array(valor)
							){
								// depurar(debug,"log3 No es string. Ruta",ruta)
								// depurar(debug,"log31 Prototipo",prototipo,"Llaves",Object.keys(valor),"Valor",valor)
								//return salida
							}
							var coincide_entorno = false
							try{
								coincide_entorno = entorno.includes(valor)

							}catch(e){
								depurar(debug,"log32 No se puede saber si se está incluyendo en el entorno",e)
							}
							if(!coincide_entorno){
								// depurar(debug,"log40 No coincide entorno","Objeto",objeto)
								//depurar(debug,"log41","Objeto",objeto)
								//depurar(debug,"log43","Entorno",entorno)
								// depurar(debug,"log44","Ruta",ruta)
								// depurar(debug,"log521 Pudo mostrar el valor",valor)
								// depurar(debug,"log5212 ¿Está asignado?",asignado)
								if( !asignado && prototipo=="[object HTMLDocument]" ){
									depurar(debug,"log522 Valor HTML",ruta,valor)
									var valores = undefined
									var html = undefined
									try{
										entorno.push(valor)
										valores = clonar(valor,true,nivel,entorno,ruta)
									}catch(e){
										depurar(debug,"log523 No pudo convertir HTML a string",ruta)
									}
									try{
										html = valor.querySelector("html")
									}catch(e){
										console.log("log524",e)
									}
									salida[clave] = {}
									if(html!=undefined){
										salida[clave].html = html.outerHTML
									}
									salida[clave].valores = valores
									asignado = true
								}
								if(
									!asignado && (
										prototipo=="[object HTMLDivElement]"
										|| prototipo=="[object Element]"
									)
								){
									depurar(debug,"log53 Valor elemento",ruta,valor)
									var entorno_html = entorno
										.filter(x=>{
											var es_documento = /function .*Document\(\) \{ \[native code\] \}/.test(x.constructor+"")
											if(es_documento){
												depurar(debug,"log5312 Un elemento del entorno es un documento",x)
												depurar(debug,"log5311 Ubicación",x.location)
											}else{
												// depurar(debug,"log5313 Un elemento del entorno no es un documento",x)
											}
											return es_documento
										})
									var documentos_html = []
									for(var k in entorno_html){
										var x = entorno_html[k]
										var documento = x.ownerDocument
										var es_lista = x.__proto__=="[object HTMLCollection]"
										if(documento){
											documentos_html.push(documento)
										}else if(es_lista){
											documentos_html.push(...[...x].map(x=>x.ownerDocument))
										}else{
											documentos_html.push(x)
										}
									}
									documentos_html = [...new Set(documentos_html)]
									var pertenece_al_entorno = documentos_html.includes(valor.ownerDocument)
									depurar(debug,"log532 Etiqueta Entorno HTML",entorno_html)
									depurar(debug,"log5321 Documentos HTML",documentos_html)
									depurar(debug,"log5322 ¿Etiqueta pertenece al entorno?",pertenece_al_entorno)
									if(pertenece_al_entorno){
										var valores = undefined
										var html = undefined
										try{
											entorno.push(valor)
											valores = clonar(valor,true,nivel,entorno,ruta)
										}catch(e){
											depurar(debug,"log54 No pudo convertir HTML a string",ruta)
										}
										try{
											html = valor.querySelector("html")
										}catch(e){
											console.log("log55",e)
										}
										salida[clave] = {}
										if(html!=undefined){
											salida[clave].html = html.outerHTML
										}
										salida[clave].valor = valores
										asignado = true
									}
								}
								if(!asignado){
									entorno.push(valor)
									salida[clave] = clonar(valor,true,nivel,entorno,ruta)
								}
							}else{
								//depurar(debug,"log6 Coincide entorno",entorno)
							}
						}
					}catch(e){
						depurar(debug,"log61 No se puede acceder al valor",e,ruta)
					}
				}else{
					depurar(debug,"log7 Se excluyó",clave)
				}
			}
			debug && arguments.length<=2 && (
				console.log("log8 Cantidad de argumentos",arguments.length, ". Argumentos", arguments)
				, console.log("log81 Fin de nivel",entorno,claves)
				
			)
			return salida
		}
	}
}
utilidades()
// doxy.funciones.utilidades.clonar_ventana(doxy.funciones.utilidades.filtrar_chatovod)
console.log( doxy.funciones.utilidades.clonar("window",true) )

