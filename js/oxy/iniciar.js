iniciar_oxy = function iniciar_oxy(){
	oxy = {
		variables: {
			tampermonkey: {}
			, iniciar: {
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
						var trazado = Error().stack.replace("Error\n","")
						variables[archivo][nombre].push([valor,Date.now(),trazado])
						return nombre
					}
				}
				, x: function(nombre){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones.iniciar){
						return ult(oxy.variables[archivo][nombre])[0]
					}
				}
				, borrar_función_carpeta: function(){
					delete obtener_carpeta
				}
				, definir_esto: function(nombre_función,nuevo_nombre){
					with(oxy){
						var archivo = funciones.iniciar.a()
						v( nuevo_nombre, funciones[archivo][nombre_función] )
						delete window[borrar]
					}
				}
				, agregar_código: function(url){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones[archivo]){
						var etiqueta = document.createElement("script")
						v("tampermonkey_actual", url + ".js?" + Date.now())
						etiqueta.src = x("tampermonkey_actual")
						document.head.appendChild(etiqueta)
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
		var tm = i.x("url_tampermonkey")
		i.b("iniciar")
		i.v("carpeta",t.obtener_carpeta(tm))
		var carpeta = i.x("carpeta")
		i.agregar_código(carpeta+"cargar_archivos")
		i.borrar_función_carpeta()
		i.definir_esto("iniciar_oxy","iniciar_oxy_tampermonkey")
	}
}
iniciar_oxy()

