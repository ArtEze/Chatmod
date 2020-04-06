iniciar_oxy = function iniciar_oxy(){
	oxy = {
		variables: {
			archivo_actual: ["iniciar"]
		}
		, funciones: {
			tampermonkey: {
				obtener_carpeta: obtener_carpeta
			}
			, iniciar: {
				u: x=>x.slice(-1)[0]
				, v: function(nombre,valor){
					var archivo = oxy.funciones.iniciar.u(oxy.variables.archivo_actual)
					if(oxy.variables[archivo]==undefined){
						oxy.variables[archivo] = {}
					}
					if(oxy.variables[archivo][nombre]==undefined){
						oxy.variables[archivo][nombre] = []
					}
					oxy.variables[archivo][nombre].push([valor,Date.now()])
					return oxy.variables[archivo][nombre]
				}
				, w: function(nombre){
					return oxy.variables[archivo][nombre].slice(-1)[0][0]
				}
				, definir_esto: function(){
					with(oxy.funciones){
						v("iniciar_oxy_tampermonkey",iniciar_oxy)
						delete iniciar_oxy
						delete obtener_carpeta
					}
				}
				, agregar_código: function(url){
					with(oxy.funciones){
						var etiqueta = document.createElement("script")
						v("tampermonkey_actual", url + ".js?" + Date.now())
						etiqueta.src = w("tampermonkey_actual")
						document.head.appendChild(etiqueta)
						return etiqueta
					}
				}
			}
		}
	}
	with(oxy.funciones){ // Usando with para mejor facilidad.
		var i=iniciar, t=tampermonkey
		i.v("tampermonkey",document.querySelector("script[src*=github]").src)
		i.v("carpeta",t.obtener_carpeta(i.w("tampermonkey")))
		i.agregar_código(w("carpeta")+"cargar_lista_archivos")
		i.definir_esto()
	}
}
iniciar_oxy()

