iniciar_oxy = function iniciar_oxy(){
	oxy = {
		variables: {
			iniciar: {
				archivo_actual: []
			}
		}
		, funciones: {
			tampermonkey: {
				obtener_carpeta: obtener_carpeta
			}
			, iniciar: {
				ult: x=>x.slice(-1)[0]
				, a: ()=>oxy.funciones.iniciar.ult(oxy.variables.iniciar.archivo_actual)[0]
				, b: x=>oxy.variables.iniciar.archivo_actual.push([x,Date.now()])
				, v: function(nombre,valor){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy){
						if(variables[archivo]==undefined){
							variables[archivo] = {}
						}
						if(variables[archivo][nombre]==undefined){
							variables[archivo][nombre] = []
						}
						variables[archivo][nombre].push([valor,Date.now()])
						return nombre
					}
				}
				, w: function(nombre){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones.iniciar){
						return ult(oxy.variables[archivo][nombre])[0]
					}
				}
				, definir_esto: function(){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones[archivo]){
						v("iniciar_oxy_tampermonkey",iniciar_oxy)
						delete iniciar_oxy
						delete obtener_carpeta
					}
				}
				, agregar_código: function(url){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones[archivo]){
						var etiqueta = document.createElement("script")
						v("tampermonkey_actual", url + ".js?" + Date.now())
						etiqueta.src = w("tampermonkey_actual")
						//document.head.appendChild(etiqueta)
						return etiqueta
					}
				}
			}
		}
	}
	with(oxy.funciones){ // Usando with para mejor facilidad.
		var i=iniciar, t=tampermonkey
		i.b("tampermonkey")
		i.v("url_tampermonkey",document.querySelector("script[src*=github]").src)
		var tm = i.w("url_tampermonkey")
		i.b("iniciar")
		i.v("carpeta",t.obtener_carpeta(tm))
		i.agregar_código(i.w("carpeta")+"cargar_lista_archivos")
		i.definir_esto()
	}
}
iniciar_oxy()

