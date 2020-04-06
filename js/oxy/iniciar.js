function cargar_cargador(){
	oxy = {
		variables: {
			tampermonkey: {}
			, iniciar: {
				archivo_actual: []
			}
		}
		, funciones: {
			tampermonkey: {}
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
				, definir_esto: function(nombre_función){
					with(oxy){
						var archivo = funciones.iniciar.a()
						v( nombre_función, funciones[archivo][nombre_función] )
						delete window[nombre_función]
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
		i.definir_esto("obtener_carpeta")
		i.b("iniciar")
		i.v("carpeta",t.obtener_carpeta(tm))
		var carpeta = i.x("carpeta")
		i.agregar_código(carpeta+"cargar_archivos")
		i.borrar_variables_tampermonkey()
		i.b("tampermonkey")
		i.definir_esto("oxy_tampermonkey")
		i.b("iniciar")
		i.definir_esto("cargar_cargador")
	}
}
cargar_cargador()

